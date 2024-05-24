// Modelos
import Entidade from "./Entidade"
import Tarefa from "./Tarefa"

// Interafaces
import ListaProps from "../interface/ListaProps"
import ErroTituloInvalido from "../erros/ErroTituloInvalido"
import ErroTituloVazio from "../erros/ErroTituloVazio"

export default class ListaDeTarefas extends Entidade implements ListaProps {
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

  adicionarTarefa(tarefa: Tarefa): void {
    this._tarefas.push(tarefa)
  }

  removerTarefaDaListaPorIndice(indice: number): void {
    this._tarefas.splice(indice, 1)
  }

  indiceDaTarefa(id: string): number {
    const tarefa = this.tarefas.find(t => t.id === id)
    const index = this.tarefas.findIndex(t => t === tarefa)
    return index
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