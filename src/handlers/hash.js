import { log } from "../helpers/logs.js";
import { showDirectory } from "../helpers/showCurrentDirectory.js";
import { resolve } from "path";
import { createHash } from "crypto";
import { createReadStream } from "fs";
import { stat } from "fs/promises";

export async function calcHash(args) {
    const filePath = resolve(args.join(" "));
    console.log(filePath);
    if (args.length < 1) throw new Error("Invalid arguments!");
    try {
        // stat(filePath)
        //     .then((res) => {
        //         console.log(res);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
        // const readStream = createReadStream(filePath);
        // let readContent = "";
        // readStream.on("data", (chunk) => {
        //     readContent += chunk;
        // });
        // readStream.on("error", (err) => {
        //     console.log(err);
        //     throw new Error(err);
        // });
        // readStream.on("end", () => {
        //     const hash = createHash("sha256").update(readContent).digest("hex");
        //     log.showText(hash);
        //     showDirectory();
        // });
    } catch (e) {
        log.showError("Operation Failed");
    }
}
