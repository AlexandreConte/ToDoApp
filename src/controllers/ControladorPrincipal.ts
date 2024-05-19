import TelaPrincipal from "../views/TelaPrincipal"
import Controlador from "./Controlador";
import ControladorDeListas from "./ControladorDeListas";
import ControladorDeTarefas from "./ControladorDeTarefas";

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

  abrirTela() {
    this.abrir()
    while (this.manterAberto) {
      let opcao = this.telaPrincipal.mostrarMenu()
      switch (opcao) {
        case "1":
          this.controladorDeTarefas.abrirTela()
          break
  
        case "2":
          this.controladorDeListas.abrirTela()
          break
  
        case "0":
          this.fechar()
  
        default:
          break;
      }
    }
    console.log("Saindo do aplicação...")
  }
}