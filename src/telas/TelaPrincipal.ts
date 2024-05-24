// Telas
import Tela from "./Tela"

// Enums
import OpcoesDoMenuPrincipal from "../enums/OpcoesDoMenuPrincipal"

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
    let opcao = this.prompt("Sua opção: ")
    console.log()
    while (
      opcao !== OpcoesDoMenuPrincipal.AbrirTelaDeTarefas &&
      opcao !== OpcoesDoMenuPrincipal.AbrirTelaDeListasDeTarefas &&
      opcao !== OpcoesDoMenuPrincipal.Fechar
    ) {
      console.log("Opção Inválida!")
      opcao = this.prompt("Sua opção: ")
    }
    return opcao
  }
}