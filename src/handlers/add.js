import { showDirectory } from "../helpers/showCurrentDirectory.js";
import { resolve } from "path";
import { log } from "../helpers/logs.js";
import { open } from "fs/promises";

export async function add(path) {
    let file;
    try {
        const newPath = resolve(path);
        file = await open(newPath, "w");
        log.showText("File created!");
        showDirectory();
    } catch (e) {
        console.log(e);
        throw new Error("Operation failed");
    } finally {
        file?.close();
    }
}
