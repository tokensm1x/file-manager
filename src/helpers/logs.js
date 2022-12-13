import { consoleColors } from "./constants.js";

export const log = {
    showMessage: function (data) {
        console.log(consoleColors.green, data);
    },

    showInfo: function (data) {
        console.log(consoleColors.blue, data);
    },

    showError: function (data) {
        console.error(consoleColors.red, data);
    },

    showText: function (data) {
        console.log(consoleColors.yellow, data);
    },

    showTable: function (data) {
        console.table(data);
    },
};
