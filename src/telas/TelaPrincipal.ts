// Tela:
import Tela from "./Tela"
// Enum menu:
import OpcoesMenuPrincipal from "../opcoesDeMenus/OpcoesMenuPrincipal"

export default class TelaPrincipal extends Tela {
  constructor() {
    super()
  }

  static mostrarMenu(): OpcoesMenuPrincipal {
    console.log()
    console.log("-- Tela Principal --")
    console.log("1 - Acessar tela de tarefas")
    console.log("2 - Acessar tela de listas de tarefas")
    console.log("0 - Sair da aplicação")
    let opcao = this.prompt("Sua opção: ")?.[0]
    console.log()
    const opcoesValidas = Object.values(OpcoesMenuPrincipal)
    while (!opcoesValidas.includes(opcao as OpcoesMenuPrincipal)) {
      console.log("Opção Inválida!")
      opcao = this.prompt("Sua opção: ") as OpcoesMenuPrincipal
    }
    return opcao as OpcoesMenuPrincipal
  }
}