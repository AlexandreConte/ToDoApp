// Telas
import Tela from "./Tela"

// Interfaces
import ListaProps from "../interface/ListaProps"
import TarefaProps from "../interface/Tarefa"

// Enums 
import OpcoesDoMenuDeListas from "../enums/OpcoesDoMenuDeListas"

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
    console.log("0 - Voltar")

    let opcao = this.prompt("Sua opção: ")
    console.log()
    while (
      opcao !== OpcoesDoMenuDeListas.CadastrarNovaLista &&
      opcao !== OpcoesDoMenuDeListas.MostrarListas &&
      opcao !== OpcoesDoMenuDeListas.EditarTituloDeLista &&
      opcao !== OpcoesDoMenuDeListas.ExcluirLista &&
      opcao !== OpcoesDoMenuDeListas.MoverUmaTarefaParaLista &&
      opcao !== OpcoesDoMenuDeListas.Voltar
    ) {
      console.log("Opção inválida!")
      opcao = this.prompt("Sua opção: ")
    }
    return opcao
  }

  static cadastrarLista(): { titulo: string } {
    console.log("-- Cadastrar uma nova lista de tarefas --")
    const titulo = this.prompt("Título da lista: ")
    return { titulo }
  }

  static imprimirLista(lista: ListaProps) {
    const { titulo, id } = lista
    console.log(`Lista: ${titulo} - ID: ${id}`)
  }

  static excluirLista(): { id: string } {
    console.log("-- Excluir uma lista existente --")
    const id = this.pedirPorId()
    return { id }
  }

  static pedirPorId(): string {
    return this.prompt("Id da lista: ")
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