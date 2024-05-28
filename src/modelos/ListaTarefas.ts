// Modelos:
import Entidade from "./Entidade"
import Tarefa from "./Tarefa"
// Erros:
import ErroTituloInvalido from "../erros/ErroTituloInvalido"
import ErroTituloVazio from "../erros/ErroTituloVazio"

export default class ListaDeTarefas extends Entidade {
  private _titulo: string
  constructor(
    titulo: string,
    private _tarefas: Tarefa[] = []
  ) {
    super()
    this.validarTitulo(titulo)
    this._titulo = titulo
  }

  get tarefas(): Tarefa[] {
    return this._tarefas
  }

  get titulo(): string {
    return this._titulo
  }

  set titulo(titulo: string) {
    this.validarTitulo(titulo)
    this._titulo = titulo
  }

  get estaVazia(): boolean {
    return this.tarefas.length === 0
  }

  get possuiTarefas(): boolean {
    return this.tarefas.length > 0
  }

  tarefaJaEstaNaLista(id: string): boolean {
    const tarefa = this._tarefas.find(tarefa => tarefa.id === id)
    const tarefaJaExiste = tarefa ? true : false
    return tarefaJaExiste
  }

  adicionarTarefa(tarefa: Tarefa): void {
    this._tarefas.push(tarefa)
  }

  removerTarefaDaListaPorIndice(indice: number): void {
    this._tarefas.splice(indice, 1)
  }

  encontrarIndiceDaTarefa(idDaTarefa: string): number {
    const indice = this.tarefas.findIndex(t => t.id === idDaTarefa)
    return indice
  }

  private validarTitulo(titulo: string) {
    if (titulo.trim().length === 0) {
      throw new ErroTituloVazio()
    }
    if (typeof titulo !== "string") {
      throw new ErroTituloInvalido()
    }
  }
}