// UUID:
import { v4 as uuidv4 } from "uuid"

export default class Id {
  private static _id: string

  static novo() {
    return uuidv4()
  }
}