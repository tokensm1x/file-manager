import { log } from "../helpers/logs.js";
import { chdir } from "process";
import { showDirectory } from "../helpers/show-current-directory.js";
import { resolve } from "path";

async function up() {
    try {
        chdir("..");
        showDirectory();
    } catch (e) {
        log.showError("Operation Failed");
    }
}

async function cd(args) {
    try {
        if (args.length !== 1) throw new Error("Invalid input!");
        // const newPath = path.length === 2 && path.slice(-1) === ":" ? path + "/" : path;
        const filePath = resolve(args[0]);
        chdir(filePath);
        showDirectory();
    } catch (e) {
        log.showError("Operation Failed");
    }
}

export { cd, up };
