// Telas
import Tela from "./Tela"
// Enums
import OpcoesDoMenuPrincipal from "../opcoesDeMenus/OpcoesDoMenuPrincipal"

export default class TelaPrincipal extends Tela {
  constructor() {
    super()
  }

  static mostrarMenu(): OpcoesDoMenuPrincipal {
    console.log()
    console.log("-- Tela Principal --")
    console.log("1 - Acessar tela de tarefas")
    console.log("2 - Acessar tela de listas de tarefas")
    console.log("0 - Sair da aplicação")
    let opcao = this.prompt("Sua opção: ")?.[0]
    console.log()
    const opcoesValidas = Object.values(OpcoesDoMenuPrincipal)
    while (!opcoesValidas.includes(opcao as OpcoesDoMenuPrincipal)) {
      console.log("Opção Inválida!")
      opcao = this.prompt("Sua opção: ") as OpcoesDoMenuPrincipal
    }
    return opcao as OpcoesDoMenuPrincipal
  }
}