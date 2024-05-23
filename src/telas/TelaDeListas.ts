// Telas
import Tela from "./Tela"

export default class TelaDeListas extends Tela {
  constructor() {
    super()
  }

  static mostrarMenu(): "1" | "2" | "3" | "4" | "5" | "0" {
    console.log()
    console.log("-- Tela de listas --")
    console.log("1 - Mostrar listas")
    console.log("2 - Cadastrar nova lista")
    console.log("3 - Editar o título de uma lista")
    console.log("4 - Excluir uma lista")
    console.log("5 - Mover tarefa existente para uma lista")
    console.log("0 - Voltar")

    let opcao = this.prompt("Sua opção: ")
    console.log()
    while (
      opcao !== "1" &&
      opcao !== "2" &&
      opcao !== "3" &&
      opcao !== "4" &&
      opcao !== "5" &&
      opcao !== "0"
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

  static imprimirLista(titulo: string, id: string) {
    console.log(`Lista: ${titulo} - ID: ${id}`)
  }

  static excluirLista(): { id: string } {
    console.log("-- Excluir uma lista existente --")
    const id = this.pedir("Id da lista: ")
    return { id }
  }

  static pedir(mensagem: string): string {
    return this.prompt(mensagem)
  }

  static imprimirTarefaDaLista(titulo: string, prazoFormatado: string, estaCompletoFormatado: string, id: string) {
    console.log(titulo)
    console.log("Prazo: " + prazoFormatado)
    console.log("Conluída: " + estaCompletoFormatado)
    console.log("Id: " + id)
  }

  static imprimirNenhumaListaCorrespondeComBusca() {
    console.log("Lista procurada não encontrada!")
  }

  static imprimirNenhumaListaEstaCadastrada() {
    console.log("Nenhuma lista cadastrada!")
  }

  static imprimirListaEstaSemTarefas() {
    console.log("A lista não possui tarefas cadastradas!")
  }

  static imprimirTituloInvalido() {
    console.log("Título inválido!")
  }

  static imprimirListas() {
    console.log("Listas cadastradas no sistema: ")
  }
}