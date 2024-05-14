export default class ErroTituloInvalido extends Error {
  constructor() {
    super("Título não pode ser inválido!");
  }
}