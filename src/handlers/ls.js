import { readdir } from "fs/promises";
import { resolve } from "path";
import { cwd } from "process";
import { showDirectory } from "../helpers/showCurrentDirectory.js";
import { log } from "../helpers/logs.js";

export async function ls() {
    try {
        console.log(cwd());
        const path = resolve(cwd());
        const fileList = await readdir(path);
        log.showTable(fileList);
        showDirectory();
    } catch (e) {
        log.showError("Operation failed");
    }
}
