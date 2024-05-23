import Id from "./Id"

export default class Entidade {
  constructor(private readonly _id = Id.novo()) { }

  get id() {
    return this._id
  }
}