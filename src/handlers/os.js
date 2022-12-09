import { cpus, homedir, arch, EOL, userInfo } from "os";
import { showDirectory } from "../helpers/showCurrentDirectory.js";
import { log } from "../helpers/logs.js";

export async function handleOs(args) {
    const data = args[0];
    if (args.length !== 1) throw new Error("Invalid input!");
    switch (data) {
        case "--EOL": {
            log.showText(`EOL: ${JSON.stringify(EOL)}`);
            break;
        }
        case "--cpus": {
            const allCpus = cpus().map((el) => {
                return {
                    model: el.model,
                    speed: (el.speed / 1000).toFixed(2) + "GHz",
                };
            });
            log.showText(`Amount of CPUS: ${allCpus.length}`);
            log.showTable(allCpus);
            break;
        }
        case "--homedir": {
            log.showText(`Home catalog: ${homedir()}`);
            break;
        }
        case "--username": {
            log.showText(`System Username: ${userInfo().username}`);
            break;
        }
        case "--architecture": {
            log.showText(`System architecture: ${arch()}`);
            break;
        }
        default: {
            throw new Error("Invalid input!");
        }
    }
    showDirectory();
}
