# Especificação Técnica: Calistenia Daily Trainer v2 (Padrão Mobbin / BetterMe Pro)

## ASSUMPTIONS (Hipóteses do Método Osmani)
1. Armazenamento 100% local no dispositivo (LocalStorage / IndexedDB com fallback em memória), sem necessidade de servidor backend.
2. Interface com foco estrito em baixa carga cognitiva sob fadiga física (Padrão Mobbin Fitbod/BetterMe).
3. Gráficos de evolução corporal em SVG vetorial puro, zero dependências externas pesadas (D3 ou Chart.js desnecessários).
4. Suporte PWA offline real com Service Worker nativo para instalação persistente no Safari (iOS) e Chrome (Android).

---

## 1. Objetivo & Visão
Elevar a aplicação de calistenia para o padrão de produção comercial completo (referência Mobbin e BetterMe Men), adicionando:
1. **Rastreamento de Peso e Métricas Corporais:** Registro diário de peso corporal, cálculo de variação e gráfico vetorial SVG de evolução durante os 28 dias.
2. **Substituição Anatômica de Exercícios (Padrão Mobbin):** Possibilidade de substituir qualquer exercício do dia por uma variação compatível (ex: substituir Flexão Tradicional por Flexão no Joelho para iniciantes ou Flexão Diamante para avançados).
3. **Preferências e Ajustes do Treinador:** Painel de ajustes de áudio (bips sonoros liga/desliga), tempo de preparação (3s, 5s, 10s) e tempo de descanso.
4. **PWA Offline Service Worker:** Cache resiliente de 100% dos assets estáticos para funcionamento em Modo Avião no iOS e Android.

---

## 2. Comandos do Projeto
- **Dev:** `npm run dev`
- **Build:** `npm run build`
- **Test:** `npm test` (Vitest)
- **Preview:** `npm run preview`

---

## 3. Arquitetura e Contratos de Dados Adicionais

### Tipagens em `src/types/workout.ts`
```typescript
export interface WeightEntry {
  date: string; // YYYY-MM-DD
  weightKg: number;
}

export interface AppSettings {
  soundEnabled: boolean;
  prepTimeSeconds: number; // 3, 5 ou 10
  restTimeMultiplier: number; // 0.8, 1.0, 1.2
  vibrateEnabled: boolean;
}

export interface UserProgress {
  completedDays: number[];
  currentStreak: number;
  bestStreak: number;
  totalWorkoutsCompleted: number;
  lastCompletedDate?: string;
  weightHistory: WeightEntry[];
  settings: AppSettings;
  customizedItems?: Record<number, WorkoutItem[]>; // Substituições de exercícios por dia
}
```

---

## 4. Módulos & Critérios de Aceitação Binários

### Módulo 1: Rastreamento de Peso (`weight-tracker`)
- [ ] Permite registrar o peso atual com 1 casa decimal (ex: 78.5 kg).
- [ ] Renderiza gráfico de linha vetorial SVG responsivo com os últimos registros e meta.
- [ ] Exibe indicador de variação no topo do dashboard (ex: "-1.2 kg").

### Módulo 2: Substituição Anatômica de Exercícios (`exercise-replacement`)
- [ ] No modal de detalhes do dia ou durante o treino, o usuário pode clicar em "Substituir Exercício".
- [ ] O sistema lista apenas exercícios compatíveis com o mesmo grupo muscular principal.
- [ ] A troca substitui o item na sessão atual sem corromper a matriz global.

### Módulo 3: Preferências do Treinador (`app-settings`)
- [ ] Modal/Drawer de configurações acessível pelo ícone no cabeçalho.
- [ ] Permite ligar/desligar bips de contagem e alterar o tempo de preparação (3s, 5s, 10s).
- [ ] Persistência imediata no LocalStorage com sincronização reativa.

### Módulo 4: PWA Service Worker Offline (`pwa-offline`)
- [ ] Registro de Service Worker em `public/sw.js` com estratégia Cache-First para assets estáticos.
- [ ] Suporte a instalação offline completa no iOS (Safari "Adicionar à Tela de Início") e Android.

---

## 5. Critérios de Homologação Final
1. `npm test` executa com 100% de aprovação em todos os novos testes de domínio e componentes.
2. `npm run build` gera o bundle final de produção sem erros de tipagem.
3. Todas as funcionalidades operam offline sem requisições de rede.
