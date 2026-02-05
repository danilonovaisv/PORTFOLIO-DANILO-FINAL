#!/usr/bin/env bash
set -euo pipefail

# Firebase Deploy Pre-Flight Check
# Valida configurações críticas antes do deploy

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

echo "🔍 Firebase Deploy Pre-Flight Check"
echo "===================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0

# Check 1: Verify functions/package.json dependencies
echo -e "\n📦 Checking functions/package.json..."
if [ -f "functions/package.json" ]; then
  if grep -q '"link:' functions/package.json; then
    echo -e "${RED}❌ ERRO: Protocolo 'link:' detectado em functions/package.json${NC}"
    echo -e "${YELLOW}   Firebase Functions não suporta 'link:' - use 'file:../' em vez disso${NC}"
    echo -e "${YELLOW}   Corrigindo automaticamente...${NC}"
    
    # Auto-fix
    sed -i.bak 's/"link:src\//"file:..\/src\//g' functions/package.json
    rm -f functions/package.json.bak
    
    echo -e "${GREEN}✅ Corrigido: Dependências atualizadas para 'file:../'${NC}"
  else
    echo -e "${GREEN}✅ OK: Dependências usando protocolo correto${NC}"
  fi
  
  # Validate npm install
  echo -e "\n📥 Validando instalação de dependências..."
  cd functions
  if npm install --dry-run > /dev/null 2>&1; then
    echo -e "${GREEN}✅ OK: npm install validado com sucesso${NC}"
  else
    echo -e "${RED}❌ ERRO: npm install falhou${NC}"
    ERRORS=$((ERRORS + 1))
  fi
  cd ..
else
  echo -e "${YELLOW}⚠️  AVISO: functions/package.json não encontrado${NC}"
fi

# Check 2: Verify .env files exist
echo -e "\n🔐 Checking environment variables..."
if [ -f ".env.local" ]; then
  echo -e "${GREEN}✅ OK: .env.local encontrado${NC}"
else
  echo -e "${YELLOW}⚠️  AVISO: .env.local não encontrado${NC}"
fi

# Check 3: Verify Next.js config
echo -e "\n⚙️  Checking Next.js configuration..."
if [ -f "next.config.mjs" ]; then
  if grep -q "output.*standalone" next.config.mjs; then
    echo -e "${GREEN}✅ OK: Standalone mode configurado${NC}"
  else
    echo -e "${YELLOW}⚠️  AVISO: Standalone mode não encontrado em next.config.mjs${NC}"
  fi
else
  echo -e "${RED}❌ ERRO: next.config.mjs não encontrado${NC}"
  ERRORS=$((ERRORS + 1))
fi

# Check 4: Verify firebase.json
echo -e "\n🔥 Checking Firebase configuration..."
if [ -f "firebase.json" ]; then
  echo -e "${GREEN}✅ OK: firebase.json encontrado${NC}"
else
  echo -e "${RED}❌ ERRO: firebase.json não encontrado${NC}"
  ERRORS=$((ERRORS + 1))
fi

# Check 5: Verify Node version
echo -e "\n🟢 Checking Node.js version..."
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -eq 20 ]; then
  echo -e "${GREEN}✅ OK: Node.js v${NODE_VERSION} (required: 20)${NC}"
else
  echo -e "${YELLOW}⚠️  AVISO: Node.js v${NODE_VERSION} (recomendado: 20)${NC}"
fi

# Summary
echo -e "\n===================================="
if [ $ERRORS -eq 0 ]; then
  echo -e "${GREEN}✅ Pre-Flight Check PASSED${NC}"
  echo -e "${GREEN}   Pronto para deploy!${NC}"
  exit 0
else
  echo -e "${RED}❌ Pre-Flight Check FAILED${NC}"
  echo -e "${RED}   ${ERRORS} erro(s) encontrado(s)${NC}"
  exit 1
fi
