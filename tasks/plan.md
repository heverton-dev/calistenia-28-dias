# Plano de Implementação: Calistenia Daily Trainer (28-Day Offline)

## Visão Geral
Construção verticalizada e testada via TDD do aplicativo de calistenia diária com suporte PWA offline para Android e iOS, cobrindo catálogo anatômico, gerador de áudio sintético, player de treino com timer e persistência de 28 dias.

## Grafo de Dependências
```text
Task 1 (Setup & Test Harness)
    │
    ▼
Task 2 (Modelos de Domínio, Catálogo de Exercícios & Matriz de 28 Dias)
    │
    ▼
Task 3 (Sintetizador Web Audio API & Armazenamento Local de Progresso)
    │
    ▼
Task 4 (Visualizador Anatômico Muscular SVG & Animações Vetoriais)
    │
    ▼
Task 5 (Player de Treino Guiado com Timers Automáticos de Série/Descanso)
    │
    ▼
Task 6 (Grid dos 28 Dias, Histórico de Streaks & Suporte PWA Offline)
```

## Tarefas Verticais

### Task 1: Setup & Test Harness
- **Descrição:** Inicializar projeto Vite com React, TypeScript, Vitest e utilitários de teste.
- **Critérios de Aceitação:** `npm test` e `npm run build` executam com sucesso.
- **Dependências:** Nenhuma.

### Task 2: Domínio de Dados e Matriz dos 28 Dias
- **Descrição:** Definir contratos de tipos TypeScript, catálogo detalhado de exercícios de calistenia com classificação de músculos primários/secundários e os 28 dias progressivos do desafio.
- **Critérios de Aceitação:** Todos os 28 dias mapeados com foco muscular e tempos adequados; testes cobrindo integridade do catálogo e referências.
- **Dependências:** Task 1.

### Task 3: Sintetizador de Áudio e Persistência Local
- **Descrição:** Criar gerador de áudio via Web Audio API (beeps 880Hz/440Hz e sino) sem arquivos externos, mais hook/storage de progresso offline (streaks, dias concluídos, peso).
- **Critérios de Aceitação:** Testes unitários validando cálculo de streaks, persistência e fallback de áudio.
- **Dependências:** Task 2.

### Task 4: Visualizador Anatômico Muscular e Animações de Exercício
- **Descrição:** Criar componente SVG que ilumina os grupos musculares (peitoral, tríceps, core, pernas, etc.) de acordo com o exercício ativo, e componente de animação vetorial/loop.
- **Critérios de Aceitação:** Músculos primários renderizados com classe/estilo de destaque; renderização dinâmica baseada no exercício atual.
- **Dependências:** Task 2.

### Task 5: Player de Treino Automatizado
- **Descrição:** Criar máquina de estados e interface do player de treino: contagem regressiva de preparação (3s), execução cronometrada, descanso cronometrado, toque de bips, botões de pausar/pular e tela de conclusão.
- **Critérios de Aceitação:** Testes provando transição automática de estados (prepare -> work -> rest -> complete) e gatilhos de áudio.
- **Dependências:** Task 3, Task 4.

### Task 6: Grid dos 28 Dias, Telas do App e Manifesto PWA Offline
- **Descrição:** Montar a interface principal com visão geral dos 28 dias (indicadores de concluído/em aberto/dia atual), métricas de streaks e dias de descanso, configuração PWA (manifest, service worker) e empacotamento final.
- **Critérios de Aceitação:** Build de produção gerando bundle autocontido offline (< 50MB); fluxo de ponta a ponta funcional.
- **Dependências:** Task 5.
