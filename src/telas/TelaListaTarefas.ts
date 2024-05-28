// Tela:
import Tela from "./Tela"
// Enum Menu:
import OpcoesMenuListaTarefas from "../opcoesDeMenus/OpcoesMenuListaTarefas"


export default class TelaListaTarefas extends Tela {
  constructor() {
    super()
  }

  static cadastrarLista(): string {
    console.log("Cadastro de uma nova lista de tarefas!")
    const titulo = this.prompt("Título da lista: ")
    return titulo
  }

  static pedirIdDaLista(): string {
    console.log("Seleção de lista de tarefas!")
    return this.prompt("Id da lista para seleção: ")
  }

  static pedirTitulo(): string {
    console.log("Cadastrando titulo da lista de tarefas!")
    return this.prompt("Título da lista: ")
  }

  static pedirConfirmacao(): "s" | "n" {
    const mensagem = "Digite 's' para Sim e 'n' para Não: "
    let opcao = this.prompt(mensagem).trim().toLowerCase().charAt(0)
    while (opcao !== "s" && opcao !== "n") {
      console.log("Opção inválida! Tente novamente...")
      opcao = this.prompt(mensagem).trim().toLowerCase().charAt(0)
    }
    return opcao
  }

  static mostrarMenu(): OpcoesMenuListaTarefas {
    console.log()
    console.log("-- Tela de listas --")
    console.log("1 - Cadastrar nova lista")
    console.log("2 - Mostrar listas")
    console.log("3 - Editar o título de uma lista")
    console.log("4 - Excluir uma lista")
    console.log("5 - Mover tarefa existente para uma lista")
    console.log("6 - Remover uma tarefa da lista")
    console.log("7 - Adicionar uma nova tarefa em uma lista existente")
    console.log("0 - Voltar")
    const opcoesValidas = Object.values(OpcoesMenuListaTarefas)

    let opcao = this.prompt("Sua opção: ")?.[0]
    while (!opcoesValidas.includes(opcao as OpcoesMenuListaTarefas)) {
      console.log("Opção inválida!")
      opcao = this.prompt("Sua opção: ") as OpcoesMenuListaTarefas
    }
    return opcao as OpcoesMenuListaTarefas
  }
}