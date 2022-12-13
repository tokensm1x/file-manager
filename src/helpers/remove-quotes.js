export function removeQuotes(line) {
    let str = line.split(" ").splice(1).join(" ");
    let originalString = str;
    if (!str.length) return [];
    if ((str.match(/"/g) || []).length > 1) {
        const re = /"(.*?)"/g;
        const result = [];
        let current;
        while ((current = re.exec(str))) {
            result.push(`"${current.pop()}"`);
        }
        let args = result.length > 0 ? result : [str];
        args.forEach((el) => {
            str = str
                .replace(`${el}`, "")
                .replace(/ +(?= )/g, "")
                .trim();
        });
        if (str.length) args.push(str.split(" "));
        let argsArray = args.flat();
        argsArray.forEach((el, i) => {
            originalString = originalString.replace(el, i);
        });
        let sortedArgs = originalString.split(" ").map((el) => {
            if (argsArray[+el].startsWith('"') && argsArray[+el].endsWith('"')) {
                return argsArray[+el].slice(1, -1);
            } else {
                return argsArray[+el];
            }
        });
        return sortedArgs;
    } else {
        return str.split(" ");
    }
}
