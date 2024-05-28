export default class ErroNenhumaListaCadastrada extends Error {
  constructor(mensagem: string = "") {
    super("Nenhuma lista cadastrada!\n" + mensagem)
  }
}