import Tela from "./Tela"

export default class TelaPrincipal extends Tela {
  constructor() {
    super()
   }

  static mostrarMenu(): "1" | "2" | "0" {
    console.log()
    console.log("-- Tela Principal --")
    console.log("1 - Acessar tela de tarefas")
    console.log("2 - Acessar tela de listas de tarefas")
    console.log("0 - Sair da aplicação")
    let opcao = this.prompt("Sua opção: ")
    console.log()
    while (
      opcao !== "1" &&
      opcao !== "2" &&
      opcao !== "0"
    ) {
      console.log("Opção Inválida!")
      opcao = this.prompt("Sua opção: ")
    }
    return opcao
  }
}