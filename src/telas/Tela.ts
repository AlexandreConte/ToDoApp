import Prompt from "prompt-sync";

export default class Tela {
  private static _prompt = Prompt()
  
  constructor() { }

  static get prompt() {
    return this._prompt
  }

  static mostrarMenu() {}

  static imprimirMensagem(mensagem: string) {
    console.log(mensagem)
  }

  static esperarInteracao() {
    this.prompt("Aperte 'enter' para continuar: ")
  }
}