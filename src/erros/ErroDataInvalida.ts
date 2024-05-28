export default class ErroDataInvalida extends Error {
  constructor(mensagem: string = "") {
    super("Data inválida!\n" + mensagem)
  }
}