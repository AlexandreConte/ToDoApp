export default class ErroListaSemTarefas extends Error {
  constructor(mensagem?: string) {
    super("Lista não possui nenhuma tarefa!\n" + mensagem)
  }
}