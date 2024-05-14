import InvalidtituloError from "../../errors/ErroTituloInvalido";

export default class Tarefa {
  private _titulo: string
  private _prazo: Date | null
  private _dataCriacao: Date | null
  private _completo: boolean

  constructor(
    titulo: string,
    prazo?: Date | null,
    dataCriacao: Date = new Date(Date.now()),
    completo: boolean = false,
  ) {
    this._titulo = titulo;
    this._completo = completo;
    this._dataCriacao = dataCriacao ?? null;
    this._prazo = prazo ?? null;
  }

  get titulo(): string {
    return this._titulo
  }

  get prazo(): Date | null {
    return this._prazo
  }

  get dataCriacao(): Date | null {
    return this._dataCriacao
  }

  get completo(): boolean {
    return this._completo
  }

  set titulo(titulo: string) {
    if (titulo === undefined || titulo === null || titulo.trim() === "")
      throw new InvalidtituloError();
    else 
      this._titulo = titulo
  }

  set prazo(prazo: Date) {
    try {
      const date: Date = new Date(prazo)
      this._prazo = date
    } catch (error) {
      
    }
  }

  completar() {
    this._completo = true
  }

  descompletar() {
    this._completo = false
  }
}