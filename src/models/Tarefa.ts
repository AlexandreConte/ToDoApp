import InvalidtituloError from "../../errors/ErroTituloInvalido";
import Entidade from "./Entidade";

export interface TarefaProps {
  get titulo(): string
  get prazo(): Date | null
  get dataCriacao(): Date | null
  get completo(): boolean
  set titulo(titulo: string)
  set prazo(prazo: Date)
  completar(): void
  descompletar(): void
}

export default class Tarefa extends Entidade implements TarefaProps {
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
    super();
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