import { showDirectory } from "../helpers/showCurrentDirectory.js";
import { resolve } from "path";
import { log } from "../helpers/logs.js";
import { rename } from "fs/promises";

export async function rn(args) {
    try {
        const path = resolve(args[0]);
        const fileName = args[1];
        await rename(path, fileName);
        log.showText("File renamed!");
        showDirectory();
    } catch (e) {
        throw new Error("Operation failed");
    }
}
