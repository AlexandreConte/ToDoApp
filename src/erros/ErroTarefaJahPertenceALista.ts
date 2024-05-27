export default class ErroTarefaJahPertenceALista extends Error {
  constructor() {
    super("A tarefa já pertence a essa lista!")
  }
}