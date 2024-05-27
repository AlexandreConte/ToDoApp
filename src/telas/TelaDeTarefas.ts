// Telas
import Tela from "./Tela"
// Interfaces
import TarefaProps from "../interfaces/TarefaProps"
// Enums
import OpcoesDoMenuDeTarefas from "../opcoesDeMenus/OpcoesDoMenuDeTarefas"

export default class TelaDeTarefas extends Tela {
  constructor() {
    super()
  }

  static pedirTitulo(): string {
    return this.prompt("Título da tarefa: ")
  }

  static pedirNovoTitulo(): string {
    return this.prompt("Novo título da tarefa: ")
  }

  static pedirIdDaTarefa() {
    return this.prompt("ID da tarefa a ser selecionada: ")
  }

  static cadastrarTarefa(): { titulo: string, prazo: Date | null } {
    console.log("")
    console.log("-- Cadastro de Tarefa --")
    const titulo: string = this.prompt("Título: ")
    const prazo: Date | null = this.pedirPrazoDaTarefa()
    return { titulo, prazo }
  }

  static imprimirTarefas(tarefas: TarefaProps[]) {
    tarefas.map(tarefa => this.imprimirTarefa(tarefa))
  }

  static imprimirTarefa(tarefa: TarefaProps): void {
    console.log("Tarefa: ", tarefa.titulo)
    console.log("Tarefa Concluída: ", tarefa.estaCompletoFormatado)
    console.log("Prazo formatado: ", tarefa.prazoFormatado)
    console.log("Data de criação: ", tarefa.dataDeCriacaoFormatada)
    console.log("Id: ", tarefa.id)
    console.log()
  }

  static pedirPrazoDaTarefa(): Date | null {
    console.log()
    const prazoPrompt = this.prompt("Prazo da tarefa (formato dd/mm/yyyy hh:mm:ss): ")
    const semPrazo = !prazoPrompt
    if (semPrazo) {
      return null
    }
    let dia: number, mes: number, ano: number
    let hora: number, minuto: number, segundo: number
    try {
      dia = +prazoPrompt.split(" ")?.[0]?.split("/")?.[0]
      mes = +prazoPrompt.split(" ")?.[0]?.split("/")?.[1] - 1 ?? new Date().getMonth() - 1
      ano = +prazoPrompt.split(" ")?.[0]?.split("/")?.[2] ?? new Date().getFullYear()
      hora = +prazoPrompt.split(" ")?.[1]?.split(":")?.[0] ?? 0
      minuto = +prazoPrompt.split(" ")?.[1]?.split(":")?.[1] ?? 0
      segundo = +prazoPrompt.split(" ")?.[1]?.split(":")?.[2] ?? 0
      if (segundo) {
        return new Date(ano, mes, dia, hora, minuto, segundo)
      }
      if (minuto) {
        return new Date(ano, mes, dia, hora, minuto)
      }
      if (hora) {
        return new Date(ano, mes, dia, hora)
      }
    } catch (error) {
      console.log("Data inválida!")
    }
    return new Date(ano!, mes!, dia!)
  }

  static mostrarMenu(): OpcoesDoMenuDeTarefas {
    console.log("")
    console.log("-- Tela de Tarefas --")
    console.log("1 - Cadastrar uma nova tarefa")
    console.log("2 - Imprimir tarefas")
    console.log("3 - Editar o título de uma tarefa existente")
    console.log("4 - Excluir uma tarefa")
    console.log("5 - Concluir uma tarefa")
    console.log("6 - Desmarcar a conclusão de uma tarefa")
    console.log("7 - Editar o prazo de uma tarefa")
    console.log("0 - Voltar")
    const opcoesValidas = Object.values(OpcoesDoMenuDeTarefas)

    let opcao = this.prompt("Sua opção: ")?.[0]
    console.log()
    while (!opcoesValidas.includes(opcao as OpcoesDoMenuDeTarefas)) {
      console.log("Opção inválida!")
      opcao = this.prompt("Sua opção: ") as OpcoesDoMenuDeTarefas
    }
    return opcao as OpcoesDoMenuDeTarefas
  }
}