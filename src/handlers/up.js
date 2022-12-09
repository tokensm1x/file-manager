import { log } from "../helpers/logs.js";
import { chdir } from "process";
import { showDirectory } from "../helpers/showCurrentDirectory.js";

export async function up() {
    try {
        chdir("..");
        showDirectory();
    } catch (e) {
        log.showError("Operation Failed");
    }
}
