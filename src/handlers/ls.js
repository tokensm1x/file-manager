import { readdir } from "fs/promises";
import { resolve } from "path";
import { cwd } from "process";
import { showDirectory } from "../helpers/showCurrentDirectory.js";
import { log } from "../helpers/logs.js";

export async function ls() {
    try {
        const path = resolve(cwd());
        const fileList = (await readdir(path, { withFileTypes: true })).map((el) => {
            return {
                name: el.name,
                type: el.isDirectory() ? "directory" : "file",
            };
        });
        log.showTable(fileList);
        showDirectory();
    } catch (e) {
        log.showError("Operation failed");
    }
}
