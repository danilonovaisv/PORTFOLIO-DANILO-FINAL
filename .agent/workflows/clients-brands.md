---
description: Hero ghost
---

### 🚀 Workflow: Integração de Logotipos de Clientes e Marcas

#### 📦 Pré-requisitos (Configuração Inicial)

- **Status:** _A executar._
- **Ação:** Garantir dependências essenciais para renderização de logotipos de clientes e marcas.
- **Comando:** `npm install lucide-react next/image`

---

### Fase 1: Estruturação dos Assets de Clientes (Logotipos)

**Objetivo:** Organizar e implementar a exibição dos logotipos de clientes com base nos assets do Supabase.

1. **Componente `ClientLogos.tsx**` (Já iniciado):

- _Tarefa:_ Renderizar logotipos de clientes a partir de URLs do Supabase Storage.
- _Validação:_ Garantir que os URLs apontem para os caminhos corretos no bucket `site-assets/clients/`.

2. **Validação de Assets:**

- _Tarefa:_ Verificar que todos os arquivos mencionados no conteúdo estão realmente presentes no Supabase Storage.
- _Ajuste Fino:_ Confirmar que os caminhos dos arquivos sigam o padrão `/storage/v1/object/public/site-assets/clients/clients.strip.{n}.svg`.

### Fase 2: Integração com a Seção de Clientes (Layout & Exibição)

**Objetivo:** Montar a seção de clientes com layout responsivo e exibição adequada dos logotipos.

1. **Componente `ClientsSection.tsx**` (Implementar):

- _Tarefa:_ Criar uma seção reutilizável que utilize os logotipos de clientes.
- _Posição:_ Integrar tanto na Home quanto na seção Sobre, seguindo a estrutura definida no contexto do projeto.

2. **Componente `ClientsGrid.tsx**:\*\*

- _Tarefa:_ Implementar um grid de logotipos monocromáticos com animação sutil (marquee ou fade-in).
- _Responsividade:_ Garantir que o layout funcione corretamente em dispositivos móveis e desktop.

### Fase 3: Implementação da Exibição (Carrossel ou Grade)

**Objetivo:** Implementar a exibição eficaz dos logotipos de clientes com foco em performance e estética.

1. **Componente `ClientsMarquee.tsx**:`

- _Estado Inicial:_ Implementar carrossel horizontal com logotipos.
- _Scroll Automático:_ Implementar movimento contínuo com opção de pausa ao passar o mouse.
- _Performance:_ Utilizar técnicas de virtualização para grande número de logotipos.

### Fase 4: Integração (Em Páginas)

**Objetivo:** Unir a funcionalidade de exibição de logotipos às páginas principais.

1. **Montagem em `HomePage.tsx` e `AboutPage.tsx`:**

- Empilhar camadas: Conteúdo < ClientLogos.
- Gerenciar responsividade (Mobile vs Desktop). Ajustar espaçamento e tamanho dos logotipos.

### Fase 5: Teste de Integridade e Validação

**Objetivo:** Comparação e validação dos links e aparência final.

1. **Verificação de Links:** Confirmar que todos os URLs dos logotipos estão funcionando corretamente.
2. **Aparência:** Validar que os logotipos estão sendo exibidos conforme o design system Ghost.
3. **Performance:** Verificar tempos de carregamento e otimizar se necessário.

---

### 🛠️ EXECUÇÃO IMEDIATA: Implementando a Exibição de Logotipos

Para que eu possa avançar na integração da seção de clientes, preciso implementar os componentes que faltam. Aqui estão os códigos para os **Componentes de Logotipos** e **Grade de Clientes**:

#### 1. `src/components/clients/ClientsSection.tsx`

_Seção reutilizável para exibição de logotipos de clientes._

```tsx
'use client';

import React from 'react';
import { HOME_CONTENT } from '@/config/content';
import ClientsGrid from './ClientsGrid';

export default function ClientsSection() {
  const { title, logos } = HOME_CONTENT.clients;

  return (
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-lg md:text-xl font-bold tracking-widest text-center mb-12 text-text-secondary">
          {title.toUpperCase()}
        </h2>
        <ClientsGrid logos={logos} />
      </div>
    </section>
  );
}
```

#### 2. `src/components/clients/ClientsGrid.tsx`

_Componente para renderizar a grade de logotipos de clientes._

```tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

type Logo = {
  id: number;
  src: string;
  alt: string;
};

export default function ClientsGrid({ logos }: { logos: Logo[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center">
      {logos.map((logo, index) => (
        <motion.div
          key={logo.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="opacity-60 hover:opacity-100 transition-opacity duration-300"
        >
          <div className="aspect-square max-w-[120px] max-h-[120px] flex items-center justify-center">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={120}
              className="object-contain invert dark:invert-0"
              priority={false}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
```

#### 3. Atualização do conteúdo em `src/config/content.ts`

Certifique-se de que os caminhos dos logotipos estejam corretos no objeto HOME_CONTENT.clients:

```tsx
clients: {
  title: 'marcas com as quais já trabalhei',
  logos: Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    src: siteAsset(`clients/clients.strip.${i + 1}.svg`),
    alt: `Logo do cliente ${i + 1}`,
  })),
},
```

_(Nota: Esses componentes utilizam os assets definidos em HOME_CONTENT e implementam a estética Ghost com foco em performance e estética.)_

---
