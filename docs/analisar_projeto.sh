#!/bin/bash

# Nome do relatório
RELATORIO="relatorio_ai.txt"

# Limpa o relatório anterior
echo "Relatório de análise do projeto - $(date)" > $RELATORIO
echo "=========================================" >> $RELATORIO

# Etapa 1: Verificação de erros com ESLint
echo -e "\n--- Erros de ESLint ---" >> $RELATORIO
if npx eslint . --ext .js,.ts > eslint_output.txt 2>&1; then
  echo "Nenhum erro de ESLint encontrado." >> $RELATORIO
else
  cat eslint_output.txt >> $RELATORIO
fi
rm -f eslint_output.txt

# Etapa 2: Verificação de erros de compilação TypeScript (se aplicável)
if [ -f "tsconfig.json" ]; then
  echo -e "\n--- Erros de compilação TypeScript ---" >> $RELATORIO
  if npx tsc --noEmit > tsc_output.txt 2>&1; then
    echo "Nenhum erro de compilação TypeScript encontrado." >> $RELATORIO
  else
    cat tsc_output.txt >> $RELATORIO
  fi
  rm -f tsc_output.txt
fi

# Etapa 3: Execução de testes
echo -e "\n--- Resultados dos Testes ---" >> $RELATORIO
if pnpm test > test_output.txt 2>&1; then
  echo "Todos os testes passaram com sucesso." >> $RELATORIO
else
  cat test_output.txt >> $RELATORIO
fi
rm -f test_output.txt

# Final
echo -e "\nAnálise concluída. Veja '$RELATORIO' para detalhes."