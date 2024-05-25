// Telas
import Tela from "./Tela"

// Interfaces
import TarefaProps from "../interface/Tarefa"

// Enums
import OpcoesDoMenuDeTarefas from "../enums/OpcoesDoMenuDeTarefas"

export default class TelaDeTarefas extends Tela {
  constructor() {
    super()
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
    console.log("0 - Voltar")
    let opcao = this.prompt("Sua opção: ")
    console.log()
    while (
      opcao !== OpcoesDoMenuDeTarefas.Cadastrar &&
      opcao !== OpcoesDoMenuDeTarefas.Imprimir &&
      opcao !== OpcoesDoMenuDeTarefas.EditarTitulo &&
      opcao !== OpcoesDoMenuDeTarefas.Excluir &&
      opcao !== OpcoesDoMenuDeTarefas.Concluir &&
      opcao !== OpcoesDoMenuDeTarefas.MarcarComoParaFazer &&
      opcao !== OpcoesDoMenuDeTarefas.Voltar
    ) {
      console.log("Opção inválida!")
      opcao = this.prompt("Sua opção: ")
    }
    return opcao
  }

  static pedirTitulo(): string {
    return this.prompt("Título da tarefa: ")
  }

  static pedirPorId() {
    return this.prompt("ID da tarefa a ser selecionado: ")
  }

  static cadastrarTarefa(): { titulo: string, prazo: Date | null } {
    console.log("")
    console.log("-- Cadastro de Tarefa --")
    const titulo: string = this.prompt("Título: ")
    const prazoInput = this.prompt(`Prazo (Formato: dd/MM/yyyy hh:mm:ss): `)
    const semPrazo = !prazoInput
    if (semPrazo) {
      return { titulo, prazo: null}
    }
    let prazo: Date | null = null
    try {
      const dia = prazoInput.split(" ")?.[0]?.split("/")?.[0]
      const mes = prazoInput.split(" ")?.[0]?.split("/")?.[1] ?? new Date().getMonth()
      const ano = prazoInput.split(" ")?.[0]?.split("/")?.[2] ?? new Date().getFullYear()
      const hora = prazoInput.split(" ")?.[1]?.split(":")?.[0] ?? 0
      const minuto = prazoInput.split(" ")?.[1]?.split(":")?.[1] ?? 0
      const segundo = prazoInput.split(" ")?.[1]?.split(":")?.[2] ?? 0
      if (segundo) {
        prazo = new Date(+ano, +mes - 1, +dia, +hora, +minuto, +segundo)
      }
      if (minuto) {
        prazo = new Date(+ano, +mes - 1, +dia, +hora, +minuto)
      }
      if (hora) {
        prazo = new Date(+ano, +mes - 1, +dia, +hora)
      }
      prazo = new Date(+ano, +mes - 1, +dia)
      return { titulo, prazo }
    } catch {
      console.log(`Digite uma data válida!`)
    }
    return { titulo, prazo }
  }

  static imprimirTarefas(tarefas: TarefaProps[]) {
    tarefas.map(tarefa => this.imprimirTarefa(tarefa))
  }

  static imprimirTarefa(tarefa: TarefaProps): void {
    console.log("Tarefa: ", tarefa.titulo)
    console.log("Tarefa Concluída? ", tarefa.estaCompletoFormatado)
    console.log("Prazo formatado: ", tarefa.prazoFormatado)
    console.log("Data de criação: ", tarefa.dataDeCriacaoFormatada)
    console.log("Id: ", tarefa.id)
    console.log()
  }

  static imprimirNaoEncontrouTarefa() {
    console.log("Tarefa não encontrada!")
  }

  static imprimirSemTarefasCadastradas() {
    console.log("Não há tarefas cadastradas!")
  }

  static imprimirMensagemDeNenhumaTarefaCadastrada() {
    console.log("Nenhuma tarefa cadastrada no sistema! Procedimento cancelado...")
  }

  static imprimirMensagemDeTituloInvalido() {
    console.log("Título Inválido! Procedimento cancelado...")
  }

  static imprimirMensagemDeTituloVazio() {
    console.log("Título vazio! Procedimento cancelado...")
  }

  static imprimirMensagemDeTarefaNaoEncontrada() {
    console.log("Tarefa não encontrada! Procedimento cancelado...")
  }
}