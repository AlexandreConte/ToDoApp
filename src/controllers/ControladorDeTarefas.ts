import Tarefa from "../models/Tarefa";
import TelaDeTarefas from "../views/TelaDeTarefas";
import Controlador from "./Controlador";

export default class ControladorDeTarefas extends Controlador {
  constructor(
    private readonly _telaDeTarefas = TelaDeTarefas,
    private _tarefas: Tarefa[] = []
  ) {
    super()
  }

  get tarefas() {
    return this._tarefas
  }

  abrirTela() {
    this.abrir()
    while (this.manterAberto) {
      const opcao = this._telaDeTarefas.mostrarMenu()
      switch (opcao) {
        case "1":
          this.cadastrarTarefa()
          break

        case "2":
          this.editarTitulo()
          break

        case "3":
          this.excluirTarefa()
          break

        case "4":
          this.imprimirTarefas()
          break

        case "0":
          this.fechar()
        default:
          break
      }
    }
  }

  cadastrarTarefa() {
    const { titulo, prazo } = this._telaDeTarefas.cadastrarTarefa()
    const tarefa = new Tarefa(titulo, prazo)
    this.tarefas.push(tarefa)
  }

  editarTitulo() {
    this.imprimirTarefas()
    const id = this._telaDeTarefas.pegarId()
    const tarefa = this.pegarPorId(id)
    const titulo = this._telaDeTarefas.pedir("Novo Título: ")
    try {
      tarefa!.titulo = titulo
    } catch {
      this._telaDeTarefas.imprimir("Erro ao alterar o titulo da tarefa!")
    }
  }

  imprimirTarefas() {
    this.tarefas.map(t => this._telaDeTarefas.imprimirTarefa(t))
  }

  imprimirTarefa(tarefa: Tarefa) {
    if (tarefa) {
      this._telaDeTarefas.imprimir(`${tarefa.titulo} - ID: ${tarefa.Id} | ${tarefa.prazo}`)
      this._telaDeTarefas.imprimir("")
    } else {
      this._telaDeTarefas.imprimir("Nenhuma tarefa cadastrada na lista!")
    }
  }

  pegarPorId(id: string): Tarefa | undefined {
    return this._tarefas.find(t => t.Id === id)
  }

  excluirTarefa() {
    const id = this._telaDeTarefas.pedir("Id da tarefa: ")
    const tarefa = this.pegarPorId(id)
    const index = this.pegarIndice(id)
    if (tarefa) {
      this.tarefas.splice(index, 1)
    }
  }

  pegarIndice(id: string): number {
    return this.tarefas.findIndex(t => t.Id === id)
  }
}