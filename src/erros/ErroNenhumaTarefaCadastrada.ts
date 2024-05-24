export default class ErroNenhumaTarefaCadastrada extends Error {
  constructor() {
    super("Não existem tarefas cadastradas! Retornando...")
  }
}