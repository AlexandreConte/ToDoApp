export default class ErroTituloInvalido extends Error {
  constructor(mensagem?: string) {
    super("Título inválido!\n" + mensagem)
  }
}