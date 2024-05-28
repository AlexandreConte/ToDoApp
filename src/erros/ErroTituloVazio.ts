import ErroTituloInvalido from "./ErroTituloInvalido";

export default class ErroTituloVazio extends ErroTituloInvalido {
  constructor(mensagem?: string) {
    super("Título não pode ser vazio!\n" + mensagem);
  }
}