// Modelos
import Tarefa from "../modelos/Tarefa"

// Telas
import TelaDeTarefas from "../telas/TelaDeTarefas"

// Controladores
import Controlador from "./Controlador"

// Erros
import ErroNenhumaTarefaCadastrada from "../erros/ErroNenhumaTarefaCadastrada"
import ErroTarefaNaoEncontrada from "../erros/ErroTarefaNaoEncontrada"

// Enums
import OpcoesDoMenuDeTarefas from "../opcoesDeMenus/OpcoesDoMenuDeTarefas"

export default class ControladorDeTarefas extends Controlador {
  constructor(
    private readonly _telaDeTarefas = TelaDeTarefas,
    private _tarefas: Tarefa[] = []
  ) {
    super()
  }

  get telaDeTarefas() {
    return this._telaDeTarefas
  }

  get tarefas(): Tarefa[] {
    return this._tarefas
  }

  get existemTarefasCadastradas(): boolean {
    return this.tarefas.length > 0
  }

  get naoExistemTarefasCadastradas(): boolean {
    return this.tarefas.length === 0
  }

  validarSeExistemTarefas(): void {
    if (this.naoExistemTarefasCadastradas) {
      throw new ErroNenhumaTarefaCadastrada()
    }
  }

  validarSeTarefaExiste(tarefa: Tarefa | null) {
    if (tarefa === null) {
      throw new ErroTarefaNaoEncontrada()
    }
  }

  validarIndiceDeTarefa(indice: number): void {
    if (indice === -1) {
      throw new ErroTarefaNaoEncontrada()
    }
  }

  abrirTela() {
    this.abrir()
    while (this.manterAberto) {
      try {
        let opcao = this.telaDeTarefas.mostrarMenu()
        switch (opcao) {
          case OpcoesDoMenuDeTarefas.Cadastrar:
            this.cadastrarTarefa()
            break
          case OpcoesDoMenuDeTarefas.EditarTitulo:
            this.editarTitulo()
            break
          case OpcoesDoMenuDeTarefas.Excluir:
            this.excluirTarefa()
            break
          case OpcoesDoMenuDeTarefas.Imprimir:
            this.imprimirTarefas(true)
            break
          case OpcoesDoMenuDeTarefas.Concluir:
            this.concluirUmaTarefa()
            break
          case OpcoesDoMenuDeTarefas.MarcarComoParaFazer:
            this.marcarTarefaParaFazer()
            break
          case OpcoesDoMenuDeTarefas.Voltar:
            this.fechar()
            break
          default:
            break
        }
      } catch (erro: any) {
        this.telaDeTarefas.imprimirMensagem("Erro:")
        this.telaDeTarefas.imprimirMensagem(erro.message)
        this.telaDeTarefas.esperarInteracao()
      }
    }
  }

  cadastrarTarefa(): void {
    const { titulo, prazo } = this.telaDeTarefas.cadastrarTarefa()
    const tarefa = new Tarefa(titulo, prazo ? new Date(prazo) : null)
    this.tarefas.push(tarefa)
    this.telaDeTarefas.imprimirTarefa(tarefa)
    this.telaDeTarefas.esperarInteracao()
  }

  editarTitulo(): void {
    this.validarSeExistemTarefas()
    this.imprimirTarefas()
    this.telaDeTarefas.imprimirMensagem("-- Editando o título de uma tarefa existente --")
    const tarefa = this.encontrarTarefaComId()
    this.validarSeTarefaExiste(tarefa)
    const titulo = this.telaDeTarefas.pedirNovoTitulo()
    tarefa!.titulo = titulo
    this.telaDeTarefas.imprimirMensagem("\nTarefa atualizada! ")
    this.telaDeTarefas.imprimirTarefa(tarefa!)
    this.telaDeTarefas.esperarInteracao()
  }

  excluirTarefa(): void {
    this.validarSeExistemTarefas()
    this.imprimirTarefas()
    const tarefa = this.encontrarTarefaComId()
    this.validarSeTarefaExiste(tarefa)
    const indice = this.encontrarIndiceDaTarefaComId(tarefa!.id)
    this.validarIndiceDeTarefa(indice)
    const tarefaExcluida = this.tarefas.splice(indice, 1)[0]
    this.telaDeTarefas.imprimirTarefa(tarefaExcluida)
    this.telaDeTarefas.imprimirMensagem("Tarefa exluída!\n")
    this.telaDeTarefas.esperarInteracao()
  }

  imprimirTarefas(esperarInteracao: boolean = false): void {
    this.validarSeExistemTarefas()
    this.telaDeTarefas.imprimirMensagem("Tarefas:\n")
    this.tarefas.forEach(tarefa => this.telaDeTarefas.imprimirTarefa(tarefa))
    if (esperarInteracao) {
      this.telaDeTarefas.esperarInteracao()
    }
  }

  concluirUmaTarefa() {
    this.validarSeExistemTarefas()
    this.telaDeTarefas.imprimirTarefas(this.tarefas)
    const tarefa = this.encontrarTarefaComId()
    this.validarSeTarefaExiste(tarefa)
    tarefa!.completar()
    this.telaDeTarefas.imprimirTarefa(tarefa!)
    this.telaDeTarefas.imprimirMensagem("\nTarefa concluída!\n")
    this.telaDeTarefas.esperarInteracao()
  }

  marcarTarefaParaFazer(): void {
    this.validarSeExistemTarefas()
    this.telaDeTarefas.imprimirTarefas(this.tarefas)
    const tarefa = this.encontrarTarefaComId()
    this.validarSeTarefaExiste(tarefa)
    tarefa!.descompletar()
    this.telaDeTarefas.imprimirTarefa(tarefa!)
    this.telaDeTarefas.imprimirMensagem("\nTarefa marcada como não concluída!")
    this.telaDeTarefas.esperarInteracao()
  }

  imprimirTarefa(tarefa: Tarefa) {
    this.validarSeExistemTarefas()
    this.validarSeTarefaExiste(tarefa)
    this.telaDeTarefas.imprimirMensagem(`${tarefa.titulo}`)
    this.telaDeTarefas.imprimirMensagem(`Id: ${tarefa.id}`)
    this.telaDeTarefas.imprimirMensagem(`Prazo: ${tarefa.prazoFormatado}`)
    this.telaDeTarefas.imprimirMensagem(`Concluída: ${tarefa.estaCompletoFormatado}`)
    this.telaDeTarefas.imprimirMensagem(`Criada em: ${tarefa.dataDeCriacaoFormatada}\n`)
    this.telaDeTarefas.imprimirMensagem("")
  }

  encontrarTarefaComId(): Tarefa | null {
    const id = this.telaDeTarefas.pedirIdDaTarefa()
    return this._tarefas.find(t => t.id === id) ?? null
  }

  encontrarIndiceDaTarefa(): number {
    const id = this.telaDeTarefas.pedirIdDaTarefa()
    const indice = this.tarefas.findIndex(t => t.id === id)
    return indice
  }

  encontrarIndiceDaTarefaComId(id: string): number {
    const indice = this.tarefas.findIndex(tarefa => tarefa.id === id)
    return indice
  }
}