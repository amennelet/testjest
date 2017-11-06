/* eslint no-console : off */
import commander from 'commander';
import ExtractRegex from './module/extractregex';

commander
    .version('1.0.0')
    .option('-f, --file <file>', 'file to parse')
    .option('-r, --regex [regex]', 'RegEx to extract')
    .parse(process.argv);

console.log(`Parsing ${commander.file} with ${commander.regex}`);

const extractRegex = new ExtractRegex(value => console.log(value), () => console.log('\nDone.'));
extractRegex.parseFile(commander.file, new RegExp(commander.regex));
