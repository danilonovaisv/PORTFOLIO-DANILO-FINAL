#!/usr/bin/env node
/**
 * Script para executar testes completos e fazer deploy
 * Verifica o ambiente, executa testes e faz deploy se tudo estiver OK
 */

import { spawn } from 'child_process';
import { createStaticClient } from '../src/lib/supabase/static';

function runCommand(command: string, args: string[] = []): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`\n🔧 Executando: ${command} ${args.join(' ')}`);

    const child = spawn(command, args, {
      stdio: 'inherit',
      cwd: process.cwd(),
      env: process.env,
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ Comando concluído com sucesso`);
        resolve();
      } else {
        console.error(`❌ Comando falhou com código ${code}`);
        reject(new Error(`Command failed with code ${code}`));
      }
    });

    child.on('error', (err) => {
      console.error(`❌ Erro ao executar comando:`, err.message);
      reject(err);
    });
  });
}

async function testEnvironment() {
  console.log('🧪 Testando ambiente...');

  // Testa as variáveis de ambiente
  const hasUrl = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const hasKey = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
  );

  console.log('📋 Verificando variáveis de ambiente:');
  console.log('  NEXT_PUBLIC_SUPABASE_URL:', hasUrl ? '✅ SET' : '❌ MISSING');
  console.log(
    '  NEXT_PUBLIC_SUPABASE_ANON_KEY:',
    hasKey ? '✅ SET' : '❌ MISSING'
  );

  if (!hasUrl || !hasKey) {
    console.log(
      '⚠️  Aviso: Variáveis de ambiente ausentes - pode afetar alguns testes'
    );
  }

  // Testa conexão com Supabase se as variáveis estiverem presentes
  if (hasUrl && hasKey) {
    console.log('\n🔌 Testando conexão com Supabase...');
    try {
      const supabase = createStaticClient();
      console.log('  ✅ Cliente Supabase criado com sucesso');

      // Testa uma consulta simples
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('count')
        .single();

      if (error) {
        console.log(`  ⚠️  Aviso: Erro na consulta de teste: ${error.message}`);
      } else {
        console.log(`  ✅ Conexão com banco de dados bem-sucedida`);
      }
    } catch (error) {
      console.log(
        `  ⚠️  Aviso: Não foi possível conectar ao Supabase: ${(error as Error).message}`
      );
    }
  }

  console.log('\n✅ Teste de ambiente concluído');
}

async function runFullTestAndDeploy() {
  console.log('🚀 Iniciando processo de teste e deploy completo...\n');

  try {
    // 1. Testar ambiente
    await testEnvironment();

    // 2. Executar lint
    console.log('\n🧹 Executando lint...');
    await runCommand('npm', ['run', 'lint']);

    // 3. Executar typecheck
    console.log('\n📝 Executando typecheck...');
    await runCommand('npm', ['run', 'typecheck']);

    // 4. Executar testes unitários
    console.log('\n.UnitTesting...');
    await runCommand('npm', ['test']);

    // 5. Executar build
    console.log('\n🏗️  Executando build...');
    await runCommand('npm', ['run', 'build']);

    // 6. Executar deploy
    console.log('\n🚢 Executando deploy...');
    await runCommand('npm', ['run', 'deploy']);

    console.log(
      '\n🎉 Processo completo: todos os testes passaram e deploy realizado com sucesso!'
    );
  } catch (error) {
    console.error('\n💥 Erro durante o processo:', (error as Error).message);
    console.error('❌ Processo interrompido devido a falha.');
    process.exit(1);
  }
}

// Executa a função principal
runFullTestAndDeploy();
