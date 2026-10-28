# Declaração de Intenção: Animações Realistas e Consistentes 3D para Exercícios

- **Status:** Confirmado
- **Data:** 2026-10-28
- **Domínio:** Mídia e Player de Exercícios / UI & UX Mobile

---

## 1. Intenção Alinhada

- **Resultado (Outcome):** Substituir as animações vetoriais atuais por demonstrações em vídeo/loop 3D estilizadas de alta fidelidade biomecânica, apresentando um **único avatar atlético consistente** (estilo *BetterMe / Freeletics / Caliverse*) em todos os exercícios do aplicativo.
- **Usuário:** Praticantes de calistenia que utilizam o app em smartphone e necessitam de referência visual humana clara, segura e esteticamente premium para a execução de cada movimento.
- **Por que agora:** Os gráficos vetoriais anteriores careciam de fidelidade anatômica e refinamento, descaracterizando a experiência visual exigida para o aplicativo.
- **Critério de Sucesso:**
  - 100% dos exercícios do programa de 28 dias utilizam o mesmo personagem/avatar 3D anatômico consistente.
  - Reprodução em loop perfeito, com iluminação limpa e cadência biomecânica realista.
  - Integração harmônica com o timer, contador de séries e o tema de cor ativo do app.
- **Restrições:**
  - Mídias locais no repositório (`public/exercises/` ou `public/animations/`), mantendo o app **100% offline-first**.
  - Formato de vídeo ultra-comprimido e moderno (WebM / MP4 H.264 compacto ou APNG/WebP animado de alta taxa de quadros) com peso inferior a ~1.5MB por exercício para viabilizar carregamento instantâneo em qualquer aparelho móvel.
- **Fora de Escopo:**
  - Vídeos misturando múltiplos atores reais ou fontes desiguais.
  - Engines WebGL interativas 3D em tempo real (como Three.js/Babylon) no dispositivo, para evitar alto consumo de bateria e incompatibilidade em aparelhos modestos.
  - Dependência de CDN externa ou streaming de vídeo em tempo real.
