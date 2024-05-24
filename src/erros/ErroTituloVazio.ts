export default class ErroTituloVazio extends Error {
  constructor() {
    super("Título não pode ser vazio! Retornando...");
  }
}