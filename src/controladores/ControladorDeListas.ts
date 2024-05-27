// Modelos
import Lista from "../modelos/ListaDeTarefas"
import Tarefa from "../modelos/Tarefa"
// Telas
import TelaDeListas from "../telas/TelaDeListas"
// Controladores
import Controlador from "./Controlador"
import ControladorDeTarefas from "./ControladorDeTarefas"
// Enums
import OpcoesDoMenuDeListas from "../opcoesDeMenus/OpcoesDoMenuDeListas"
// Erros
import ErroListaNaoEncontrada from "../erros/ErroListaNaoEncontrada"
import ErroNenhumaListaCadastrada from "../erros/ErroNenhumaListaCadastrada"
import ErroTarefaNaoEncontrada from "../erros/ErroTarefaNaoEncontrada"
import ErroListaSemTarefas from "../erros/ErroListaSemTarefas"
import ErroTarefaJahPertenceALista from "../erros/ErroTarefaJahPertenceALista"

export default class ControladorDeListas extends Controlador {
  constructor(
    private readonly _controladorDeTarefas: ControladorDeTarefas,
    private readonly _telaDeListas = TelaDeListas,
    private readonly _listas: Lista[] = [],
  ) {
    super()
  }

  get controladorDeTarefas() {
    return this._controladorDeTarefas
  }

  get telaDeListas() {
    return this._telaDeListas
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

  validarSeListaPossuiTarefas(lista: Lista): void {
    if (lista.tarefas.length === 0) {
      throw new ErroListaSemTarefas()
    }
  }

  validarSeListaExiste(lista: Lista | null): void {
    if (lista === null) {
      throw new ErroListaNaoEncontrada()
    }
  }

  validarSeExistemListasETarefas(): void {
    this.validarSeExistemListasCadastradas()
    this.controladorDeTarefas.validarSeExistemTarefas()
  }

  imprimirLista(lista: Lista): void {
    this.validarSeListaExiste(lista)
    this.telaDeListas.imprimirLista(lista)
    const tarefas = lista.tarefas
    const semTarefas = !tarefas
    if (semTarefas) {
      throw new ErroTarefaNaoEncontrada()
    }
    this.controladorDeTarefas.telaDeTarefas.imprimirTarefas(tarefas)
  }

  imprimirListasSemEsperarInteracao(): void {
    this.validarSeExistemListasCadastradas()
    this.telaDeListas.imprimirMensagem("Listas cadastradas no sistema: ")
    this.listas.forEach((lista) => {
      this.imprimirLista(lista)
    })
  }

  imprimirListasEsperandoInteracao(): void {
    this.imprimirListasSemEsperarInteracao()
    this.telaDeListas.esperarInteracao()
  }

  imprimirTarefasDaLista(lista: Lista): void {
    this.validarSeListaExiste(lista)
    this.validarSeListaPossuiTarefas(lista)
    lista.tarefas.forEach((tarefa) => {
      this.telaDeListas.imprimirTarefaDaLista(tarefa)
    })
  }

  cadastrarLista(): void {
    const titulo = this.telaDeListas.cadastrarLista()
    const lista = new Lista(titulo)
    this.listas.push(lista)
    this.telaDeListas.imprimirMensagem("\nLista cadastrada: ")
    this.imprimirLista(lista)
    this.telaDeListas.esperarInteracao()
  }

  validarSeExistemListasCadastradas(): void {
    if (this.naoExistemListasCadastradas) {
      throw new ErroNenhumaListaCadastrada()
    }
  }

  validarSeListaJahPossuiTarefa(lista: Lista, idTarefa: string): void {
    if (lista.tarefaJahEstaNaLista(idTarefa)) {
      throw new ErroTarefaJahPertenceALista()
    }
  }

  pegarListaComIdEValidar(): Lista {
    const id = this.telaDeListas.pedirIdDaLista()
    const lista = this.listas.find(l => l.id === id) ?? null
    if (lista === null) {
      throw new ErroListaNaoEncontrada()
    }
    return lista!
  }

  editarTituloDeLista(): void {
    this.validarSeExistemListasCadastradas()
    this.imprimirListasSemEsperarInteracao()
    const lista = this.pegarListaComIdEValidar()
    const novoTitulo = this.telaDeListas.pedirNovoTitulo()
    lista.titulo = novoTitulo
    this.imprimirLista(lista)
    this.telaDeListas.esperarInteracao()
  }

  encontrarIndiceDaListaComId(id: string): number {
    const index = this.listas.findIndex(l => l.id === id)
    return index
  }

  encontrarIndiceDaTarefaNaLista(lista: Lista): number {
    this.telaDeListas.imprimirMensagem("Tarefas da lista:")
    lista!.tarefas.forEach(
      tarefa => this.controladorDeTarefas.imprimirTarefa(tarefa)
    )
    const tarefa = this.controladorDeTarefas.encontrarTarefaComId()
    this.controladorDeTarefas.validarSeTarefaExiste(tarefa)
    const indice = this.controladorDeTarefas.encontrarIndiceDaTarefaCom(tarefa!.id)
    return indice
  }

  encontrarTarefaValidaComId(): Tarefa {
    const tarefa = this.controladorDeTarefas.encontrarTarefaComId()
    this.controladorDeTarefas.validarSeTarefaExiste(tarefa)
    return tarefa!
  }

  excluirLista(): void {
    this.validarSeExistemListasCadastradas()
    this.imprimirListasSemEsperarInteracao()
    const lista = this.pegarListaComIdEValidar()
    const indiceLista = this.encontrarIndiceDaListaComId(lista.id)
    const listaExcluida = this.listas.splice(indiceLista, 1)[0]
    this.telaDeListas.imprimirMensagem("\nLista excluída: ")
    this.imprimirLista(listaExcluida)
    this.telaDeListas.esperarInteracao()
  }

  adicionarTarefaExistenteNaLista() {
    this.validarSeExistemListasETarefas()
    this.imprimirListasSemEsperarInteracao()
    const lista = this.pegarListaComIdEValidar()
    this.validarSeListaExiste(lista)
    this.controladorDeTarefas.imprimirTarefasSemEsperarInteracao()
    const tarefa = this.encontrarTarefaValidaComId()
    this.validarSeListaJahPossuiTarefa(lista, tarefa.id)
    lista.adicionarTarefa(tarefa)
    this.telaDeListas.imprimirMensagem("\nLista atualizada:")
    this.imprimirLista(lista)
    this.telaDeListas.esperarInteracao()
  }

  removerTarefaDeUmaLista(): void {
    this.validarSeExistemListasCadastradas()
    this.imprimirListasSemEsperarInteracao()
    const lista = this.pegarListaComIdEValidar()
    this.validarSeListaPossuiTarefas(lista)
    const indice = this.encontrarIndiceDaTarefaNaLista(lista)
    const tarefaRemovida = lista.tarefas.splice(indice, 1)[0]
    this.telaDeListas.imprimirMensagem("\nTarefa removida:")
    this.controladorDeTarefas.imprimirTarefa(tarefaRemovida)
    this.telaDeListas.imprimirLista(lista)
  }

  criarTarefaEmLista(): void {
    this.validarSeExistemListasCadastradas()
    this.imprimirListasSemEsperarInteracao()
    const lista = this.pegarListaComIdEValidar()
    const tarefa = this.controladorDeTarefas.cadastrarTarefa()
    this.controladorDeTarefas.validarSeTarefaExiste(tarefa)
    lista.tarefas.push(tarefa)
    this.telaDeListas.imprimirMensagem("Lista atualizada!")
    this.imprimirLista(lista)
    this.telaDeListas.esperarInteracao()
  }

  abrirTela(): void {
    this.abrir()
    while (this.manterAberto) {
      try {
        console.log()
        const opcao = this.telaDeListas.mostrarMenu()
        switch (opcao) {
          case OpcoesDoMenuDeListas.CadastrarNovaLista:
            this.cadastrarLista()
            break
          case OpcoesDoMenuDeListas.MostrarListas:
            this.imprimirListasEsperandoInteracao()
            break
          case OpcoesDoMenuDeListas.EditarTituloDeLista:
            this.editarTituloDeLista()
            break
          case OpcoesDoMenuDeListas.ExcluirLista:
            this.excluirLista()
            break
          case OpcoesDoMenuDeListas.MoverUmaTarefaParaLista:
            this.adicionarTarefaExistenteNaLista()
            break
          case OpcoesDoMenuDeListas.RemoverTarefaDaLista:
            this.removerTarefaDeUmaLista()
            break
          case OpcoesDoMenuDeListas.CriarTarefaEmLista:
            this.criarTarefaEmLista()
            break
          case OpcoesDoMenuDeListas.Voltar:
            this.fechar()
          default:
            break;
        }
      } catch (erro: any) {
        this.telaDeListas.imprimirMensagem("Erro! " + erro.message)
        this.telaDeListas.esperarInteracao()
      }
    }
  }
}