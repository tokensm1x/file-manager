import { exit, chdir } from "process";
import { showDirectory } from "./src/helpers/showCurrentDirectory.js";
import readline from "readline";
import { homedir } from "os";
import { handleOs, calcHash, up, cd, ls, cat, add, rn, rm } from "./src/handlers/index.js";
import { commands } from "./src/helpers/constants.js";
import { log } from "./src/helpers/logs.js";

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
                await up();
                break;
            }
            case commands.cd: {
                await cd(args.join());
                break;
            }
            case commands.ls: {
                await ls();
                break;
            }
            case commands.cat: {
                await cat(args.join());
                break;
            }
            case commands.add: {
                await add(args.join());
                break;
            }
            case commands.rn: {
                await rn(args);
                break;
            }
            case commands.cp: {
                break;
            }
            case commands.mv: {
                break;
            }
            case commands.rm: {
                await rm(args.join());
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
                break;
            }
            case commands.decompress: {
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
