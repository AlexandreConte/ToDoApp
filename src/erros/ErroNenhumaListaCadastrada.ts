export default class ErroNenhumaListaCadastrada extends Error {
  constructor() {
    super("Nenhuma lista cadastrada! Retornando...")
  }
}