import loadWorker from "../../../functions/loadWorker";
import { regexpFunc } from "./regexp.worker";

export function createRegexpWorker(): Worker {
  return loadWorker(regexpFunc);
}
