import Id from "./Id"

export default class Entidade {
  constructor(private readonly _id = Id.novo()) { }

  get Id() {
    return this._id
  }
}