import TarefaProps from "./Tarefa"

export default interface ListaProps {
  id: string
  titulo: string
  tarefas: TarefaProps[]
}