// Modelo:
import Tarefa from "../modelos/Tarefa"
// Tela:
import TelaTarefas from "../telas/TelaTarefa"
// Controlador:
import Controlador from "./Controlador"
// Enum menu:
import OpcoesDoMenuDeTarefas from "../opcoesDeMenus/OpcoesMenuTarefa"
// Erros:
import ErroNenhumaTarefaCadastrada from "../erros/ErroNenhumaTarefaCadastrada"
import ErroTarefaNaoEncontrada from "../erros/ErroTarefaNaoEncontrada"

export default class ControladorTarefa extends Controlador {
  constructor(
    private readonly _telaTarefas = TelaTarefas,
    private _tarefas: Tarefa[] = []
  ) {
    super()
  }

  get telaTarefas() {
    return this._telaTarefas
  }

  get tarefas(): Tarefa[] {
    return this._tarefas
  }

  get existemTarefas(): boolean {
    return this.tarefas.length > 0
  }

  get naoExistemTarefas(): boolean {
    return this.tarefas.length === 0
  }

  lancarErroSeNaoExistiremTarefas(): void {
    if (this.naoExistemTarefas) {
      throw new ErroNenhumaTarefaCadastrada()
    }
  }

  lancarErroSeTarefaNaoExiste(tarefa: Tarefa | null) {
    if (tarefa === null) {
      throw new ErroTarefaNaoEncontrada()
    }
  }

  encontrarTarefaPeloId(id: string): Tarefa | null {
    const tarefa = this._tarefas.find(t => t.id === id) ?? null
    return tarefa
  }

  pedirIdTarefa(): string {
    const id = this.telaTarefas.pedirIdDaTarefa()
    return id
  }

  encontrarIndiceDaTarefa(id: string): number {
    const indice = this.tarefas.findIndex(tarefa => tarefa.id === id)
    return indice
  }

  imprimirTarefas(): void {
    this.lancarErroSeNaoExistiremTarefas()
    this.telaTarefas.imprimirMensagem("\nTarefas:\n")
    this.tarefas.forEach(
      tarefa => this.imprimirTarefa(tarefa)
    )
  }

  esperarInteracao(): void {
    this.telaTarefas.esperarInteracao()
  }

  imprimirTarefa(tarefa: Tarefa) {
    this.lancarErroSeTarefaNaoExiste(tarefa)
    this.telaTarefas.imprimirMensagem(`\n${tarefa.titulo}`)
    this.telaTarefas.imprimirMensagem(`Id: ${tarefa.id}`)
    this.telaTarefas.imprimirMensagem(`Prazo: ${tarefa.prazoFormatado}`)
    this.telaTarefas.imprimirMensagem(`Concluída: ${tarefa.estaCompletoFormatado}`)
    this.telaTarefas.imprimirMensagem(`Criada em: ${tarefa.dataDeCriacaoFormatada}\n`)
  }

  criarTarefa(): Tarefa {
    const { titulo, prazo } = this.telaTarefas.cadastrarTarefa()
    const tarefa = new Tarefa(titulo, prazo ? new Date(prazo) : null)
    return tarefa
  }

  cadastrarTarefa(): void {
    const tarefa = this.criarTarefa()
    this.tarefas.push(tarefa)
    this.telaTarefas.imprimirMensagem("\nTarefa cadastrada!\n")
    this.imprimirTarefa(tarefa)
  }

  excluirTarefa(): void {
    this.imprimirTarefas()
    const id = this.pedirIdTarefa()
    const tarefa = this.encontrarTarefaPeloId(id)
    this.lancarErroSeTarefaNaoExiste(tarefa)
    const indice = this.encontrarIndiceDaTarefa(tarefa!.id)
    this.tarefas.splice(indice, 1)
    this.telaTarefas.imprimirMensagem("\nTarefa exluída!\n")
    this.imprimirTarefa(tarefa!)
  }

  editarTitulo(): void {
    this.imprimirTarefas()
    const id = this.pedirIdTarefa()
    const tarefa = this.encontrarTarefaPeloId(id)
    this.lancarErroSeTarefaNaoExiste(tarefa)
    const titulo = this.telaTarefas.pedirTitulo()
    tarefa!.titulo = titulo
    this.telaTarefas.imprimirMensagem("\nTarefa atualizada!\n")
    this.imprimirTarefa(tarefa!)
  }

  editarPrazo(): void {
    this.imprimirTarefas()
    const id = this.pedirIdTarefa()
    const tarefa = this.encontrarTarefaPeloId(id)
    this.lancarErroSeTarefaNaoExiste(tarefa)
    const prazo = this.telaTarefas.pedirPrazoDaTarefa()
    tarefa!.prazo = prazo!
    this.telaTarefas.imprimirMensagem("\nPrazo atualizado!\n")
    this.imprimirTarefa(tarefa!)
  }

  concluirUmaTarefa(): void {
    this.imprimirTarefas()
    const id = this.pedirIdTarefa()
    const tarefa = this.encontrarTarefaPeloId(id)
    this.lancarErroSeTarefaNaoExiste(tarefa)
    tarefa!.completar()
    this.telaTarefas.imprimirMensagem("\nTarefa concluída!\n")
    this.imprimirTarefa(tarefa!)
  }

  marcarTarefaParaFazer(): void {
    this.imprimirTarefas()
    const id = this.pedirIdTarefa()
    const tarefa = this.encontrarTarefaPeloId(id)
    this.lancarErroSeTarefaNaoExiste(tarefa)
    tarefa!.descompletar()
    this.telaTarefas.imprimirMensagem("\nTarefa marcada como não concluída!\n")
    this.imprimirTarefa(tarefa!)
  }


  abrirTela() {
    this.abrir()
    while (this.manterAberto) {
      try {
        let opcao = this.telaTarefas.mostrarMenu()
        switch (opcao) {
          case OpcoesDoMenuDeTarefas.Cadastrar:
            this.cadastrarTarefa()
            this.esperarInteracao()
            break
          case OpcoesDoMenuDeTarefas.EditarTitulo:
            this.editarTitulo()
            this.esperarInteracao()
            break
          case OpcoesDoMenuDeTarefas.Excluir:
            this.excluirTarefa()
            this.esperarInteracao()
            break
          case OpcoesDoMenuDeTarefas.Imprimir:
            this.imprimirTarefas()
            this.esperarInteracao()
            break
          case OpcoesDoMenuDeTarefas.Concluir:
            this.concluirUmaTarefa()
            this.esperarInteracao()
            break
          case OpcoesDoMenuDeTarefas.MarcarComoParaFazer:
            this.marcarTarefaParaFazer()
            this.esperarInteracao()
            break
          case OpcoesDoMenuDeTarefas.EditarPrazoDaTarefa:
            this.editarPrazo()
            this.esperarInteracao()
            break
          case OpcoesDoMenuDeTarefas.Voltar:
            this.fechar()
            break
          default:
            break
        }
      } catch (erro: any) {
        this.telaTarefas.imprimirMensagem("Erro! " + erro.message)
        this.telaTarefas.esperarInteracao()
      }
    }
  }
}