import {Pit} from "./pit";
import {Status} from "./status";

export interface Game {
  id: string
  activePlayer: string
  pits: Pit[]
  status: Status
  winner: string
  errors: string[]
}
