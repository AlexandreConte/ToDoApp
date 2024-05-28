// Tela:
import TelaPrincipal from "../telas/TelaPrincipal"
// Controladores:
import Controlador from "./Controlador";
import ControladorTarefa from "./ControladorTarefa";
import ControladorListaTarefas from "./ControladorListaTarefas";
// Enum menu:
import OpcoesDoMenuPrincipal from "../opcoesDeMenus/OpcoesMenuPrincipal"

export default class ControladorPrincipal extends Controlador {
  constructor(
    private readonly _telaPrincipal = TelaPrincipal,
    private readonly _controladorTarefa = new ControladorTarefa(),
    private readonly _controladorListaTarefas = new ControladorListaTarefas(_controladorTarefa)
  ) { 
    super()
  }

  get telaPrincipal() {
    return this._telaPrincipal;
  }

  get controladorTarefa() {
    return this._controladorTarefa
  }

  get controladorListaTarefas() {
    return this._controladorListaTarefas
  }

  abrirTela(): void {
    this.abrir()
    while (this.manterAberto) {
      let opcao = this.telaPrincipal.mostrarMenu()
      switch (opcao) {
        case OpcoesDoMenuPrincipal.AbrirTelaDeTarefas:
          this.controladorTarefa.abrirTela()
          break
        case OpcoesDoMenuPrincipal.AbrirTelaDeListasDeTarefas:
          this.controladorListaTarefas.abrirTela()
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