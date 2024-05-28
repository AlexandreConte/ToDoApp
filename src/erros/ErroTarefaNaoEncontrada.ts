export default class ErroTarefaNaoEncontrada extends Error {
  constructor(mensagem: string = "") {
    super("Tarefa não encontrada!\n" + mensagem)
  }
}