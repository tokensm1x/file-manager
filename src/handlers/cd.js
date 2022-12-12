import { log } from "../helpers/logs.js";
import { chdir } from "process";
import { showDirectory } from "../helpers/showCurrentDirectory.js";
import { resolve } from "path";

export async function cd(path) {
    try {
        const newPath = path.length === 2 && path.slice(-1) === ":" ? path + "/" : path;
        const filePath = resolve(newPath);
        chdir(filePath);
        showDirectory();
    } catch (e) {
        log.showError("Operation Failed");
    }
}
