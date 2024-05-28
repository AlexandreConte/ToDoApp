export default class ErroTarefaJaEstaNaLista extends Error {
  constructor(mensagem: string = "") {
    super("A tarefa selecionada já está nessa lista!\n" + mensagem)
  }
}