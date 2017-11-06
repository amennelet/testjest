import readline from 'readline';
import fs from 'fs';

export default class ExtractRegex {
    constructor(onFound, onClose) {
        this.OnFound = onFound;
        this.OnClose = onClose;
    }
    parseFile(filePath, regex) {
        this.parse(fs.createReadStream(filePath), regex);
    }
    parse(input, regex) {
        const lineReader = readline.createInterface({ input });
        lineReader.on('line', (line) => {
            const result = regex.exec(line);
            if (result !== null) {
                result.forEach(value => this.OnFound(value));
            }
        });
        lineReader.on('close', () => this.OnClose());
    }
}

