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

  encontrarTarefaComIdEValidar(): Tarefa {
    const tarefa = this.encontrarTarefaComId()
    this.validarSeTarefaExiste(tarefa)
    return tarefa!
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

  encontrarIndiceDaTarefaCom(id: string): number {
    const indice = this.tarefas.findIndex(tarefa => tarefa.id === id)
    return indice
  }

  imprimirTarefasSemEsperarInteracao(): void {
    this.validarSeExistemTarefas()
    this.telaDeTarefas.imprimirMensagem("Tarefas:\n")
    this.tarefas.forEach(tarefa => this.telaDeTarefas.imprimirTarefa(tarefa))
  }

  imprimirTarefasEsperandoInteracao(): void {
    this.imprimirTarefasSemEsperarInteracao()
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
  }

  cadastrarTarefa(): Tarefa {
    const { titulo, prazo } = this.telaDeTarefas.cadastrarTarefa()
    const tarefa = new Tarefa(titulo, prazo ? new Date(prazo) : null)
    this.tarefas.push(tarefa)
    this.telaDeTarefas.imprimirTarefa(tarefa)
    this.telaDeTarefas.esperarInteracao()
    return tarefa
  }

  excluirTarefa(): void {
    this.validarSeExistemTarefas()
    this.imprimirTarefasSemEsperarInteracao()
    const tarefa = this.encontrarTarefaComIdEValidar()
    const indice = this.encontrarIndiceDaTarefaCom(tarefa.id)
    const tarefaExcluida = this.tarefas.splice(indice, 1)[0]
    this.telaDeTarefas.imprimirTarefa(tarefaExcluida)
    this.telaDeTarefas.imprimirMensagem("Tarefa exluída!\n")
    this.telaDeTarefas.esperarInteracao()
  }

  editarTitulo(): void {
    this.validarSeExistemTarefas()
    this.imprimirTarefasSemEsperarInteracao()
    this.telaDeTarefas.imprimirMensagem("-- Editando o título de uma tarefa existente --")
    const tarefa = this.encontrarTarefaComId()
    this.validarSeTarefaExiste(tarefa)
    const titulo = this.telaDeTarefas.pedirNovoTitulo()
    tarefa!.titulo = titulo
    this.telaDeTarefas.imprimirMensagem("\nTarefa atualizada! ")
    this.telaDeTarefas.imprimirTarefa(tarefa!)
    this.telaDeTarefas.esperarInteracao()
  }

  editarPrazo(): void {
    this.validarSeExistemTarefas()
    this.imprimirTarefasSemEsperarInteracao()
    const tarefa = this.encontrarTarefaComIdEValidar()
    const prazo = this.telaDeTarefas.pedirPrazoDaTarefa()
    tarefa.prazo = prazo!
    this.telaDeTarefas.imprimirMensagem("Prazo atualizado!")
    this.imprimirTarefa(tarefa)
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
            this.imprimirTarefasEsperandoInteracao()
            break
          case OpcoesDoMenuDeTarefas.Concluir:
            this.concluirUmaTarefa()
            break
          case OpcoesDoMenuDeTarefas.MarcarComoParaFazer:
            this.marcarTarefaParaFazer()
            break
          case OpcoesDoMenuDeTarefas.EditarPrazoDaTarefa:
            this.editarPrazo()
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