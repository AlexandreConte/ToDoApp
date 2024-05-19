import ErroTituloInvalido from "../../errors/ErroTituloInvalido"
import Data from "./Data"
import Entidade from "./Entidade"

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

  get prazo(): Data | null {
    return this._prazo
  }

  get dataDeCriacao(): Data | null {
    return this._dataDeCriacao
  }

  get estaCompleto(): boolean {
    return this._estaCompleto
  }

  set titulo(titulo: string) {
    if (titulo === undefined || titulo === null || titulo.trim() === "")
      throw new ErroTituloInvalido()
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

  get dataFormatada() {
    const ano = this.prazo?.date?.getFullYear()
    const mes = this.prazo?.date?.getMonth()
    const dia = this.prazo?.date?.getDate()
    
    const hora = this.prazo?.date?.getHours()
    const minuto = this.prazo?.date?.getMinutes()
    const segundo = this.prazo?.date?.getSeconds()
    let formatado = ""
    if (ano) 
      formatado += `${dia}/${mes}/${ano}`
    if (segundo)
      formatado += ` ${hora}:${minuto ?? "00"}:${segundo ?? "00"}`
    return formatado
  }
}