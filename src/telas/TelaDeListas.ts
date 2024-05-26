// Telas
import Tela from "./Tela"

// Interfaces
import ListaProps from "../interfaces/ListaProps"
import TarefaProps from "../interfaces/TarefaProps"

// Enums 
import OpcoesDoMenuDeListas from "../opcoesDeMenus/OpcoesDoMenuDeListas"

export default class TelaDeListas extends Tela {
  constructor() {
    super()
  }

  static mostrarMenu(): OpcoesDoMenuDeListas {
    console.log()
    console.log("-- Tela de listas --")
    console.log("1 - Cadastrar nova lista")
    console.log("2 - Mostrar listas")
    console.log("3 - Editar o título de uma lista")
    console.log("4 - Excluir uma lista")
    console.log("5 - Mover tarefa existente para uma lista")
    console.log("6 - Remover uma tarefa da lista")
    console.log("0 - Voltar")
    const opcoesValidas = Object.values(OpcoesDoMenuDeListas)

    let opcao = this.prompt("Sua opção: ")
    while (!opcoesValidas.includes(opcao as OpcoesDoMenuDeListas)) {
      console.log("Opção inválida!")
      opcao = this.prompt("Sua opção: ") as OpcoesDoMenuDeListas
    }
    return opcao as OpcoesDoMenuDeListas
  }

  static cadastrarLista(): string {
    console.log("-- Cadastrar uma nova lista de tarefas --")
    const titulo = this.prompt("Título da lista: ")
    return titulo
  }

  static imprimirLista(lista: ListaProps) {
    const { titulo, id } = lista
    console.log("Lista: ", titulo)
    console.log("Id: ", id)
  }

  static pedirIdDaLista(): string {
    return this.prompt("Id da lista para seleção: ")
  }

  static pedirNovoTitulo(): string {
    return this.prompt("Novo título da lista: ")
  }

  static pedirTitulo(): string {
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

  static imprimirListas(listas: ListaProps[]) {
    console.log("Listas cadastradas no sistema: ")
    listas.forEach(lista => this.imprimirLista(lista))
  }

  static imprimirTarefaDaLista(tarefa: TarefaProps) {
    console.log("Título: ", tarefa.titulo)
    console.log("Prazo: ", tarefa.prazoFormatado)
    console.log("Concluído: ", tarefa.estaCompletoFormatado)
    console.log("Data de criação: ", tarefa.dataDeCriacaoFormatada)
    console.log("Id: ", tarefa.id)
  }
}