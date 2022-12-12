import { commands } from "../helpers/constants.js";
import { log } from "../helpers/logs.js";
import {
    os as handleOs,
    hash as calcHash,
    up as handleUp,
    cd as handleCd,
    ls as handleLs,
    cat as readFile,
    add as addFile,
    rn as renameFile,
    rm as removeFile,
    cp as copyFile,
    mv as moveFile,
    compressFile,
    decompressFile,
} from "./index.js";
import { removeQuotes } from "../helpers/remove-quotes.js";

export async function handleLine(line, rl) {
    if (line.trim() === ".exit") return rl.close();
    const currentCommand = line.split(" ")[0];
    const args = removeQuotes(line);
    console.log(args);
    try {
        switch (currentCommand) {
            case commands.up: {
                await handleUp();
                break;
            }
            case commands.cd: {
                await handleCd(args);
                break;
            }
            case commands.ls: {
                await handleLs();
                break;
            }
            case commands.cat: {
                await readFile(args);
                break;
            }
            case commands.add: {
                await addFile(args);
                break;
            }
            case commands.rn: {
                await renameFile(args);
                break;
            }
            case commands.cp: {
                await copyFile(args);
                break;
            }
            case commands.mv: {
                await moveFile(args);
                break;
            }
            case commands.rm: {
                await removeFile(args);
                break;
            }
            case commands.hash: {
                await calcHash(args);
                break;
            }
            case commands.os: {
                await handleOs(args);
                break;
            }
            case commands.compress: {
                await compressFile(args);
                break;
            }
            case commands.decompress: {
                decompressFile(args);
                break;
            }
            default: {
                throw new Error("Invalid input!");
            }
        }
    } catch (e) {
        log.showError(`${e}`);
    }
}
