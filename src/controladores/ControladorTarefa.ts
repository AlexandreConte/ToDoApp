// Modelo:
import Tarefa from "../modelos/Tarefa"
// Tela:
import TelaDeTarefas from "../telas/TelaTarefa"
// Controlador:
import Controlador from "./Controlador"
// Enum menu:
import OpcoesDoMenuDeTarefas from "../opcoesDeMenus/OpcoesMenuTarefa"
// Erros:
import ErroNenhumaTarefaCadastrada from "../erros/ErroNenhumaTarefaCadastrada"
import ErroTarefaNaoEncontrada from "../erros/ErroTarefaNaoEncontrada"

export default class ControladorTarefa extends Controlador {
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

  lancarErroSeTarefaNaoExistir(tarefa: Tarefa | null) {
    if (tarefa === null) {
      throw new ErroTarefaNaoEncontrada()
    }
  }

  encontrarTarefaComId(): Tarefa | null {
    const id = this.telaDeTarefas.pedirIdDaTarefa()
    return this._tarefas.find(t => t.id === id) ?? null
  }

  encontrarIndiceDaTarefaCom(id: string): number {
    const indice = this.tarefas.findIndex(tarefa => tarefa.id === id)
    return indice
  }

  imprimirTarefas(): void {
    this.lancarErroSeNaoExistiremTarefas()
    this.telaDeTarefas.imprimirMensagem("Tarefas:\n")
    this.tarefas.forEach(
      tarefa => this.imprimirTarefa(tarefa)
    )
  }

  esperarInteracao(): void {
    this.telaDeTarefas.esperarInteracao()
  }

  imprimirTarefa(tarefa: Tarefa) {
    this.lancarErroSeNaoExistiremTarefas()
    this.lancarErroSeTarefaNaoExistir(tarefa)
    this.telaDeTarefas.imprimirMensagem(`${tarefa.titulo}`)
    this.telaDeTarefas.imprimirMensagem(`Id: ${tarefa.id}`)
    this.telaDeTarefas.imprimirMensagem(`Prazo: ${tarefa.prazoFormatado}`)
    this.telaDeTarefas.imprimirMensagem(`Concluída: ${tarefa.estaCompletoFormatado}`)
    this.telaDeTarefas.imprimirMensagem(`Criada em: ${tarefa.dataDeCriacaoFormatada}\n`)
  }

  cadastrarTarefa(): void {
    const { titulo, prazo } = this.telaDeTarefas.cadastrarTarefa()
    const tarefa = new Tarefa(titulo, prazo ? new Date(prazo) : null)
    this.tarefas.push(tarefa)
    this.imprimirTarefa(tarefa)
  }

  excluirTarefa(): void {
    this.lancarErroSeNaoExistiremTarefas()
    this.imprimirTarefas()
    const tarefa = this.encontrarTarefaComId()
    this.lancarErroSeTarefaNaoExistir(tarefa)
    const indice = this.encontrarIndiceDaTarefaCom(tarefa!.id)
    const tarefaExcluida = this.tarefas.splice(indice, 1)[0]
    this.telaDeTarefas.imprimirMensagem("Tarefa exluída!\n")
    this.imprimirTarefa(tarefaExcluida)
  }

  editarTitulo(): void {
    this.lancarErroSeNaoExistiremTarefas()
    this.imprimirTarefas()
    const tarefa = this.encontrarTarefaComId()
    this.lancarErroSeTarefaNaoExistir(tarefa)
    const titulo = this.telaDeTarefas.pedirTitulo()
    tarefa!.titulo = titulo
    this.telaDeTarefas.imprimirMensagem("\nTarefa atualizada! ")
    this.imprimirTarefa(tarefa!)
  }

  editarPrazo(): void {
    this.lancarErroSeNaoExistiremTarefas()
    this.imprimirTarefas()
    const tarefa = this.encontrarTarefaComId()
    this.lancarErroSeTarefaNaoExistir(tarefa)
    const prazo = this.telaDeTarefas.pedirPrazoDaTarefa()
    tarefa!.prazo = prazo!
    this.telaDeTarefas.imprimirMensagem("Prazo atualizado!")
    this.imprimirTarefa(tarefa!)
  }

  concluirUmaTarefa(): void {
    this.lancarErroSeNaoExistiremTarefas()
    this.imprimirTarefas()
    const tarefa = this.encontrarTarefaComId()
    this.lancarErroSeTarefaNaoExistir(tarefa)
    tarefa!.completar()
    this.imprimirTarefa(tarefa!)
    this.telaDeTarefas.imprimirMensagem("\nTarefa concluída!\n")
  }

  marcarTarefaParaFazer(): void {
    this.lancarErroSeNaoExistiremTarefas()
    this.imprimirTarefas()
    const tarefa = this.encontrarTarefaComId()
    this.lancarErroSeTarefaNaoExistir(tarefa)
    tarefa!.descompletar()
    this.imprimirTarefa(tarefa!)
    this.telaDeTarefas.imprimirMensagem("\nTarefa marcada como não concluída!")
  }


  abrirTela() {
    this.abrir()
    while (this.manterAberto) {
      try {
        let opcao = this.telaDeTarefas.mostrarMenu()
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
        this.telaDeTarefas.imprimirMensagem("Erro! " + erro.message)
        this.telaDeTarefas.esperarInteracao()
      }
    }
  }
}