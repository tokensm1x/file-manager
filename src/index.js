import { exit, chdir } from "process";
import { showDirectory } from "./helpers/show-current-directory.js";
import readline from "readline";
import { homedir } from "os";
import { log } from "./helpers/logs.js";
import { handleLine } from "./handlers/handleLine.js";

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

rl.on("line", (line) => {
    handleLine(line, rl);
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
