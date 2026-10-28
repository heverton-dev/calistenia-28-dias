# SPEC-animacoes-3d-exercicios: Animações Realistas e Consistentes 3D para Exercícios

- **Autor:** Antigravity AI
- **Data:** 2026-10-28
- **Status:** Proposta / Pronto para Planejamento
- **Módulo ID:** `media-3d-animations`
- **Intenção de Origem:** `docs/intent/animacoes-3d-exercicios.md`

---

## 1. Objetivo & Visão

Substituir as renderizações vetoriais SVG procedural por mídias de alta fidelidade visual (loops de animação 3D com biomecânica humana realista), padronizadas em um **único avatar atlético consistente** (estilo *BetterMe Men / Caliverse / Freeletics*).

### 1.1 Persona & Contexto
- **Usuário:** Praticante de calistenia em treino ativo no smartphone (PWA offline).
- **Problema:** Desenhos vetoriais simplificados carecem de profundidade muscular e referência biomecânica humana real (como trajetória articular, ângulo de cotovelo e postura de tronco).
- **Resultado Esperado:** Visual profissional de app esportivo de primeira linha, com cadência de movimento suave em loop perpétuo e 100% de consistência estética.

---

## 2. Requisitos Técnicos & Arquitetura

### 2.1 Requisitos Funcionais (RF)
- **RF-01 (Consistência do Personagem):** Todos os 12 exercícios canônicos devem usar exatamente o mesmo modelo 3D masculino/atlético (mesmo tom de pele/estilização, mesmas vestimentas esportivas, iluminação homogênea em estúdio escuro).
- **RF-02 (Looping Perfeito):** Cada clipe deve iniciar e terminar no mesmo quadro ou transicionar suavemente sem salto perceptível (loop seamless).
- **RF-03 (Player de Mídia Híbrido):** O componente `ExerciseAnimation` deve suportar vídeo WebM/MP4 otimizado com poster image e fallback gracioso sem quebrar o layout existente.
- **RF-04 (Sincronização com Play/Pause):** O vídeo ou loop deve pausar automaticamente quando o timer de treino pausar e retomar ao despausar.
- **RF-05 (Compatibilidade com Temas):** A moldura do player, iluminação ambiente e anel de progresso continuam reagindo dinamicamente às 5 cores de tema (`data-theme`).

### 2.2 Requisitos Não-Funcionais (RNF)
- **RNF-01 (100% Offline-First):** Nenhum arquivo de mídia pode depender de rede externa. Todos os ativos residem em `public/exercises/` e são cacheados pelo Service Worker do PWA.
- **RNF-02 (Budget de Desempenho e Armazenamento):**
  - Formato preferencial: **WebM (VP9) com fallback MP4 (H.264 Baseline/Main)**.
  - Taxa de quadros: 30 fps fluidos.
  - Resolução: 720×720 (quadrada) ou 720×960 (vertical mobile).
  - Tamanho máximo por clipe: **≤ 1.2 MB** por exercício (peso total dos 12 exercícios ≤ 15 MB).
- **RNF-03 (Desempenho de Bateria):** Uso de aceleração de hardware nativa de vídeo do browser móvel (`<video playsInline autoPlay loop muted>`), evitando o consumo de CPU/GPU de engines WebGL.

---

## 3. Mapeamento do Catálogo de Exercícios

| # | ID do Exercício | Nome Canônico | Ação Biomecânica | Arquivo Alvo (`public/exercises/`) |
|---|---|---|---|---|
| 1 | `push-up` | Flexão Tradicional | Empurrar horizontal (peito/tríceps) | `push-up.webm` / `push-up.mp4` |
| 2 | `diamond-push-up` | Flexão Diamante | Empurrar com mãos unidas | `diamond-push-up.webm` / `.mp4` |
| 3 | `pike-push-up` | Flexão Pike | Empurrar vertical angular | `pike-push-up.webm` / `.mp4` |
| 4 | `dips-bench` | Mergulho no Banco | Flexão/extensão cotovelo em banco | `dips-bench.webm` / `.mp4` |
| 5 | `plank` | Prancha Isométrica | Sustentação isométrica de prancha | `plank.webm` / `.mp4` |
| 6 | `mountain-climber` | Alpinista | Joelhos alternados em prancha | `mountain-climber.webm` / `.mp4` |
| 7 | `hollow-body-hold` | Canoa Isométrica | Sustentação concha no solo | `hollow-body-hold.webm` / `.mp4` |
| 8 | `bodyweight-squat` | Agachamento Livre | Flexão/extensão de joelhos/quadril | `bodyweight-squat.webm` / `.mp4` |
| 9 | `lunges` | Avanço / Passada | Passada unilateral alternada | `lunges.webm` / `.mp4` |
| 10 | `glute-bridge` | Elevação Pélvica | Ponte de quadril solo | `glute-bridge.webm` / `.mp4` |
| 11 | `jumping-jacks` | Polichinelo Ativo | Salto sincronizado braços/pernas | `jumping-jacks.webm` / `.mp4` |
| 12 | `burpee` | Burpee Completo | Agacha + joga pernas + flexão + salto | `burpee.webm` / `.mp4` |

---

## 4. Estratégia de Varredura e Ativos Consistentes

1. **Fonte dos Ativos com Mesmo Avatar:**
   - Varredura em repositórios abertos de biomecânica e animações de treino 3D com mesmo personagem (*Wger exercise assets, Mixamo animated rigs com modelo atlético padronizado, datasets de calistenia 3D estilizados CC-BY / Open Source*).
   - Conversão e compressão em duas vias via ffmpeg: WebM com compressão de alta densidade + MP4 H.264 compatível com Safari/iOS.
2. **Camada de Apresentação (`ExerciseAnimation.tsx`):**
   - Renderização via tag `<video>` com atributos `playsinline autoPlay loop muted`.
   - Ref de vídeo com efeito `useEffect` reagindo a `isPaused` (`videoRef.current.pause()` / `play()`).
   - Placeholder com skeleton loader e poster estático para zero layout-shift.
   - Preservação da overlay com badges informativos de 1 linha.

---

## 5. Critérios de Aceitação Binários (Gherkin)

```gherkin
Cenário: Reprodução fluida no WorkoutPlayer
  Dado que o usuário inicia o treino do Dia 1
  Quando o exercício "Flexão Tradicional" carregar na tela
  Então deve ser exibido o vídeo/animação 3D com o avatar atlético
  E o vídeo deve reproduzir em loop contínuo sem travamentos

Cenário: Pausa do exercício
  Dado que o treino está em andamento com o vídeo rodando
  Quando o usuário clica no botão "Pausar"
  Então o vídeo congela no frame atual
  E quando clica em "Retomar", o vídeo volta a rodar suavemente

Cenário: Consistência do Avatar
  Dado que o usuário avança do exercício 1 para o exercício 2
  Quando o novo exercício for apresentado
  Então o modelo anatômico/avatar deve ser visualmente o mesmo personagem
```

---

## 6. Comandos de Verificação
- **Testes Unitários:** `npm test -- --run`
- **Compilação:** `npm run build`
- **Validação E2E no Playwright:** `browser_navigate`, `browser_resize` (360×740 e 375×667), inspeção visual sem corte e sem consumo anormal de recursos.
