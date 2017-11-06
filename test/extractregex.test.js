import fs from 'fs';
import path from 'path';
import readline from 'readline';
import ExtractRegex from '../module/extractregex';

describe('extracting regex from file', () => {
    it('read all lines from a file', () => {
        let totalLine = 0;
        const lineReader = readline.createInterface({ input: fs.createReadStream(path.join(__dirname, 'Allflex_L1InkUnloadTrayProcessor_PLCBugOnReject.log')) });
        lineReader.on('line', () => {
            totalLine += 1;
        });
        lineReader.on('close', () => {
            expect(totalLine).toBe(470);
        });
    });
    it('filter lines with regex', () => {
        const list = [];
        const lineReader = readline.createInterface({ input: fs.createReadStream(path.join(__dirname, 'Allflex_L1InkUnloadTrayProcessor_PLCBugOnReject.log')) });
        lineReader.on('line', (line) => {
            const result = /\/I:[0-9,]+/.exec(line);
            if (result !== null) {
                result.forEach(value => list.push(value));
            }
        });
        lineReader.on('close', () => {
            expect(156).toBe(list.size);
            expect(list.first()).toBe('/I:0,4107,4099,4099,4099,0,0,0,0,0,0');
            expect(list.last()).toBe('/I:0,12297,12289,12289,12305,0,0,0,0,0,0');
        });
    });
});

describe('ExtractRegex', () => {
    it('filter lines with regex from read stream', () => {
        const list = [];
        const extractRegex = new ExtractRegex(value => list.push(value), () => {
            expect(156).toBe(list.size);
            expect(list.first()).toBe('/I:0,4107,4099,4099,4099,0,0,0,0,0,0');
            expect(list.last()).toBe('/I:0,12297,12289,12289,12305,0,0,0,0,0,0');
        });
        extractRegex.parse(fs.createReadStream(path.join(__dirname, 'Allflex_L1InkUnloadTrayProcessor_PLCBugOnReject.log')), /\/I:[0-9,]+/);
    });
    it('filter lines with regex from file path', () => {
        const list = [];
        const extractRegex = new ExtractRegex(value => list.push(value), () => {
            expect(156).toBe(list.size);
            expect(list.first()).toBe('/I:0,4107,4099,4099,4099,0,0,0,0,0,0');
            expect(list.last()).toBe('/I:0,12297,12289,12289,12305,0,0,0,0,0,0');
        });
        extractRegex.parseFile(path.join(__dirname, 'Allflex_L1InkUnloadTrayProcessor_PLCBugOnReject.log'), /\/I:[0-9,]+/);
    });
});
