import EventEmitter from 'events';
import readline from 'readline';
import fs from 'fs';

export default class extends EventEmitter {
    parseFile(filePath, regex) {
        this.parse(fs.createReadStream(filePath), regex);
    }
    parse(input, regex) {
        const lineReader = readline.createInterface({ input });
        lineReader.on('line', (line) => {
            const result = regex.exec(line);
            if (result !== null) {
                result.forEach((value) => {
                    super.emmit('found', value);
                });
            }
        });
        lineReader.on('close', () => super.emmit('close'));
    }
}

