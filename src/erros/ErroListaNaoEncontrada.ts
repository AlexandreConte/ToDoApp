export default class ErroListaNaoEncontrada extends Error {
  constructor() {
    super("Lista não encontrada! Retornando...")
  }
}