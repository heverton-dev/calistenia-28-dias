# Dossiê de Engenharia Reversa & Reconstrução Factual: Calistenia 28D

## 1. Identificação do Alvo
- **Alvo Primário:** BetterMe: Health Coaching (Desafio de 28 Dias de Calistenia Masculina)
- **Benchmarking UX:** Mobbin (Fitbod iOS, Apple Fitness, Ladder)
- **Arquitetura de Entrega:** PWA Offline-First (iOS Safari Standalone / Android Chrome APK)
- **Licenciamento:** 100% Open Source (Zero Paywalls, Zero Servidores Obrigatórios)

## 2. Camadas Reconstruídas

### Camada 1: Contratos e Tráfego
- Totalmente autocontido no cliente. Zero chamadas de telemetria ou rastreamento remoto.
- Esquema estrito em TypeScript definido em [`docs/reconstruct_calistenia/02_decompiled/api_contracts.ts`](./02_decompiled/api_contracts.ts).

### Camada 2: Lógica de Negócio e Máquina de Estados
- Matriz completa de 28 dias com progressão pedagógica em 4 Fases:
  - **Fase 1 (Dias 1-7):** Adaptação neural e ativação do core.
  - **Fase 2 (Dias 8-14):** Densidade muscular e força de empurrar.
  - **Fase 3 (Dias 15-21):** Volume e resistência de alta intensidade.
  - **Fase 4 (Dias 22-28):** Maestria biomecânica e teste de capacidade máxima.
- Motor de treino guiado com transições automáticas (`prepare` ➔ `active` ➔ `rest` ➔ `completed`).
- Algoritmo resiliente de streaks diárias com cálculo de data ISO.

### Camada 3: Anatomia & Heurística Mobbin
- Substituição completa de esqueletos/stick-figures por ilustrações anatômicas vetoriais de alta fidelidade com camadas musculares definidas.
- Mapas térmicos com filtros SVG dinâmicos (`feGaussianBlur` + gradientes neon) para destacar grupos musculares primários e secundários.
- Modo de visão duplo: **Anterior (Frente)** e **Posterior (Costas & Glúteos)**.
- Display de timer esportivo com tipografia pesada de alto contraste, legível à distância durante a fadiga física.

### Camada 4: Design System & Tokens
- Variáveis CSS estruturadas em [`docs/reconstruct_calistenia/04_design_system/tokens.css`](./04_design_system/tokens.css).
- Modo escuro profundo (`#080b14`), paleta atlética vibrante (`#f97316`, `#ef4444`, `#22c55e`).

## 3. Validação e Homologação
- **Testes Unitários:** 19 testes automatizados aprovados via Vitest (`npm test`).
- **Build de Produção:** 100% aprovado sem erros de compilação TypeScript (`npm run build`).
- **Tamanho Total:** Bundle comprimido em ~62 kB (muito abaixo do teto de 50 MB).
