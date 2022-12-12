import { cwd } from "process";
import { log } from "./logs.js";

export function showDirectory() {
    log.showInfo(`You are currently in ${cwd()}`);
}
