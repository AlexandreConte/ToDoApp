export default abstract class Controlador {
  constructor(
    private _manterAberto: boolean = true,
  ) { }

  get manterAberto(): boolean {
    return this._manterAberto
  }

  abrir() {
    this._manterAberto = true
  }

  fechar() {
    this._manterAberto = false
  }
}