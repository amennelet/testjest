const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { List } = require('immutable');

describe('extracting regex from file', () => {
    it('read all lines from a file', () => {
        var totalLine = 0;
        const lineReader = readline.createInterface({ input: fs.createReadStream(path.join(__dirname, 'Allflex_L1InkUnloadTrayProcessor_PLCBugOnReject.log')) });
        lineReader.on('line', (line) => {
            totalLine++;
        });
        lineReader.on('close', () => {
            expect(470).toBe(totalLine);
        });
    });
    it('filter lines with regex', () => {
        var list = List();
        const lineReader = readline.createInterface({ input: fs.createReadStream(path.join(__dirname, 'Allflex_L1InkUnloadTrayProcessor_PLCBugOnReject.log')) });
        lineReader.on('line', (line) => {
            const result = /\/I:[0-9,]+/.exec(line);
            if (result !== null) {
                result.forEach((value) => list = list.concat([value]));
            }
        });
        lineReader.on('close', () => {
            expect(list.size).toBe(156);
        });
    });
});