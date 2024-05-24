export default class ErroTarefaNaoEncontrada extends Error {
  constructor() {
    super("Tarefa não encontrada! Retornando...")
  }
}