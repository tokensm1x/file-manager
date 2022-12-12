import { showDirectory } from "../helpers/showCurrentDirectory.js";
import { resolve } from "path";
import { log } from "../helpers/logs.js";
import { unlink } from "fs/promises";

export async function rm(path_to_delete) {
    try {
        const path = resolve(path_to_delete);
        await unlink(path);
        log.showText("File deleted!");
        showDirectory();
    } catch (e) {
        console.log(e);
        throw new Error("Operation failed");
    }
}
