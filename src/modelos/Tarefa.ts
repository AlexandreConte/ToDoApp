// Modelos
import Data from "./Data"
import Entidade from "./Entidade"

// Erros:
import ErroTituloVazio from "../erros/ErroTituloVazio"

export default class Tarefa extends Entidade {
  private _titulo: string
  private _dataDeCriacao: Data | null
  private _estaCompleto: boolean
  private _prazo: Data | null = null

  constructor(
    titulo: string,
    prazo?: Data | null,
  ) {
    super()
    this._titulo = titulo
    this._prazo = prazo ?? null
    this._dataDeCriacao = new Data()
    this._estaCompleto = false
  }

  get titulo(): string {
    return this._titulo
  }

  get prazoFormatado(): string {
    return this._prazo?.formatado ?? "Sem prazo"
  }

  get dataDeCriacao(): Data | null {
    return this._dataDeCriacao
  }

  get estaCompleto(): boolean {
    return this._estaCompleto
  }

  get estaCompletoFormatado(): "Sim" | "Não" {
    return this.estaCompleto ? "Sim" : "Não"
  }

  set titulo(titulo: string) {
    if (titulo === undefined || titulo === null || titulo.trim() === "")
      throw new ErroTituloVazio()
    else
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
}