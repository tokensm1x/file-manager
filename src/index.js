import { exit, chdir } from "process";
import { showDirectory } from "./helpers/show-current-directory.js";
import readline from "readline";
import { homedir } from "os";
import { commands } from "./helpers/constants.js";
import { log } from "./helpers/logs.js";
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
} from "./handlers/index.js";

const username =
    process.argv.splice(2).reduce((acc, el) => {
        const arg = el.split("=");
        acc[arg[0]] = arg[1];
        return acc;
    }, {})["--username"] || "Unknown";

chdir(homedir());

log.showMessage(`Welcome to the File Manager, ${username}!`);

showDirectory();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const handleLine = async (line) => {
    if (line.trim() === ".exit") return rl.close();
    const currentCommand = line.split(" ")[0];
    const args = line.split(" ").splice(1);
    try {
        switch (currentCommand) {
            case commands.up: {
                await handleUp();
                break;
            }
            case commands.cd: {
                await handleCd(args.join());
                break;
            }
            case commands.ls: {
                await handleLs();
                break;
            }
            case commands.cat: {
                await readFile(args.join());
                break;
            }
            case commands.add: {
                await addFile(args.join());
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
                await removeFile(args.join());
                break;
            }
            case commands.hash: {
                await calcHash(args.join(""));
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
                await decompressFile(args);
                break;
            }
            default: {
                throw new Error("Invalid input!");
            }
        }
    } catch (e) {
        log.showError(`${e}`);
    }
};

rl.on("line", (line) => {
    handleLine(line);
})
    .on("SIGINT", () => {
        rl.close();
    })
    .on("error", () => {
        rl.close();
    })
    .on("close", () => {
        log.showMessage(`Thank you for using File Manager, ${username}!`);
        exit();
    });
