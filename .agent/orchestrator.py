import logging
import sys
from typing import List, Dict, Any, Callable
from dataclasses import dataclass

# Real ADK Imports
from google.adk.agents.llm_agent import LlmAgent
from google.adk.tools.function_tool import FunctionTool
from google.adk.planners.plan_re_act_planner import PlanReActPlanner
from google.adk.sessions.in_memory_session_service import InMemorySessionService
from google.adk.runners import Runner
from google.genai import types

# Configure Logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - [GHOST-SYSTEM] - %(levelname)s - %(message)s')
logger = logging.getLogger("GhostOrchestrator")

# --- 1. Tooling (Adaptado para Contexto RAG) ---

def fetch_design_token(token_name: str) -> str:
    """Busca um token de design específico (cor, fonte, espaçamento) do Ghost System."""
    # Simulação: Num caso real, isso leria do arquivo agent/rules/00-project-context.md
    tokens = {
        "bluePrimary": "#0048ff",
        "blueAccent": "#4fe6ff",
        "background": "#040013",
        "easing": "cubic-bezier(0.22, 1, 0.36, 1)"
    }
    return f"Token '{token_name}': {tokens.get(token_name, 'Token not found - use default white')}"

def read_file_content(filepath: str) -> str:
    """Lê o conteúdo de um arquivo de regra ou workflow."""
    return f"Conteúdo simulado de {filepath} carregado."

# --- 2. Definição do Pelotão (The Ghost Unit) ---

def create_ghost_battalion(model_name: str = 'gemini-2.0-flash-001') -> Dict[str, LlmAgent]:
    """
    Instancia a unidade de elite para desenvolvimento do portfólio.
    """
    
    # 1. GHOST ARCHITECT: Define a estrutura e gerencia o Next.js App Router
    architect = LlmAgent(
        name="ghost_architect",
        model=model_name,
        instruction=(
            "Você é o Arquiteto de Software Sênior. Sua responsabilidade é estruturar o Next.js App Router. "
            "Regras: "
            "1. Sempre prefira React Server Components (RSC) por padrão. "
            "2. Defina interfaces TypeScript estritas. "
            "3. Garanta que a estrutura de pastas siga as convenções do Next.js 14+."
        ),
        include_contents='default'
    )

    # 2. SPECTRAL ARTIST: O especialista em React Three Fiber e Tailwind
    spectral_artist = LlmAgent(
        name="spectral_artist",
        model=model_name,
        instruction=(
            "Você é o Especialista em Creative Coding e WebGL. "
            "Sua missão: Criar a atmosfera 'Ghost'. "
            "Ferramentas: React Three Fiber, Drei, Shaders customizados. "
            "Estética: Vidro, Blur, Neons azuis (#0048ff), Partículas. "
            "Ao escrever componentes R3F, lembre-se de usar `useFrame` com cuidado para performance."
        ),
        tools=[FunctionTool(func=fetch_design_token)],
        include_contents='default'
    )

    # 3. MOTION CHOREOGRAPHER: Especialista em Framer Motion e Interação
    motion_choreographer = LlmAgent(
        name="motion_choreographer",
        model=model_name,
        instruction=(
            "Você é o Designer de Interação. "
            "Sua missão: Animar a UI para que pareça líquida e etérea. "
            "Stack: Framer Motion (layoutId, AnimatePresence) e Lenis Scroll. "
            "Use o easing 'Ghost': cubic-bezier(0.22, 1, 0.36, 1). "
            "Nunca bloqueie a thread principal."
        ),
        tools=[FunctionTool(func=fetch_design_token)],
        include_contents='default'
    )

    # 4. AUDIT SENTINEL: O Pentester e QA
    audit_sentinel = LlmAgent(
        name="audit_sentinel",
        model=model_name,
        instruction=(
            "Você é o Validador de Qualidade e Segurança. "
            "Analise o código gerado procurando por: "
            "1. Problemas de hidratação no React. "
            "2. Acessibilidade (WCAG AA) - Cores e ARIA labels. "
            "3. Performance (Lighthouse score prediction). "
            "4. Segurança (Sanitização de inputs)."
        ),
        include_contents='default'
    )

    return {
        "architect": architect,
        "spectral_artist": spectral_artist,
        "motion_choreographer": motion_choreographer,
        "audit_sentinel": audit_sentinel
    }

# --- 3. Orquestrador Global ---

def create_ghost_orchestrator(battalion: Dict[str, LlmAgent]) -> LlmAgent:
    
    # Criar ferramentas de delegação dinamicamente
    delegation_tools = []

    def make_delegate_tool(agent_name: str):
        # Nota: Num ambiente real, conectaríamos isso ao SessionService real para manter histórico
        def delegate_task(instructions: str) -> str:
            """Delega uma tarefa para um agente especialista."""
            return f"Simulação: Agente {agent_name} processou: '{instructions}' e retornou código/análise."
        
        delegate_task.__name__ = f"delegate_to_{agent_name}"
        delegate_task.__doc__ = f"Envia uma tarefa específica para o especialista {agent_name}."
        return FunctionTool(func=delegate_task)

    for name, _ in battalion.items():
        delegation_tools.append(make_delegate_tool(name))

    # O Orquestrador usa o Planner para decidir quem chamar
    orchestrator = LlmAgent(
        name="ghost_commander",
        model='gemini-2.0-flash-001',
        planner=PlanReActPlanner(), 
        tools=delegation_tools,
        instruction=(
            "Você é o Gerente de Produto do 'Ghost Design System'. "
            "Seu objetivo é coordenar a construção de componentes web de alta fidelidade. "
            "FLUXO DE TRABALHO PADRÃO:\n"
            "1. Analise o pedido do usuário e peça ao 'ghost_architect' para definir a estrutura/interfaces.\n"
            "2. Se houver elementos 3D/Visuais, acione o 'spectral_artist'.\n"
            "3. Se houver animações de UI (entradas, saídas, scroll), acione o 'motion_choreographer'.\n"
            "4. SEMPRE finalize pedindo ao 'audit_sentinel' para revisar o código combinado.\n"
            "Mantenha o tom profissional e focado na estética 'Ghost'."
        )
    )
    
    return orchestrator

# --- 4. Execução do Workflow ---

def run_project_mission(user_mission: str):
    """
    Executa uma missão no contexto do projeto.
    """
    APP_NAME = "ghost_system_v3"
    
    # Inicialização
    battalion = create_ghost_battalion()
    commander = create_ghost_orchestrator(battalion)
    session_service = InMemorySessionService()
    
    session = session_service.create_session_sync(app_name=APP_NAME, user_id="danilo_novais")
    
    # Runner
    runner = Runner(agent=commander, app_name=APP_NAME, session_service=session_service)
    
    print(f"\n👻 GHOST SYSTEM INITIALIZED | Mission: {user_mission}")
    print("-" * 60)

    user_msg = types.Content(role="user", parts=[types.Part(text=user_mission)])
    events = runner.run(session_id=session.id, user_id="danilo_novais", new_message=user_msg)
    
    for event in events:
        if event.get_function_calls():
            for fc in event.get_function_calls():
                 print(f"   [📡 COMMANDER]: Delegando para {fc.name}...")
        
        if event.content and event.content.parts:
            for part in event.content.parts:
                if part.text:
                    print(f"\n{part.text}")

if __name__ == "__main__":
    # Exemplo de missão complexa que ativa todos os agentes
    mission = (
        "Crie a 'Hero Section' da página Home. "
        "Preciso que tenha um fundo WebGL com partículas reagindo ao mouse (Ghost Atmosphere), "
        "um título grande com tipografia Inter e animação de reveal escalonado (stagger). "
        "Garanta que seja responsivo e passe no teste de performance."
    )
    run_project_mission(mission)