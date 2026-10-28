# Auditoria Heurística e Benchmarking Mobbin: Calistenia 28D

## 1. Resumo Executivo
Com base nas referências canônicas do Mobbin (Fitbod iOS, Apple Fitness, Ladder) e no vídeo de referência do BetterMe Men, a interface foi desconstruída e reestruturada para máxima eficiência física e cognitiva durante o treino.

## 2. Princípio Orientador: Fadiga Física e Carga Cognitiva
Durante um treino calistênico intenso, o praticante está ofegante, com suor nas mãos e com o telefone frequentemente apoiado no chão ou em um suporte. O design não pode exigir cliques complexos, digitação ou leitura de textos densos.

### Matriz de Correção de Anti-Patterns

| Componente | Versão Primitiva (Anti-Pattern) | Padrão Mobbin Implementado |
| :--- | :--- | :--- |
| **Anatomia Muscular** | Linhas de palito genéricas e estáticas | Silhueta atlética de alta fidelidade com camadas musculares segmentadas e mapas de calor bioluminescentes (Frente e Costas). |
| **Player de Treino** | Botões pequenos e timers discretos | Display esportivo digital gigante legível a 2 metros de distância com anel circular de contagem SVG e bips automáticos. |
| **Navegação do Desafio** | Lista linear de 28 itens acumulados | Seletor de abas/pills por Semana (Fases 1 a 4) com indicador visual de status imediato (Concluído, Hoje, Bloqueado). |
| **Feedback Sonoro** | Silêncio ou dependência de MP3 externos | Sintetizador de áudio Web Audio API integrado (senóides 780Hz/1200Hz nos 3s finais e acorde harmônico na transição). |
| **Prevenção de Suspensão** | Tela do iPhone/Android apagando após 30s | Ativação automática de `navigator.wakeLock` durante a sessão. |
