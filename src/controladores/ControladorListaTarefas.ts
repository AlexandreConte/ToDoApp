// Modelos:
import Lista from "../modelos/ListaTarefas"
import Tarefa from "../modelos/Tarefa"
// Tela:
import TelaDeListas from "../telas/TelaListaTarefas"
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
import TelaListaTarefas from "../telas/TelaListaTarefas"

export default class ControladorListaTarefas extends Controlador {
  constructor(
    private readonly _controladorTarefa: ControladorTarefa,
    private readonly _telaLista = TelaListaTarefas,
    private readonly _listas: Lista[] = [],
  ) {
    super()
  }

  get controladorDeTarefas() {
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

  lancarErroSeListaEstiverVazia(lista: Lista): void {
    if (lista.estaVazia) {
      throw new ErroListaSemTarefas()
    }
  }

  lancarErroSeListaNaoExistir(lista: Lista | null): void {
    if (lista === null) {
      throw new ErroListaNaoEncontrada()
    }
  }

  lancarErroSeTarefaJahEstaNaLista(lista: Lista, idTarefa: string): void {
    if (lista.tarefaJahEstaNaLista(idTarefa)) {
      throw new ErroTarefaJaEstaNaLista()
    }
  }

  lancarErroSeNaoExistiremListas(): void {
    if (this.naoExistemListasCadastradas) {
      throw new ErroNenhumaListaCadastrada()
    }
  }

  lancarErroSeTarefaJaEstiverNaLista(lista: Lista, tarefa: Tarefa): void {
    if (lista?.tarefaJahEstaNaLista(tarefa?.id)) {
      throw new ErroTarefaJaEstaNaLista()
    }
  }

  imprimirLista(lista: Lista): void {
    this.lancarErroSeListaNaoExistir(lista)
    this.telaListaTarefas.imprimirMensagem(`${lista.titulo}`)
    this.telaListaTarefas.imprimirMensagem(`${lista.tarefas.length} Tarefas pendentes!`)
    this.imprimirTarefasDaLista(lista)
    this.telaListaTarefas.imprimirMensagem(`Id da lista de tarefas: ${lista.id}`)
  }

  imprimirTarefasDaLista(lista: Lista): void {
    if (lista.possuiTarefas) {
      lista.tarefas.forEach(
        tarefa => this.controladorDeTarefas.imprimirTarefa(tarefa)
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

  encontrarLista(id: string): Lista | null {
    const lista = this.listas.find(lista => lista.id === id) ?? null
    return lista
  }

  editarTituloDeLista(): void {
    this.lancarErroSeNaoExistiremListas()
    this.imprimirListas()
    const id = this.telaListaTarefas.pedirIdDaLista()
    const lista = this.encontrarLista(id)
    this.lancarErroSeListaNaoExistir(lista)
    const novoTitulo = this.telaListaTarefas.pedirTitulo()
    lista!.titulo = novoTitulo
    this.imprimirLista(lista!)
  }

  encontrarIndiceDaLista(lista: Lista): number {
    const indice = this.listas.findIndex(l => l.id === lista.id)
    return indice
  }

  encontrarIndiceDaTarefaNaLista(lista: Lista): number {
    this.telaListaTarefas.imprimirMensagem("Tarefas da lista:")
    lista!.tarefas.forEach(
      tarefa => this.controladorDeTarefas.imprimirTarefa(tarefa)
    )
    const tarefa = this.controladorDeTarefas.encontrarTarefaComId()
    this.controladorDeTarefas.lancarErroSeTarefaNaoExistir(tarefa)
    const indice = this.controladorDeTarefas.encontrarIndiceDaTarefaCom(tarefa!.id)
    return indice
  }

  excluirLista(): void {
    this.lancarErroSeNaoExistiremListas()
    this.imprimirListas()
    const id = this.telaListaTarefas.pedirIdDaLista()
    const lista = this.encontrarLista(id)
    this.lancarErroSeListaNaoExistir(lista)
    const indiceDaLista = this.encontrarIndiceDaLista(lista!)
    this.listas.splice(indiceDaLista, 1)[0]
    this.telaListaTarefas.imprimirMensagem("\nLista excluída: ")
    this.imprimirLista(lista!)
  }

  adicionarTarefaExistenteNaLista() {
    this.controladorDeTarefas.lancarErroSeNaoExistiremTarefas()
    this.lancarErroSeNaoExistiremListas()
    this.imprimirListas()
    const id = this.telaListaTarefas.pedirIdDaLista()
    const lista = this.encontrarLista(id)
    this.lancarErroSeListaNaoExistir(lista)
    this.controladorDeTarefas.imprimirTarefas()
    const tarefa = this.controladorDeTarefas.encontrarTarefaComId()
    this.controladorDeTarefas.lancarErroSeTarefaNaoExistir(tarefa)
    this.lancarErroSeTarefaJahEstaNaLista(lista!, tarefa!.id)
    lista!.adicionarTarefa(tarefa!)
    this.telaListaTarefas.imprimirMensagem("\nLista atualizada:")
    this.imprimirLista(lista!)
  }

  removerTarefaDeUmaLista(): void {
    this.lancarErroSeNaoExistiremListas()
    this.imprimirListas()
    const idLista = this.telaListaTarefas.pedirIdDaLista()
    const lista = this.encontrarLista(idLista)
    this.lancarErroSeListaNaoExistir(lista)
    this.lancarErroSeListaEstiverVazia(lista!)
    const indice = this.encontrarIndiceDaTarefaNaLista(lista!)
    const tarefaRemovida = lista!.tarefas.splice(indice, 1)[0]
    this.controladorDeTarefas.imprimirTarefa(tarefaRemovida)
    this.telaListaTarefas.imprimirMensagem("\nTarefa removida!\n")
    this.telaListaTarefas.imprimirMensagem("Lista atualizada:\n")
    this.imprimirLista(lista!)
  }

  criarTarefaEmLista(): void {
    this.lancarErroSeNaoExistiremListas()
    this.imprimirListas()
    const idLista = this.telaListaTarefas.pedirIdDaLista()
    const lista = this.encontrarLista(idLista)
    this.lancarErroSeListaNaoExistir(lista)
    const { titulo, prazo } = this.controladorDeTarefas.telaDeTarefas.cadastrarTarefa()
    const tarefa = new Tarefa(titulo, prazo)
    this.controladorDeTarefas.tarefas.push(tarefa)
    lista!.tarefas.push(tarefa)
    this.telaListaTarefas.imprimirMensagem("Lista atualizada:")
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
        this.telaListaTarefas.imprimirMensagem("Erro! " + erro.message)
        this.telaListaTarefas.esperarInteracao()
      }
    }
  }
}