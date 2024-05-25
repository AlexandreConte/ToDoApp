// Erros
import ErroDataInvalida from "../erros/ErroDataInvalida"

export default class Data {
  private _date: Date | null = null

  constructor(date: Date | null = null) {
    this._date = date
  }

  set date(date: Date) {
    this.validarData(date)
    this._date = new Date(date)
  }

  get formatado(): string {
    const formato = (valor: number): string => {
      return valor.toString().length < 2 ? `0${valor}` : valor.toString()
    }

    const semData = !this._date
    if (semData) {
      return "Sem prazo"
    }

    const dia = this._date!.getDate() ?? null
    const diaFormatado = formato(dia!)

    const mes = this._date!.getMonth() + 1
    const mesFormatado = formato(mes)

    const anos = this._date!.getFullYear()

    const horas = this._date!.getHours()
    const horasFormatado = formato(horas)

    const minutos = this._date!.getMinutes()
    const minutosFormatado = formato(minutos)

    const segundos = this._date!.getSeconds()
    const segundosFormatado = formato(segundos)

    if (segundos !== 0) {
      return `${diaFormatado}/${mesFormatado}/${anos} - ${horasFormatado}:${minutosFormatado}:${segundosFormatado}`
    }
    if (minutos !== 0) {
      return `${diaFormatado}/${mesFormatado}/${anos} - ${horasFormatado}:${minutosFormatado}`
    }
    if (horas !== 0) {
      return `${diaFormatado}/${mesFormatado}/${anos} - ${horas}h`
    }
    return `${diaFormatado}/${mesFormatado}/${anos}`
  }

  private validarData(date: Date) {
    if (date === null) {
      return
    }
    if (!(date instanceof Date) || isNaN(date?.getTime())) {
      throw new ErroDataInvalida()
    }
  }
}