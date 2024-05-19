import Tarefa from "../models/Tarefa";
import TelaDeTarefas from "../views/TelaDeTarefas";
import Controlador from "./Controlador";

export default class ControladorDeTarefas extends Controlador {
  constructor(
    private readonly _telaDeTarefas: TelaDeTarefas = new TelaDeTarefas(),
    private readonly _tarefas: Tarefa[] = []
  ) {
    super()
  }

  get telaDetarefas() {
    return this._telaDeTarefas
  }

  get tarefas() {
    return this._tarefas
  }

  abrirTela() {
    this.abrir()
    while (this.manterAberto) {
      const opcao = this.telaDetarefas.mostrarMenu()
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
          this.imprimirTarefa()
          break

        case "0":
          this.fechar()
        default:
          break
      }
    }
  }

  cadastrarTarefa() {
    const { titulo, prazo } = this.telaDetarefas.cadastrarTarefa()
    const tarefa = new Tarefa(titulo, prazo)
    this.tarefas.push(tarefa)
  }

  editarTitulo() {
    this.imprimirTarefa()
    const id = this.telaDetarefas.pegarId()
    const tarefa = this.pegarPorId(id)
    const titulo = this.telaDetarefas.pedir("Novo Título: ")
    try {
      tarefa!.titulo = titulo
    } catch {
      this.telaDetarefas.imprimir("Erro ao alterar o titulo da tarefa!")
    }
  }

  imprimirTarefa() {
    this.tarefas.map(t => this.telaDetarefas.imprimirTarefa(t))
  }

  pegarPorId(id: string): Tarefa | undefined {
    return this._tarefas.find(t => t.Id === id)
  }

  excluirTarefa() {
    const id = this.telaDetarefas.pedir("Id da tarefa: ")
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