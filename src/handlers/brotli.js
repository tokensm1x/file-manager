import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { showDirectory } from "../helpers/show-current-directory.js";
import { resolve } from "path";
import { log } from "../helpers/logs.js";
import { pipeline } from "stream/promises";

async function compressFile(args) {
    try {
        const path = resolve(args[0]);
        const newPath = resolve(args[1]);
        const readStream = createReadStream(path);
        const writeStream = createWriteStream(newPath + ".br");
        const compressFile = createBrotliCompress();

        await pipeline(readStream, compressFile, writeStream);
        log.showText("File compressed!");
        showDirectory();
    } catch (e) {
        throw new Error("Operation failed");
    }
}

async function decompressFile(args) {
    try {
        const path = resolve(args[0]);
        const newPath = resolve(args[1]);
        const readStream = createReadStream(path);
        const writeStream = createWriteStream(newPath);
        const compressFile = createBrotliDecompress();

        await pipeline(readStream, compressFile, writeStream);
        log.showText("File decompressed!");
        showDirectory();
    } catch (e) {
        throw new Error("Operation failed");
    }
}

export { compressFile, decompressFile };
