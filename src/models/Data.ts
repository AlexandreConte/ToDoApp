export default class Data {
  private _date: Date | null

  constructor(date: Date | null = null) {
    this._date = date
  }

  get date(): Date | null {
    return this._date
  }

  formatar(): string {
    if (this.date) {
      return `${this.date.getDate()}/${this.date.getMonth() + 1}/${this.date.getFullYear()} - ${this.date.getHours()}:${this.date.getMinutes()}:${this.date.getSeconds()}`
    }
    return ""
  }
}