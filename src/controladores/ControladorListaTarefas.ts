// Modelos:
import Lista from "../modelos/ListaTarefas"
import Tarefa from "../modelos/Tarefa"
// Tela:
import TelaListaTarefas from "../telas/TelaListaTarefas"
// Controladores:
import Controlador from "./Controlador"
import ControladorTarefa from "./ControladorTarefa"
// Enum menu:
import OpcoesDoMenuDeListas from "../opcoesDeMenus/OpcoesMenuListaTarefas"
// Erros:
import ErroListaNaoEncontrada from "../erros/ErroListaNaoEncontrada"
import ErroNenhumaListaCadastrada from "../erros/ErroNenhumaListaCadastrada"
import ErroListaSemTarefas from "../erros/ErroListaSemTarefas"
import ErroTarefaJaEstaNaLista from "../erros/ErroTarefaJaEstaNaLista"

export default class ControladorListaTarefas extends Controlador {
  constructor(
    private readonly _controladorTarefa: ControladorTarefa,
    private readonly _telaLista = TelaListaTarefas,
    private readonly _listas: Lista[] = [],
  ) {
    super()
  }

  get controladorTarefas() {
    return this._controladorTarefa
  }

  get telaListaTarefas() {
    return this._telaLista
  }

  get listas(): Lista[] {
    return this._listas
  }

  get existemListasCadastradas(): boolean {
    return this.listas.length > 0
  }

  get naoExistemListasCadastradas(): boolean {
    return this.listas.length === 0
  }

  lancarErroSeListaVazia(lista: Lista): void {
    if (lista.estaVazia) {
      throw new ErroListaSemTarefas()
    }
  }

  lancarErroSeListaNaoExiste(lista: Lista | null): void {
    if (lista === null) {
      throw new ErroListaNaoEncontrada()
    }
  }

  lancarErroSeListaJaPossuiTarefa(lista: Lista, idTarefa: string): void {
    if (lista.tarefaJaEstaNaLista(idTarefa)) {
      throw new ErroTarefaJaEstaNaLista()
    }
  }

  lancarErroSeNaoExistiremListas(): void {
    if (this.naoExistemListasCadastradas) {
      throw new ErroNenhumaListaCadastrada()
    }
  }

  imprimirLista(lista: Lista): void {
    this.lancarErroSeListaNaoExiste(lista)
    this.telaListaTarefas.imprimirMensagem(`${lista.titulo}`)
    this.telaListaTarefas.imprimirMensagem(`${lista.tarefas.length} Tarefas pendentes!`)
    this.imprimirTarefasLista(lista)
    this.telaListaTarefas.imprimirMensagem(`Id da lista de tarefas: ${lista.id}`)
  }

  imprimirTarefasLista(lista: Lista): void {
    if (lista.possuiTarefas) {
      lista.tarefas.forEach(
        tarefa => this.controladorTarefas.imprimirTarefa(tarefa)
      )
    }
  }

  imprimirListas(): void {
    this.lancarErroSeNaoExistiremListas()
    this.telaListaTarefas.imprimirMensagem("Listas cadastradas no sistema: ")
    this.listas.forEach((lista) => {
      this.imprimirLista(lista)
    })
  }

  cadastrarLista(): void {
    const titulo = this.telaListaTarefas.cadastrarLista()
    const lista = new Lista(titulo)
    this.listas.push(lista)
    this.telaListaTarefas.imprimirMensagem("\nLista cadastrada: ")
    this.imprimirLista(lista)
  }

  encontrarListaPorId(id: string): Lista | null {
    const lista = this.listas.find(lista => lista.id === id) ?? null
    return lista
  }

  pedirIdLista(): string {
    const id = this.telaListaTarefas.pedirIdDaLista()
    return id
  }
  
  editarTituloDeLista(): void {
    this.imprimirListas()
    const id = this.pedirIdLista()
    const lista = this.encontrarListaPorId(id)
    this.lancarErroSeListaNaoExiste(lista)
    const novoTitulo = this.telaListaTarefas.pedirTitulo()
    lista!.titulo = novoTitulo
    this.telaListaTarefas.imprimirMensagem("\nTítulo atualizado!\n")
    this.imprimirLista(lista!)
  }
  
  encontrarIndiceLista(lista: Lista): number {
    const indice = this.listas.findIndex(l => l.id === lista.id)
    return indice
  }

  encontrarIndiceDaTarefaNaLista(lista: Lista, tarefa: Tarefa): number {
    this.imprimirTarefasLista(lista)
    const indice = this.controladorTarefas.encontrarIndiceDaTarefa(tarefa.id)
    return indice
  }

  excluirLista(): void {
    this.imprimirListas()
    const id = this.pedirIdLista()
    const lista = this.encontrarListaPorId(id)
    this.lancarErroSeListaNaoExiste(lista)
    const indiceDaLista = this.encontrarIndiceLista(lista!)
    this.listas.splice(indiceDaLista, 1)
    this.telaListaTarefas.imprimirMensagem("\nLista excluída: ")
    this.imprimirLista(lista!)
  }

  adicionarTarefaExistenteNaLista() {
    this.controladorTarefas.lancarErroSeNaoExistiremTarefas()
    this.imprimirListas()
    const id = this.pedirIdLista()
    const lista = this.encontrarListaPorId(id)
    this.lancarErroSeListaNaoExiste(lista)
    this.controladorTarefas.imprimirTarefas()
    const idTarefa = this.controladorTarefas.pedirIdTarefa()
    const tarefa = this.controladorTarefas.encontrarTarefaPeloId(idTarefa)
    this.controladorTarefas.lancarErroSeTarefaNaoExiste(tarefa)
    this.lancarErroSeListaJaPossuiTarefa(lista!, idTarefa)
    lista!.adicionarTarefa(tarefa!)
    this.telaListaTarefas.imprimirMensagem("\nTarefa adicionada na lista!\n")
    this.imprimirLista(lista!)
  }

  removerTarefaDeUmaLista(): void {
    this.imprimirListas()
    const id = this.pedirIdLista()
    const lista = this.encontrarListaPorId(id)
    this.lancarErroSeListaNaoExiste(lista)
    const idTarefa = this.controladorTarefas.pedirIdTarefa()
    const tarefa = this.controladorTarefas.encontrarTarefaPeloId(idTarefa)
    this.controladorTarefas.lancarErroSeTarefaNaoExiste(tarefa)
    const indice = this.encontrarIndiceDaTarefaNaLista(lista!, tarefa!)
    lista!.tarefas.splice(indice, 1)
    this.controladorTarefas.imprimirTarefa(tarefa!)
    this.telaListaTarefas.imprimirMensagem("\nTarefa removida!\n")
    this.imprimirLista(lista!)
  }

  criarTarefaEmLista(): void {
    this.imprimirListas()
    const id = this.pedirIdLista()
    const lista = this.encontrarListaPorId(id)
    this.lancarErroSeListaNaoExiste(lista)
    const { titulo, prazo } = this.controladorTarefas.telaTarefas.cadastrarTarefa()
    const tarefa = new Tarefa(titulo, prazo)
    this.controladorTarefas.tarefas.push(tarefa)
    lista!.tarefas.push(tarefa)
    this.telaListaTarefas.imprimirMensagem("\nLista atualizada!\n")
    this.imprimirLista(lista!)
  }

  abrirTela(): void {
    this.abrir()
    while (this.manterAberto) {
      try {
        console.log()
        const opcao = this.telaListaTarefas.mostrarMenu()
        switch (opcao) {
          case OpcoesDoMenuDeListas.CadastrarNovaLista:
            this.cadastrarLista()
            this.telaListaTarefas.esperarInteracao()
            break
          case OpcoesDoMenuDeListas.MostrarListas:
            this.imprimirListas()
            this.telaListaTarefas.esperarInteracao()
            break
          case OpcoesDoMenuDeListas.EditarTituloDeLista:
            this.editarTituloDeLista()
            this.telaListaTarefas.esperarInteracao()
            break
          case OpcoesDoMenuDeListas.ExcluirLista:
            this.excluirLista()
            this.telaListaTarefas.esperarInteracao()
            break
          case OpcoesDoMenuDeListas.MoverUmaTarefaParaLista:
            this.adicionarTarefaExistenteNaLista()
            this.telaListaTarefas.esperarInteracao()
            break
          case OpcoesDoMenuDeListas.RemoverTarefaDaLista:
            this.removerTarefaDeUmaLista()
            this.telaListaTarefas.esperarInteracao()
            break
          case OpcoesDoMenuDeListas.CriarTarefaEmLista:
            this.criarTarefaEmLista()
            this.telaListaTarefas.esperarInteracao()
            break
          case OpcoesDoMenuDeListas.Voltar:
            this.fechar()
            break
          default:
            break;
        }
      } catch (erro: any) {
        this.telaListaTarefas.imprimirMensagem("Erro! " + erro?.message ?? "")
        this.telaListaTarefas.esperarInteracao()
      }
    }
  }
}