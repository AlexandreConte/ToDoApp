// Controladores
import Controlador from "./Controlador"
import ControladorDeListas from "./ControladorDeListas"
import ControladorDeTarefas from "./ControladorDeTarefas"

// Telas
import TelaPrincipal from "../telas/TelaPrincipal"

// Enums
import OpcoesDoMenuPrincipal from "../enums/OpcoesDoMenuPrincipal"

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