# Tarefas: Animações Realistas e Consistentes 3D para Exercícios

- **Status Geral:** Concluído com Sucesso ✅
- **Referência:** `tasks/plan-animacoes-3d-exercicios.md`

---

## Lista de Tarefas

- [x] **T-01:** Mapear e efetuar a varredura dos 12 exercícios canônicos em repositórios/bancos 3D com o mesmo modelo/avatar consistente.
- [x] **T-02:** Gerar/otimizar os clipes de vídeo em formato WebM/MP4 (loop perfeito, fundo escuro, taxa de compressão < 1.2MB cada).
- [x] **T-03:** Salvar os 12 arquivos em `public/exercises/` com os slugs canônicos (`push-up`, `diamond-push-up`, `squat`, etc.).
- [x] **T-04:** Atualizar o contrato de tipos em `src/types/workout.ts` e `src/data/exercises.ts` com as referências dos vídeos.
- [x] **T-05:** Refatorar `src/components/ExerciseAnimation.tsx` para renderizar o loop de vídeo nativo acelerado por hardware com sincronização do botão `isPaused`.
- [x] **T-06:** Executar suite de testes unitários (`npm test -- --run`) garantindo zero quebra de regressão (10/10 suítes, 30/30 testes passando).
- [x] **T-07:** Realizar auditoria visual e funcional no Playwright nas viewports mobile (Android 360×740 e iPhone SE 375×667), confirmando fluidez e ausência de cortes.
- [x] **T-08:** Registrar commit no Git e documentar entrega.
