import { log } from "../helpers/logs.js";
import { chdir } from "process";
import { showDirectory } from "../helpers/showCurrentDirectory.js";

export async function cd(path) {
    try {
        const newPath = path.length === 2 && path.slice(-1) === ":" ? path + "/" : path;
        chdir(newPath);
        showDirectory();
    } catch (e) {
        log.showError("Operation Failed");
    }
}
