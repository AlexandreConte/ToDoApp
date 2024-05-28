// Modelos:
import Data from "./Data"
import Entidade from "./Entidade"
// Erros:
import ErroTituloVazio from "../erros/ErroTituloVazio"
import ErroTituloInvalido from "../erros/ErroTituloInvalido"

export default class Tarefa extends Entidade {
  private _titulo: string
  private _dataDeCriacao: Data
  private _estaCompleto: boolean
  private _prazo: Data | null = null

  constructor(
    titulo: string,
    prazo?: Date | null,
  ) {
    super()
    this.validarTitulo(titulo)
    this._titulo = titulo
    if (prazo === null) {
      this._prazo = new Data(null)
    } else {
      this._prazo = new Data(new Date(prazo!))
    }
    this._dataDeCriacao = new Data(new Date())
    this._estaCompleto = false
  }

  get titulo(): string {
    return this._titulo
  }

  get prazoFormatado(): string {
    return this._prazo?.formatado ?? "Sem prazo"
  }

  get dataDeCriacaoFormatada(): string {
    return this._dataDeCriacao.formatado
  }

  get estaCompleto(): boolean {
    return this._estaCompleto
  }

  get estaCompletoFormatado(): "Sim" | "Não" {
    return this.estaCompleto ? "Sim" : "Não"
  }

  set titulo(titulo: string) {
    this.validarTitulo(titulo)
    this._titulo = titulo
  }

  set prazo(prazo: Date) {
    try {
      const data: Date = new Date(prazo)
      this._prazo = new Data(data)
    } catch {
      console.log("Data inválida!")
    }
  }

  completar() {
    this._estaCompleto = true
  }

  descompletar() {
    this._estaCompleto = false
  }

  alternarEstaCompleto() {
    this._estaCompleto = !this._estaCompleto
  }

  private validarTitulo(titulo: string) {
    if (titulo.trim().length === 0) {
      throw new ErroTituloVazio()
    }
    if (titulo === undefined || titulo === null) {
      throw new ErroTituloInvalido()
    }
  }
}