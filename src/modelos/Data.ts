export default class Data {
  private _date: Date | null

  constructor(date: Date | null = null) {
    this._date = date
  }

  get formatado(): string {
    const formato = (valor: number): string => {
      return valor.toString().length < 2 ? `0${valor}` : valor.toString()
    } 

    if (this._date) {
      const dia = this._date!.getDate() ?? null
      const diaFormatado = formato(dia!)

      const mes = this._date!.getMonth() + 1
      const mesFormatado = formato(mes)

      const anos = this._date!.getFullYear()
      const horas = this._date!.getHours()
      
      const minutos = this._date!.getMinutes()
      const minutosFormatado = formato(minutos)

      const segundos = this._date!.getSeconds()
      const segundosFormatado = formato(segundos)

      return `${diaFormatado}/${mesFormatado}/${anos} - ${horas}:${minutosFormatado}:${segundosFormatado}`
    }
    return "Sem prazo"
  }
}