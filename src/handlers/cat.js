import { showDirectory } from "../helpers/showCurrentDirectory.js";
import { resolve } from "path";
import { log } from "../helpers/logs.js";
import { createReadStream } from "fs";

export async function cat(path) {
    try {
        const newPath = resolve(path);
        const readStream = createReadStream(newPath);
        let readContent = "";

        readStream.on("data", (chunk) => {
            readContent += chunk;
        });

        readStream.on("error", (err) => {
            log.showError("Operation failed");
        });

        readStream.on("end", () => {
            log.showText(readContent);
            showDirectory();
        });
    } catch (e) {
        throw new Error("Operation failed");
    }
}
