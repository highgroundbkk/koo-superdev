#!/usr/bin/env node
import { printBanner } from './src/banner.js';
import { parseCliInvocation, printCliHelp, printCliVersion } from './src/cli-flags.js';

const cli = parseCliInvocation(process.argv.slice(2));
if (cli.showVersion) {
	printCliVersion();
} else if (cli.showHelp) {
	printCliHelp();
} else {
	await printBanner(cli.label);
}
