export default class Data {
  private _date: Date | null

  constructor(date: Date | null = null) {
    this._date = date
  }

  get date(): Date | null {
    return this._date
  }

  formatar(): string {
    const formato = (valor: number): string => {
      return valor.toString().length < 2 ? `0${valor}` : valor.toString()
    } 

    if (this.date) {
      const dia = this.date.getDate()
      const diaFormatado = formato(dia)

      const mes = this.date.getMonth() + 1
      const mesFormatado = formato(mes)

      const anos = this.date.getFullYear()
      const horas = this.date.getHours()
      
      const minutos = this.date.getMinutes()
      const minutosFormatado = formato(minutos)

      const segundos = this.date.getSeconds()
      const segundosFormatado = formato(segundos)

      return `${diaFormatado}/${mesFormatado}/${anos} - ${horas}:${minutosFormatado}:${segundosFormatado}`
    }
    return ""
  }
}