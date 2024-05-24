// Modelos
import Lista from "../modelos/ListaDeTarefas"
import Tarefa from "../modelos/Tarefa"

// Telas
import TelaDeListas from "../telas/TelaDeListas"

// Controladores
import Controlador from "./Controlador"
import ControladorDeTarefas from "./ControladorDeTarefas"

// Interfaces
import ErroListaNaoEncontrada from "../erros/ErroListaNaoEncontrada"
import ErroNenhumaListaCadastrada from "../erros/ErroNenhumaListaCadastrada"
import ErroNenhumaTarefaCadastrada from "../erros/ErroNenhumaTarefaCadastrada"
import ErroTarefaNaoEncontrada from "../erros/ErroTarefaNaoEncontrada"
import ErroListaSemTarefas from "../erros/ErroListaSemTarefas"

// Enums
import OpcoesDoMenuDeListas from "../enums/OpcoesDoMenuDeListas"
import ErroTituloInvalido from "../erros/ErroTituloInvalido"
import ErroTituloVazio from "../erros/ErroTituloVazio"

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

  abrirTela() {
    this.abrir()
    while (this.manterAberto) {
      try {
        const opcao = this.telaDeListas.mostrarMenu()
        switch (opcao) {
          case OpcoesDoMenuDeListas.CadastrarNovaLista:
            const listaCadastrada = this.cadastrarLista()
            this.telaDeListas.imprimirMensagem("Lista cadastrada: ")
            this.imprimirLista(listaCadastrada)
            this.telaDeListas.esperarInteracao()
            break
          case OpcoesDoMenuDeListas.MostrarListas:
            this.imprimirListas()
            this.telaDeListas.esperarInteracao()
            break
          case OpcoesDoMenuDeListas.EditarTituloDeLista:
            const listaComTituloNovo = this.editarTituloDeLista()
            this.imprimirLista(listaComTituloNovo)
            this.telaDeListas.esperarInteracao()
            break
          case OpcoesDoMenuDeListas.ExcluirLista:
            const listaExcluida = this.excluirLista()
            this.telaDeListas.imprimirMensagem("Lista excluída: ")
            this.imprimirLista(listaExcluida)
            this.telaDeListas.esperarInteracao()
            break
          case OpcoesDoMenuDeListas.MoverUmaTarefaParaLista:
            const listaComTarefaAdicionada = this.moverTarefaParaLista()
            this.telaDeListas.imprimirMensagem("Lista atualizada com a tarefa:")
            this.imprimirLista(listaComTarefaAdicionada)
            this.telaDeListas.esperarInteracao()
            break
          case OpcoesDoMenuDeListas.RemoverTarefaDaLista:
            const { tarefaRemovida, lista } = this.removerTarefaDeUmaLista()
            this.telaDeListas.imprimirMensagem("Tarefa removida:")
            this.controladorDeTarefas.imprimirTarefa(tarefaRemovida)
            this.telaDeListas.imprimirLista(lista)
          case OpcoesDoMenuDeListas.Voltar:
            this.telaDeListas.imprimirMensagem("Voltando para a tela inicial!")
            this.fechar()
          default:
            break;
        }
      } catch (erro) {
        if (
          erro instanceof ErroListaNaoEncontrada ||
          erro instanceof ErroListaSemTarefas ||
          erro instanceof ErroNenhumaListaCadastrada ||
          erro instanceof ErroNenhumaTarefaCadastrada ||
          erro instanceof ErroTarefaNaoEncontrada ||
          erro instanceof ErroTituloInvalido ||
          erro instanceof ErroTituloVazio
        ) {
          this.telaDeListas.imprimirMensagem(erro.message)
        } else {
          this.telaDeListas.imprimirMensagem("Erro desconhecido!" + erro ?? "")
        }
        this.telaDeListas.esperarInteracao()
      }
    }
  }

  imprimirListas() {
    const naoExistemListas = this.verificarNaoExistenciaDeListas()
    if (naoExistemListas) {
      throw new ErroNenhumaListaCadastrada()
    }
    this.telaDeListas.imprimirMensagem("Listas cadastradas no sistema: ")
    this.listas.forEach((lista) => {
      this.imprimirLista(lista)
    })
  }

  imprimirLista(lista: Lista) {
    const semLista = !lista
    if (semLista) {
      throw new ErroListaNaoEncontrada()
    }

    this.telaDeListas.imprimirLista(lista)
    const tarefas = lista.tarefas
    const semTarefas = !tarefas
    if (semTarefas) {
      throw new ErroTarefaNaoEncontrada()
    }
    this.controladorDeTarefas.telaDeTarefas.imprimirTarefas(tarefas)
  }

  cadastrarLista(): Lista {
    const { titulo } = this.telaDeListas.cadastrarLista()
    const lista = new Lista(titulo)
    this.listas.push(lista)
    return lista
  }

  excluirLista(): Lista {
    const naoExistemListas = this.verificarNaoExistenciaDeListas()
    if (naoExistemListas) {
      throw new ErroNenhumaListaCadastrada()
    }

    const { id } = this.telaDeListas.excluirLista()
    const lista = this.listas.find(lista => lista.id === id)
    const indiceLista = this.listas.findIndex(list => lista === list)
    const listaNaoEncontrada = !lista
    if (listaNaoEncontrada) {
      throw new ErroListaNaoEncontrada()
    }

    return this.listas.splice(indiceLista, 1)[0]
  }

  removerTarefaDeUmaLista(): { tarefaRemovida: Tarefa, lista: Lista } {
    this.imprimirListas()
    const idLista = this.telaDeListas.pedirPorId()
    const lista = this.listas.find(lista => lista.id === idLista)
    this.telaDeListas.imprimirMensagem("Tarefas da lista:")
    const semTarefas = !lista?.tarefas
    if (semTarefas) {
      throw new ErroListaSemTarefas()
    }

    lista?.tarefas.forEach(tarefa => this.controladorDeTarefas.imprimirTarefa(tarefa))
    const idTarefa = this.controladorDeTarefas.telaDeTarefas.pedirPorId()
    const tarefa = lista.tarefas.find(tarefa => tarefa.id === idTarefa)
    const indice = lista.tarefas.findIndex(ta => ta.id === tarefa?.id)
    const tarefaRemovida = lista.tarefas.splice(indice, 1)[0]

    return { tarefaRemovida, lista }
  }

  editarTituloDeLista(): Lista {
    const naoExistemListas = this.verificarNaoExistenciaDeListas()
    if (naoExistemListas) {
      throw new ErroNenhumaListaCadastrada()
    }

    this.imprimirListas()
    const lista = this.pegarPorid()
    const listaNaoEncontrada = !lista
    if (listaNaoEncontrada) {
      throw new ErroListaNaoEncontrada()
    }

    const novoTitulo = this.telaDeListas.pedirTitulo()
    lista.titulo = novoTitulo
    return lista
  }

  verificarExistenciaDeLista(): boolean {
    return this.listas.length > 0
  }

  verificarNaoExistenciaDeListas(): boolean {
    return this.listas.length === 0
  }

  moverTarefaParaLista(): Lista {
    const naoExisteLista = this.verificarNaoExistenciaDeListas()
    if (naoExisteLista) {
      throw new ErroNenhumaListaCadastrada()
    }

    const naoExistemTarefas = this.controladorDeTarefas.verificarNaoExistenciaDeTarefas()
    if (naoExistemTarefas) {
      throw new ErroNenhumaTarefaCadastrada()
    }

    this.telaDeListas.imprimirListas(this.listas.map(l => l))
    const lista = this.pegarPorid()
    const listaInexistente = !lista
    if (listaInexistente) {
      throw new ErroListaNaoEncontrada()
    }

    this.controladorDeTarefas.telaDeTarefas.imprimirTarefas(
      this.controladorDeTarefas.tarefas.map(t => t)
    )

    const idTarefa = this.controladorDeTarefas.telaDeTarefas.pedirPorId()
    const tarefa = this.controladorDeTarefas.pegarPorId(idTarefa)
    const tarefaNaoEncontrada = !tarefa
    if (tarefaNaoEncontrada) {
      throw new ErroTarefaNaoEncontrada()
    }

    lista.adicionarTarefa(tarefa)
    return lista
  }

  imprimirTarefasDaLista(lista: Lista) {
    const semLista = !lista
    if (semLista) {
      throw new ErroListaNaoEncontrada()
    }

    const semTarefas = lista.tarefas.length === 0
    if (semTarefas) {
      throw new ErroListaSemTarefas()
    }

    lista.tarefas.forEach((tarefa) => {
      this.telaDeListas.imprimirTarefaDaLista(tarefa)
    })
  }

  pegarPorid(): Lista | null {
    const id = this.telaDeListas.pedirPorId()
    const lista = this.listas.find(l => l.id === id)
    return lista ?? null
  }

  encontrarIndex(lista: Lista): number {
    let index = -1
    try {
      index = this.listas.findIndex(l => l === lista)
    } catch {
      this.telaDeListas.imprimirMensagem("Erro ao encontrar lista de tarefa!")
    }
    return index
  }
}