import logging
import sys
from typing import List, Dict, Any, Callable
from dataclasses import dataclass
from pathlib import Path
import json

# Real ADK Imports
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

from google.adk.agents.llm_agent import LlmAgent
from google.adk.tools.function_tool import FunctionTool
from google.adk.planners.plan_re_act_planner import PlanReActPlanner
from google.adk.sessions.in_memory_session_service import InMemorySessionService
from google.adk.runners import Runner
from google.genai import types

# Configure Logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - [GHOST-SYSTEM] - %(levelname)s - %(message)s')
logger = logging.getLogger("GhostOrchestrator")

# --- Configuration ---
DEFAULT_MODEL_NAME = 'gemini-2.0-flash-001'
APP_NAME = 'ghost_system_v3'
DESIGN_TOKENS_PATH = 'config/design_tokens.json'

# --- 1. Tooling (Adaptado para Contexto RAG) ---

def fetch_design_token(token_name: str) -> str:
    """Busca um token de design específico de um arquivo JSON de configuração."""
    config_path = Path(__file__).parent / DESIGN_TOKENS_PATH
    try:
        with open(config_path, 'r', encoding='utf-8') as f:
            tokens = json.load(f)
        value = tokens.get(token_name)
        if value:
            return f"Token '{token_name}': {value}"
        else:
            return f"Token '{token_name}' não encontrado. Usando valor padrão."
    except FileNotFoundError:
        return "Arquivo de tokens de design não encontrado."
    except Exception as e:
        logger.error(f"Erro ao ler tokens de design: {e}")
        return f"Erro ao ler tokens de design: {str(e)}"

def read_file_content(filepath: str) -> str:
    """Lê o conteúdo de um arquivo de regra ou workflow."""
    return f"Conteúdo simulado de {filepath} carregado."

# --- 2. Definição do Pelotão (The Ghost Unit) ---

def create_ghost_battalion(model_name: str = DEFAULT_MODEL_NAME) -> Dict[str, LlmAgent]:
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

# --- 3. Orquestrador Global (Otimizado) ---

def create_delegation_tool(agent_name: str, agent_instance: LlmAgent, session_service: InMemorySessionService):
    """Cria uma ferramenta de delegação para um agente específico."""
    def delegate_task(instructions: str) -> str:
        """Delega uma tarefa para um agente especialista."""
        # Nota: Em um ambiente real, esta chamada seria assíncrona e usaria o runner do agente.
        return f"Simulação: Agente {agent_name} processou: '{instructions}' e retornou código/análise."
    
    delegate_task.__name__ = f"delegate_to_{agent_name}"
    delegate_task.__doc__ = f"Envia uma tarefa específica para o especialista {agent_name}."
    return FunctionTool(func=delegate_task)

def create_ghost_orchestrator(battalion: Dict[str, LlmAgent], session_service: InMemorySessionService) -> LlmAgent:
    # Criar ferramentas de delegação dinamicamente
    delegation_tools = [
        create_delegation_tool(name, agent, session_service) for name, agent in battalion.items()
    ]

    orchestrator = LlmAgent(
        name="ghost_commander",
        model=DEFAULT_MODEL_NAME, # Poderia vir de uma configuração global
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

def run_project_mission(user_mission: str, session_service: InMemorySessionService, battalion: Dict[str, LlmAgent]):
    """
    Executa uma missão no contexto do projeto.
    """
    
    # O `commander` agora recebe o serviço de sessão
    commander = create_ghost_orchestrator(battalion, session_service)
    
    session = session_service.create_session_sync(app_name=APP_NAME, user_id="danilo_novais")
    
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
    # Inicialização única
    battalion = create_ghost_battalion()
    session_service = InMemorySessionService() # Poderia ser substituído por um serviço persistente
    
    run_project_mission(mission, session_service, battalion)
