// Tela
import Tela from "./Tela"

export default class TelaDeTarefas extends Tela {
  constructor() {
    super()
  }

  static mostrarMenu(): "1" | "2" | "3" | "4" | "0" {
    console.log("-- Tela de Tarefas --")
    console.log("1 - Cadastrar uma nova tarefa")
    console.log("2 - Editar uma tarefa existente")
    console.log("3 - Excluir uma tarefa")
    console.log("4 - Imprimir tarefas")
    console.log("0 - Voltar")
    let opcao = this.prompt("Sua opção: ")
    console.log()
    while (
      opcao !== "0" &&
      opcao !== "1" &&
      opcao !== "2" &&
      opcao !== "3" &&
      opcao !== "4"
    ) {
      console.log("Opção inválida!")
      opcao = this.prompt("Sua opção: ")
    }
    return opcao
  }

  static cadastrarTarefa(): { titulo: string, prazo: Date | null } {
    console.log("-- Cadastro de Tarefa --");
    const titulo: string = this.prompt("Título: ")
    let prazo: Date | null = null
    const prazoInput = this.prompt(`Prazo (Formato: dd/MM/yyyy hh:mm:ss) `)
    try {
      const dia = prazoInput.split("/")?.[0]
      const mes = prazoInput.split("/")?.[1]
      const ano = prazoInput.split("/")?.[2]
      const hora = prazoInput.split(" ")?.[0].split(":")[0]
      const minuto = prazoInput.split(" ")?.[0].split(":")[1]
      const segundo = prazoInput.split(" ")?.[0].split(":")[2]
      if (ano)
        prazo = new Date(+ano, +mes, +dia, +hora, +minuto, +segundo)
      else
        prazo = null
    } catch {
      console.log(`Digite uma data válida!`)
    }
    return { titulo, prazo }
  }

  static imprimirTarefa(titulo: string, prazoFormatado: string, id: string, estaCompletoFormatado: string): void {
    console.log(`Tarefa:\n${titulo}\nPrazo: ${prazoFormatado}\nID: ${id}\nConcluído: ${estaCompletoFormatado}`)
  }

  static pegarId(): string {
    return this.prompt("Digite o ID da tarefa: ")
  }

  static imprimir(mensagem: string) {
    console.log(mensagem)
  }

  static pedirPorId() {
    return this.prompt("ID da tarefa a ser selecionado: ")
  }

  static pedir(mensagem: string) {
    return this.prompt(mensagem)
  }

  static imprimirNaoEncontrouTarefa() {
    console.log("Tarefa não encontrada!")
  }

  static imprimirSemTarefasCadastradas() {
    console.log("Não há tarefas cadastradas!")
  }

  static imprimirErro(e?: any) {
    console.log("Erro Desconhecido:")
    console.log(e ?? "")
  }
}