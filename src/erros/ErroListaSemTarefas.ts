export default class ErroListaSemTarefas extends Error {
  constructor() {
    super("Lista não possui nenhuma tarefa! Retornando...")
  }
}