export default class ErroTarefaJahPertenceNaLista extends Error {
  constructor() {
    super("A tarefa já pertence a essa lista!")
  }
}