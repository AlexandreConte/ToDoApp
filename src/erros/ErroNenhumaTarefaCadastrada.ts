export default class ErroNenhumaTarefaCadastrada extends Error {
  constructor(mensagem?: string) {
    super("Não existem tarefas cadastradas!\n" + mensagem)
  }
}