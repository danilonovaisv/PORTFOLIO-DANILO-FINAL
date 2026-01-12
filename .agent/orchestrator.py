import logging
import sys
from typing import List, Dict, Any, Callable, Optional
from dataclasses import dataclass

# Real ADK Imports
from google.adk.agents.llm_agent import LlmAgent
from google.adk.tools.function_tool import FunctionTool
from google.adk.planners.plan_re_act_planner import PlanReActPlanner
from google.adk.sessions.in_memory_session_service import InMemorySessionService
from google.adk.runners import Runner
from google.genai import types

# Configure Logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger("GhostOrchestrator")


# --- 1. MCP Tool Adapter (Concept) ---

@dataclass
class McpToolDefinition:
    """Represents a tool definition from the Model Context Protocol (MCP)."""
    name: str
    description: str
    handler: Callable

class McpToolAdapter:
    """
    Connects to MCP servers and adapts their tools for ADK Agents.
    In a real scenario, this would parse MCP JSON schemas.
    """
    
    @staticmethod
    def to_adk_tool(mcp_tool: McpToolDefinition) -> FunctionTool:
        """
        Wraps an MCP tool definition into an ADK FunctionTool.
        The LlmAgent can then use this tool to interact with external MCP logic.
        """
        return FunctionTool(
            func=mcp_tool.handler,
            # Name and docstring are usually inferred from the func, 
            # so we ensure the handler has them or we wrap it.
        )

# Mock MCP Tools for the Battalion (Real Python Functions)
def validate_reference(url: str) -> str:
    """Checks validity of URLs."""
    return f"Reference Validated: {url} is active and content matches."

def query_vector_store(query: str) -> str:
    """Searches internal docs."""
    return f"VectorDB Search Result for '{query}': Found 'Ghost Design tokens' and 'Hero Component specs'."

# No need to wrap manually if we define functions directly, but demonstrating the Adapter pattern:
mcp_tools_defs = [
    McpToolDefinition("validate_reference", "Checks validity of URLs", validate_reference),
    McpToolDefinition("query_vector_store", "Searches internal docs", query_vector_store)
]

# In ADK, FunctionTool works best with direct callables.
adk_mcp_tools = [FunctionTool(func=t.handler) for t in mcp_tools_defs]


# --- 2. Sub-Agents Configuration (The Battalion) ---

def create_ghost_battalion() -> Dict[str, LlmAgent]:
    """
    Instantiates the team of specialized agents for the Ghost Design System.
    Each uses 'gemini-2.0-flash' (or available model) and maintains default content history.
    """
    
    # Using a model that is likely to work/exist. 
    # 'gemini-2.0-flash' is requested, but ensure you have access.
    MODEL = 'gemini-2.0-flash-001' 
    
    # 1. Reference Checker
    reference_checker = LlmAgent(
        name="reference_checker",
        model=MODEL,
        instruction=(
            "You are a Verification Specialist. Validates all URLs and "
            "documentation references ensuring they point to valid Ghost System resources."
        ),
        tools=[adk_mcp_tools[0]], 
        include_contents='default'
    )

    # 2. Search Storage
    search_storage = LlmAgent(
        name="search_storage",
        model=MODEL,
        instruction=(
            "You are the Knowledge Retriever. Search the vector database or docs "
            "to find specific design tokens, component schemas, and assets for the Ghost Design System."
        ),
        tools=[adk_mcp_tools[1]],
        include_contents='default'
    )

    # 3. Code Writer
    code_writer = LlmAgent(
        name="code_writer",
        model=MODEL,
        instruction=(
            "You are the Lead Frontend Developer for the Ghost Design System. "
            "Write strict, clean code based on the provided design specifications. "
            "Use the specific color palettes, typography, and spacing variables defined in the system."
        ),
        include_contents='default'
    )

    # 4. Code Reviewer
    code_reviewer = LlmAgent(
        name="code_reviewer",
        model=MODEL,
        instruction=(
            "You are the QA Lead. Review code for errors, security, and most importantly, "
            "strict compliance with the 'Ghost System' guidelines (e.g., proper token usage, accessibility)."
        ),
        include_contents='default'
    )

    # 5. Code Refactorer
    code_refactorer = LlmAgent(
        name="code_refactorer",
        model=MODEL,
        instruction=(
            "You are the Refactoring Mechanic. Apply fixes to the code based on the QA Lead's review. "
            "Ensure the final output is polished and production-ready."
        ),
        include_contents='default'
    )

    return {
        "reference_checker": reference_checker,
        "search_storage": search_storage,
        "code_writer": code_writer,
        "code_reviewer": code_reviewer,
        "code_refactorer": code_refactorer
    }


# --- 3. Global Orchestrator Agent ---

def create_ghost_orchestrator(battalion: Dict[str, LlmAgent]) -> LlmAgent:
    """
    Creates the Orchestrator with a Planner to manage the creation of the Ghost Design System.
    """
    
    # Wrap sub-agents as tools (Agent-as-a-Tool)
    # ADK Agents can be passed strictly as tools if wrapped or if they implement the tool interface.
    # We will wrap them in FunctionTools that invoke them via a synchronous runner for simplicity in this demo,
    # OR simpler: just assume these agents are callable or have a way to be tools.
    # The ADK documentation often suggests `agent_tool` or similar wrappers.
    # For now, we'll create a simple function wrapper that runs the agent.

    agent_tools = []
    
    # We need a session service for the sub-agents too if we run them.
    # To keep it simple, the tool will just return a string "Delegate to..." for this demo
    # unless we fully instantiate a runner inside the tool. 
    # The PlanReActPlanner expects tools to return strings.
    
    def make_delegate_tool(agent_name: str, agent_inst: LlmAgent):
        def delegate_task(task_description: str) -> str:
            """Delegates a specific task to a sub-agent."""
            # In a full impl, we would start a sub-session or use the same session context
            # Here we mock the execution for the "Orchestration" proof-of-concept
            return f"[{agent_name} Output]: Processed '{task_description}' according to instructions."
        
        delegate_task.__name__ = f"delegate_to_{agent_name}"
        delegate_task.__doc__ = f"Delegates a task to the {agent_name} agent."

        return FunctionTool(
            func=delegate_task
        )

    for name, agent in battalion.items():
        agent_tools.append(make_delegate_tool(name, agent))

    orchestrator = LlmAgent(
        name="orchestrator",
        model='gemini-2.0-flash-001',
        planner=PlanReActPlanner(), # Enables Reasoning -> Acting cycle
        tools=agent_tools,
        instruction=(
            "You are the Lead Architect for the 'Ghost Design System' project. "
            "Your goal is to implement features by coordinating your specialized team. "
            "You must utilize your sub-agents in a sequential, logical order:\n"
            "1. Check References (delegate_to_reference_checker)\n"
            "2. Search Info (delegate_to_search_storage) to get context\n"
            "3. Write Code (delegate_to_code_writer) implementation\n"
            "4. Review (delegate_to_code_reviewer) against guidelines\n"
            "5. Refactor (delegate_to_code_refactorer) if needed.\n"
            "Always access the 'project_context' in your session state for design rules."
        )
    )
    
    return orchestrator


# --- 4. Project Workflow & Memory ---

def run_ghost_project_workflow(project_specs: str, user_request: str):
    """
    Initializes the session with Ghost Design System specs and runs the orchestrator.
    """
    APP_NAME = "ghost_system"
    USER_ID = "user_default"
    
    # 1. Initialize Sub-agents and Orchestrator
    battalion = create_ghost_battalion()
    orchestrator = create_ghost_orchestrator(battalion)
    
    # 2. Session Setup
    session_service = InMemorySessionService()
    # create_session_sync is deprecated but useful for simple scripts. 
    # Validating existence via inspection previously.
    session = session_service.create_session_sync(
        app_name=APP_NAME, 
        user_id=USER_ID
    )
    
    # 3. Inject Knowledge (Memory)
    session.state['project_context'] = project_specs
    print(f"--- Session Initialized: {session.id} ---")
    print(f"--- Ghost Design Specs Loaded ({len(project_specs)} chars) ---")
    
    # 4. Execute
    runner = Runner(
        agent=orchestrator, 
        app_name=APP_NAME, 
        session_service=session_service
    )
    
    logger.info(f"Executing Request: '{user_request}'")
    
    # Runner.run returns a generator of Events
    user_msg = types.Content(role="user", parts=[types.Part(text=user_request)])
    
    events = runner.run(
        session_id=session.id, 
        user_id=USER_ID, 
        new_message=user_msg
    )
    
    final_response_text = ""
    
    print(">>> Streaming Events...")
    for event in events:
        # We can inspect events here (thoughts, tool calls, content)
        if event.content and event.content.parts:
            for part in event.content.parts:
                if part.text:
                    # Capture the final text response from the model
                    # In a ReAct loop, there might be multiple model responses (thoughts).
                    # We print them all to see the "Thinking".
                    print(f"[Agent]: {part.text}")
                    final_response_text = part.text # Keep the last one as final
        
        if event.get_function_calls():
            for fc in event.get_function_calls():
                 print(f"[Tool Call]: {fc.name}({fc.args})")

    return final_response_text

if __name__ == "__main__":
    # Mock Project Specification (The Ghost Design System)
    ghost_specs = """
    GHOST DESIGN SYSTEM SPEC v1.0
    - Colors: Ethereal White (#F8F9FA), Void Black (#000000), Spectral Blue (#A4C2F4)
    - Typography: Inter (Sans-serif) for UI, Playfair Display for Headings.
    - Components: 
      - Hero: Large title, spectral glow effect, minimal navigation.
      - Cards: Glassmorphism effect, 1px border.
    """
    
    request = "Implement the Hero Section based on the project context."
    
    print("Starting Ghost Design System Orchestrator (ADK v1.22)...")
    final_output = run_ghost_project_workflow(ghost_specs, request)
    print("\n--- Final Deliverable ---")
    print(final_output)
# --- INSTRUÇÕES PARA EXECUTAR O WORKFLOW ---

# 1. Carrega o conteúdo dos teus arquivos MD (vias de exemplo)
portfolio_spec = """
Contente do arquivo /docs/PORTFOLIO/PORTFOLIO - PROTÓTIPO INTERATIVO.md
"""
home_spec = """
Contente do arquivo /docs/HOME/HOME - PROTOTIPO INTERATIVO.md
"""
about_spec = """
Contente do arquivo /docs/SOBRE/SOBRE-PROTOTIPO-INTERATIVO.md
"""

# Concatena tudo num "Contexto Mestre"
full_project_context = f"""
PROJECT KNOWLEDGE BASE:
--- PORTFOLIO PAGE SPEC ---
{portfolio_spec}
--- HOME PAGE SPEC ---
{home_spec}
--- ABOUT PAGE SPEC ---
{about_spec}
"""

# 2. Chama a função de workflow criada pelo Antigravity
if __name__ == "__main__":
    # Aqui chamamos o workflow passando o contexto gigante
    run_ghost_project_workflow(
        project_specs=full_project_context,
        user_request="Create the complete code for the Hero Section of the Home page, following the Ghost Design System animations and typography."
    )