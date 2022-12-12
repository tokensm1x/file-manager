export function removeQuotes(line) {
    let str = line.split(" ").splice(1).join(" ");
    if (!str.length) return [];
    const re = /"(.*?)"/g;
    const result = [];
    let current;
    while ((current = re.exec(str))) {
        result.push(current.pop());
    }
    let args = result.length > 0 ? result : [str];
    args.forEach((el) => {
        str = str.replace(`${el}`, "").replace('""', "").trim();
    });
    console.log(args);
    if (str.length) {
        args.push(str.split(" "));
    }
    return args.flat();
}
