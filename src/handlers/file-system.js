import { readdir } from "fs/promises";
import { cwd } from "process";
import { open } from "fs/promises";
import { unlink } from "fs/promises";
import { log } from "../helpers/logs.js";
import { rename } from "fs/promises";
import { showDirectory } from "../helpers/show-current-directory.js";
import { resolve, parse } from "path";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";

async function ls() {
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

async function add(path) {
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

async function cat(path) {
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

async function rm(path_to_delete) {
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

async function rn(args) {
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

async function cp(args) {
    try {
        const path = resolve(args[0]);
        const folderPath = resolve(args[1], parse(path).base);
        const readStream = createReadStream(path);
        const writeStream = createWriteStream(folderPath);

        await pipeline(readStream, writeStream);
        log.showText("File copied!");
        showDirectory();
    } catch (e) {
        throw new Error("Operation failed");
    }
}

async function mv(args) {
    try {
        const path = resolve(args[0]);
        const folderPath = resolve(args[1], parse(path).base);
        const readStream = createReadStream(path);
        const writeStream = createWriteStream(folderPath);

        await pipeline(readStream, writeStream);
        await unlink(path);
        log.showText("File moved!");
        showDirectory();
    } catch (e) {
        throw new Error("Operation failed");
    }
}

export { mv, cp, rn, rm, cat, add, ls };
