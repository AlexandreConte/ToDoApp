// Modelos
import Lista from "../modelos/ListaDeTarefas"

// Telas
import TelaDeListas from "../telas/TelaDeListas"

// Controladores
import Controlador from "./Controlador"
import ControladorDeTarefas from "./ControladorDeTarefas"

// Interfaces
import ErroListaNaoEncontrada from "../erros/ErroListaNaoEncontrada"
import ErroNenhumaListaCadastrada from "../erros/ErroNenhumaListaCadastrada"
import ErroTarefaNaoEncontrada from "../erros/ErroTarefaNaoEncontrada"
import ErroListaSemTarefas from "../erros/ErroListaSemTarefas"
import OpcoesDoMenuDeListas from "../opcoesDeMenus/OpcoesDoMenuDeListas"

// Enums


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

  validarSeExistemListasCadastradas(): void {
    if (this.naoExistemListasCadastradas) {
      throw new ErroNenhumaListaCadastrada()
    }
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
            this.imprimirListas()
            break
          case OpcoesDoMenuDeListas.EditarTituloDeLista:
            this.editarTituloDeLista()
            break
          case OpcoesDoMenuDeListas.ExcluirLista:
            this.excluirLista()
            break
          case OpcoesDoMenuDeListas.MoverUmaTarefaParaLista:
            this.moverTarefaParaLista()
            break
          case OpcoesDoMenuDeListas.RemoverTarefaDaLista:
            this.removerTarefaDeUmaLista()
          case OpcoesDoMenuDeListas.CriarTarefaEmLista:
            break
          case OpcoesDoMenuDeListas.Voltar:
            this.fechar()
          default:
            break;
        }
      } catch (erro: any) {
        this.telaDeListas.imprimirMensagem("Erro:")
        this.telaDeListas.imprimirMensagem(erro.message)
        this.telaDeListas.esperarInteracao()
      }
    }
  }

  imprimirListas(): void {
    this.validarSeExistemListasCadastradas()
    this.telaDeListas.imprimirMensagem("Listas cadastradas no sistema: ")
    this.listas.forEach((lista) => {
      this.imprimirLista(lista)
    })
    this.telaDeListas.esperarInteracao()
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

  cadastrarLista(): void {
    const titulo = this.telaDeListas.cadastrarLista()
    const lista = new Lista(titulo)
    this.listas.push(lista)
    this.telaDeListas.imprimirMensagem("\nLista cadastrada: ")
    this.imprimirLista(lista)
    this.telaDeListas.esperarInteracao()
  }

  excluirLista(): void {
    this.validarSeExistemListasCadastradas()
    const lista = this.pegarListaComId()
    this.validarSeListaExiste(lista)
    const indiceLista = this.encontrarIndiceDaListaComId(lista!.id)
    const listaExcluida = this.listas.splice(indiceLista, 1)[0]
    this.telaDeListas.imprimirMensagem("\nLista excluída: ")
    this.imprimirLista(listaExcluida)
    this.telaDeListas.esperarInteracao()
  }

  removerTarefaDeUmaLista(): void {
    this.validarSeExistemListasCadastradas()
    this.imprimirListas()
    const lista = this.pegarListaComId()
    this.validarSeListaExiste(lista)
    this.validarSeListaPossuiTarefas(lista!)
    this.telaDeListas.imprimirMensagem("Tarefas da lista:")
    lista!.tarefas.forEach(
      tarefa => this.controladorDeTarefas.imprimirTarefa(tarefa)
    )
    const tarefa = this.controladorDeTarefas.encontrarTarefaComId()
    this.controladorDeTarefas.validarSeTarefaExiste(tarefa)
    const indice = this.controladorDeTarefas.encontrarIndiceDaTarefaComId(tarefa!.id)
    const tarefaRemovida = lista!.tarefas.splice(indice, 1)[0]
    this.telaDeListas.imprimirMensagem("\nTarefa removida:")
    this.controladorDeTarefas.imprimirTarefa(tarefaRemovida)
    this.telaDeListas.imprimirLista(lista!)
  }

  editarTituloDeLista(): void {
    this.validarSeExistemListasCadastradas()
    this.imprimirListas()
    const lista = this.pegarListaComId()
    this.validarSeListaExiste(lista)
    const novoTitulo = this.telaDeListas.pedirNovoTitulo()
    lista!.titulo = novoTitulo
    this.imprimirLista(lista!)
    this.telaDeListas.esperarInteracao()
  }

  moverTarefaParaLista() {
    this.validarSeExistemListasCadastradas()
    this.controladorDeTarefas.validarSeExistemTarefas()
    this.telaDeListas.imprimirListas(this.listas)
    const lista = this.pegarListaComId()
    this.validarSeListaExiste(lista)
    this.controladorDeTarefas.telaDeTarefas.imprimirTarefas(
      this.controladorDeTarefas.tarefas
    )
    const tarefa = this.controladorDeTarefas.encontrarTarefaComId()
    this.controladorDeTarefas.validarSeTarefaExiste(tarefa)
    lista!.adicionarTarefa(tarefa!)
    this.telaDeListas.imprimirMensagem("\nLista atualizada:")
    this.imprimirLista(lista!)
    this.telaDeListas.esperarInteracao()
  }

  imprimirTarefasDaLista(lista: Lista): void {
    this.validarSeListaExiste(lista)
    this.validarSeListaPossuiTarefas(lista)
    lista.tarefas.forEach((tarefa) => {
      this.telaDeListas.imprimirTarefaDaLista(tarefa)
    })
  }

  pegarListaComId(): Lista | null {
    const id = this.telaDeListas.pedirIdDaLista()
    const lista = this.listas.find(l => l.id === id)
    return lista ?? null
  }

  encontrarIndiceDaListaComId(id: string): number {
    const index = this.listas.findIndex(l => l.id === id)
    return index
  }

  encontrarIndiceDaListaPedindoId(): number {
    const id = this.telaDeListas.pedirIdDaLista()
    const indice = this.listas.findIndex(lista => lista.id === id)
    return indice
  }
}