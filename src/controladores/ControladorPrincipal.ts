// Telas
import TelaPrincipal from "../telas/TelaPrincipal"
// Controladores
import Controlador from "./Controlador"
import ControladorDeListas from "./ControladorDeListas"
import ControladorDeTarefas from "./ControladorDeTarefas"
// Enums
import OpcoesDoMenuPrincipal from "../opcoesDeMenus/OpcoesDoMenuPrincipal"

export default class ControladorPrincipal extends Controlador {
  constructor(
    private readonly _telaPrincipal = TelaPrincipal,
    private readonly _controladorDeTarefas = new ControladorDeTarefas(),
    private readonly _controladorDeListas = new ControladorDeListas(_controladorDeTarefas)
  ) { 
    super()
  }

  get telaPrincipal() {
    return this._telaPrincipal;
  }

  get controladorDeTarefas() {
    return this._controladorDeTarefas
  }

  get controladorDeListas() {
    return this._controladorDeListas
  }

  abrirTela(): void {
    this.abrir()
    while (this.manterAberto) {
      let opcao = this.telaPrincipal.mostrarMenu()
      switch (opcao) {
        case OpcoesDoMenuPrincipal.AbrirTelaDeTarefas:
          this.controladorDeTarefas.abrirTela()
          break
        case OpcoesDoMenuPrincipal.AbrirTelaDeListasDeTarefas:
          this.controladorDeListas.abrirTela()
          break
        case OpcoesDoMenuPrincipal.Fechar:
          this.fechar()
          break
        default:
          break
      }
    }
    console.log("Saindo do aplicação...")
  }
}