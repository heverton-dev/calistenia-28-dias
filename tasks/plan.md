# Plano de Implementação: Calistenia Daily Trainer v2 (Método Osmani)

## Visão Geral
Construção verticalizada e testada via TDD da evolução da aplicação de calistenia para padrão comercial Mobbin/BetterMe: rastreamento de peso com gráfico SVG, substituição anatômica de exercícios, painel de configurações de treino e Service Worker PWA offline nativo.

## Grafo de Dependências
```text
Task 1 (Rastreamento de Peso & Gráfico SVG)
    │
    ▼
Task 2 (Mecanismo de Substituição Anatômica de Exercícios)
    │
    ▼
Task 3 (Painel de Configurações e Preferências do Treinador)
    │
    ▼
Task 4 (Service Worker PWA Offline Nativo)
    │
    ▼
Task 5 (Integração no Dashboard e Homologação Final)
```

---

## Tarefas Verticais

### Task 1: Rastreamento de Peso & Gráfico SVG de Evolução
- **Descrição:** Adicionar modelo de dados de pesagem em `src/utils/storage.ts` e componente `src/components/WeightTracker.tsx` com gráfico vetorial SVG interativo.
- **Critérios de Aceitação:**
  - [ ] Função para registrar pesagem (data e kg).
  - [ ] Gráfico SVG calcula coordenadas proporcionais sem estourar viewbox.
  - [ ] Testes unitários comprovam cálculo de delta e histórico.
- **Arquivos:** `src/types/workout.ts`, `src/utils/storage.ts`, `src/components/WeightTracker.tsx`, `src/components/WeightTracker.test.ts`.

### Task 2: Mecanismo de Substituição Anatômica de Exercícios
- **Descrição:** Permitir substituir um exercício da série diária por uma alternativa compatível pelo mesmo grupo muscular principal (Padrão Mobbin).
- **Critérios de Aceitação:**
  - [ ] Função `getAlternativeExercises(exerciseId)` retorna exercícios do mesmo grupo muscular excluindo o atual.
  - [ ] Função de substituição no storage salva e recupera a rotina modificada.
  - [ ] Testes unitários validam a troca e integridade da lista.
- **Arquivos:** `src/data/exercises.ts`, `src/utils/storage.ts`, `src/components/ExerciseReplacementModal.tsx`, `src/components/exerciseReplacement.test.ts`.

### Task 3: Painel de Configurações e Preferências do Treinador
- **Descrição:** Adicionar modal de configurações com toggles para áudio, tempo de contagem regressiva (3s, 5s, 10s) e vibração.
- **Critérios de Aceitação:**
  - [ ] `AppSettings` persistido e carregado com valores default.
  - [ ] `WorkoutPlayer` respeita o tempo de preparação configurado e toggle de áudio.
  - [ ] Testes unitários validam persistência e fallback.
- **Arquivos:** `src/components/SettingsModal.tsx`, `src/components/WorkoutPlayer.tsx`, `src/utils/storage.ts`.

### Task 4: Service Worker PWA Offline Nativo
- **Descrição:** Implementar `public/sw.js` com estratégia Cache-First para assets estáticos e scripts, garantindo execução em Modo Avião sem conexão.
- **Critérios de Aceitação:**
  - [ ] `public/sw.js` intercepta requisições locais e serve do cache offline.
  - [ ] Registro do Service Worker em `src/main.tsx` com verificação de compatibilidade.
  - [ ] Build de produção gera manifesto e assets referenciados.
- **Arquivos:** `public/sw.js`, `src/main.tsx`.

### Task 5: Integração no Dashboard e Homologação Final
- **Descrição:** Conectar o card de peso, botão de configurações e substituições no `src/App.tsx`, garantindo layout responsivo de elite e zero regressão.
- **Critérios de Aceitação:**
  - [ ] Todos os testes unitários passando (`npm test`).
  - [ ] Build de produção bem-sucedido (`npm run build`).
  - [ ] Interface visual harmônica sem quebras no desktop e mobile.
- **Arquivos:** `src/App.tsx`, `src/components/ExerciseModal.tsx`.
