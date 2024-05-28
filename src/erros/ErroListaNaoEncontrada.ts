export default class ErroListaNaoEncontrada extends Error {
  constructor(mensagem?: string) {
    super("Lista não encontrada!\n" + mensagem)
  }
}