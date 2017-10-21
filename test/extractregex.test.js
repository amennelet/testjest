import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { List } from 'immutable';
import ExtractRegex from '../module/extractregex';

describe('extracting regex from file', () => {
    it('read all lines from a file', () => {
        var totalLine = 0;
        const lineReader = readline.createInterface({ input: fs.createReadStream(path.join(__dirname, 'Allflex_L1InkUnloadTrayProcessor_PLCBugOnReject.log')) });
        lineReader.on('line', (line) => {
            totalLine++;
        });
        lineReader.on('close', () => {
            expect(totalLine).toBe(470);
        });
    });
    it('filter lines with regex', () => {
        var list = List();
        const lineReader = readline.createInterface({ input: fs.createReadStream(path.join(__dirname, 'Allflex_L1InkUnloadTrayProcessor_PLCBugOnReject.log')) });
        lineReader.on('line', (line) => {
            const result = /\/I:[0-9,]+/.exec(line);
            if (result !== null) {
                result.forEach((value) => {
                    list = list.concat([value])
                });
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
        var list = List();
        const extractRegex = new ExtractRegex();
        extractRegex.on('found', (value) => list = list.concat([value]));
        extractRegex.parse(fs.createReadStream(path.join(__dirname, 'Allflex_L1InkUnloadTrayProcessor_PLCBugOnReject.log')), /\/I:[0-9,]+/);
        extractRegex.on('close', () => {
            expect(156).toBe(list.size);
            expect(list.first()).toBe('/I:0,4107,4099,4099,4099,0,0,0,0,0,0');
            expect(list.last()).toBe('/I:0,12297,12289,12289,12305,0,0,0,0,0,0');
        });
    });
    it('filter lines with regex from file path', () => {
        var list = List();
        const extractRegex = new ExtractRegex();
        extractRegex.on('found', (value) => list = list.concat([value]));
        extractRegex.parseFile(path.join(__dirname, 'Allflex_L1InkUnloadTrayProcessor_PLCBugOnReject.log'), /\/I:[0-9,]+/);
        extractRegex.on('close', () => {
            expect(156).toBe(list.size);
            expect(list.first()).toBe('/I:0,4107,4099,4099,4099,0,0,0,0,0,0');
            expect(list.last()).toBe('/I:0,12297,12289,12289,12305,0,0,0,0,0,0');
        });
    });
});