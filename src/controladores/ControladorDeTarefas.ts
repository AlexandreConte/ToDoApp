// Modelos
import Tarefa from "../modelos/Tarefa"

// Telas
import TelaDeTarefas from "../telas/TelaDeTarefas"

// Controladores
import Controlador from "./Controlador"

// Erros
import ErroTituloVazio from "../erros/ErroTituloVazio"
import ErroNenhumaTarefasCadastrada from "../erros/ErroNenhumaTarefaCadastrada"
import ErroTarefaNaoEncontrada from "../erros/ErroTarefaNaoEncontrada"
import ErroTituloInvalido from "../erros/ErroTituloInvalido"

// Enums
import OpcoesDoMenuDeTarefas from "../enums/OpcoesDoMenuDeTarefas"
import ErroDataInvalida from "../erros/ErroDataInvalida"

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

  get tarefas() {
    return this._tarefas
  }

  abrirTela() {
    this.abrir()
    while (this.manterAberto) {
      try {
        let opcao = this.telaDeTarefas.mostrarMenu()
        switch (opcao) {
          case OpcoesDoMenuDeTarefas.Cadastrar:
            const tarefaCadastrada = this.cadastrarTarefa()
            this.telaDeTarefas.imprimirTarefa(tarefaCadastrada)
            this.telaDeTarefas.esperarInteracao()
            break
          case OpcoesDoMenuDeTarefas.EditarTitulo:
            const tarefaTituloAtualizado = this.editarTitulo()
            this.telaDeTarefas.imprimirTarefa(tarefaTituloAtualizado)
            this.telaDeTarefas.esperarInteracao()
            break
          case OpcoesDoMenuDeTarefas.Excluir:
            const tarefaExcluida = this.excluirTarefa()
            this.telaDeTarefas.imprimirTarefa(tarefaExcluida)
            this.telaDeTarefas.esperarInteracao()
            break
          case OpcoesDoMenuDeTarefas.Imprimir:
            this.imprimirTarefas()
            this.telaDeTarefas.esperarInteracao()
            break
          case OpcoesDoMenuDeTarefas.Concluir:
            const tarefaConcluida = this.concluirUmaTarefa()
            this.telaDeTarefas.imprimirTarefa(tarefaConcluida)
            this.telaDeTarefas.esperarInteracao()
            break
          case OpcoesDoMenuDeTarefas.MarcarComoParaFazer:
            const tarefaParaFazer = this.marcarTarefaParaFazer()
            this.telaDeTarefas.imprimirTarefa(tarefaParaFazer)
            this.telaDeTarefas.esperarInteracao()
            break
          case OpcoesDoMenuDeTarefas.Voltar:
            this.telaDeTarefas.imprimirMensagem("Voltando para a tela Inicial!")
            this.fechar()
            break
          default:
            break
        }
      } catch (erro) {
        if (
          erro instanceof ErroTituloInvalido ||
          erro instanceof ErroTituloVazio ||
          erro instanceof ErroNenhumaTarefasCadastrada ||
          erro instanceof ErroTarefaNaoEncontrada ||
          erro instanceof ErroDataInvalida
        ) {
          this.telaDeTarefas.imprimirMensagem(erro.message)
        } else {
          this.telaDeTarefas.imprimirMensagem("Erro desconhecido!" + erro ?? "")
        }
        this.telaDeTarefas.esperarInteracao()
      }
    }
  }

  cadastrarTarefa(): Tarefa {
    const { titulo, prazo } = this.telaDeTarefas.cadastrarTarefa()
    if (titulo.trim().length === 0) {
      throw new ErroTituloVazio()
    }
    const semPrazo = !prazo
    if (semPrazo) {
      const tarefa = new Tarefa(titulo)
      this.tarefas.push(tarefa)
      return tarefa
    }
    const tarefa = new Tarefa(titulo, new Date(prazo))
    this.tarefas.push(tarefa)
    return tarefa
  }

  editarTitulo(): Tarefa {
    const naoExistemTarefas = this.verificarNaoExistenciaDeTarefas()
    if (naoExistemTarefas) {
      throw new ErroNenhumaTarefasCadastrada()
    }
    this.imprimirTarefas()
    this.telaDeTarefas.imprimirMensagem("-- Editando o título de uma tarefa existente --")
    const id = this.telaDeTarefas.pedirPorId()
    const tarefa = this.pegarPorId(id)
    const semTarefas = !tarefa
    if (semTarefas) {
      throw new ErroTarefaNaoEncontrada()
    }
    const titulo = this.telaDeTarefas.pedirTitulo()
    tarefa.titulo = titulo
    this.telaDeTarefas.imprimirMensagem("Tarefa atualizada: ")
    this.telaDeTarefas.imprimirTarefa(tarefa)
    return tarefa
  }

  excluirTarefa(): Tarefa {
    const naoExistemTarefas = this.verificarNaoExistenciaDeTarefas()
    if (naoExistemTarefas) {
      throw new ErroNenhumaTarefasCadastrada()
    }

    const id = this.telaDeTarefas.pedirPorId()
    const tarefa = this.pegarPorId(id)
    const index = this.pegarIndice(id)
    const tarefaNaoEncontrada = !tarefa
    if (tarefaNaoEncontrada) {
      throw new ErroTarefaNaoEncontrada()
    }

    return this.tarefas.splice(index, 1)[0]
  }

  imprimirTarefas() {
    const semTarefas = this.verificarNaoExistenciaDeTarefas()
    if (semTarefas) {
      throw new ErroNenhumaTarefasCadastrada()
    }

    this.tarefas.forEach(tarefa => this.telaDeTarefas.imprimirTarefa(tarefa))
  }

  concluirUmaTarefa(): Tarefa {
    const naoExistemTarefas = this.verificarNaoExistenciaDeTarefas()
    if (naoExistemTarefas) {
      throw new ErroNenhumaTarefasCadastrada()
    }

    this.telaDeTarefas.imprimirTarefas(this.tarefas.map(t => t))
    const id = this.telaDeTarefas.pedirPorId()
    const tarefa = this.tarefas.find(t => t.id === id)
    const tarefaNaoEncotrada = !tarefa
    if (tarefaNaoEncotrada) {
      throw new ErroTarefaNaoEncontrada()
    }

    tarefa.completar()
    return tarefa
  }

  marcarTarefaParaFazer(): Tarefa {
    const naoExistemTarefas = this.verificarNaoExistenciaDeTarefas()
    if (naoExistemTarefas) {
      throw new ErroNenhumaTarefasCadastrada()
    }

    this.telaDeTarefas.imprimirTarefas(this.tarefas.map(tarefa => tarefa))
    const id = this.telaDeTarefas.pedirPorId()
    const tarefa = this.tarefas.find(t => t.id === id)
    const tarefaNaoEncontrada = !tarefa
    if (tarefaNaoEncontrada) {
      throw new ErroTarefaNaoEncontrada()
    }

    tarefa.descompletar()
    return tarefa
  }

  imprimirTarefa(tarefa: Tarefa) {
    const semTarefas = this.verificarNaoExistenciaDeTarefas()
    if (semTarefas) {
      throw new ErroNenhumaTarefasCadastrada()
    }

    const semTarefa = !tarefa
    if (semTarefa) {
      throw new ErroTarefaNaoEncontrada()
    }

    this.telaDeTarefas.imprimirMensagem(`${tarefa.titulo} - ID: ${tarefa.id} | ${tarefa.prazo}`)
    this.telaDeTarefas.imprimirMensagem("")
  }

  pegarPorId(id: string): Tarefa | null {
    return this._tarefas.find(t => t.id === id) ?? null
  }

  pegarIndice(id: string): number {
    return this.tarefas.findIndex(t => t.id === id)
  }

  verificarNaoExistenciaDeTarefas(): boolean {
    const naoExistemTarefas = this.tarefas.length === 0
    return naoExistemTarefas
  }

  verificarExistenciaDeTarefas(): boolean {
    const existemTarefas = this.tarefas.length !== 0
    return existemTarefas
  }
}