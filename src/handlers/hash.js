import { log } from "../helpers/logs.js";
import { showDirectory } from "../helpers/show-current-directory.js";
import { resolve } from "path";
import { createHash } from "crypto";
import { createReadStream } from "fs";

export async function hash(args) {
    const filePath = resolve(args);
    if (args.length < 1) throw new Error("Invalid arguments!");
    try {
        const readStream = createReadStream(filePath);
        let readContent = "";
        readStream.on("data", (chunk) => {
            readContent += chunk;
        });
        readStream.on("error", (err) => {
            log.showError("Operation Failed");
        });
        readStream.on("end", () => {
            const hash = createHash("sha256").update(readContent).digest("hex");
            log.showText("Hash: " + hash);
            showDirectory();
        });
    } catch (e) {
        log.showError("Operation Failed");
    }
}
