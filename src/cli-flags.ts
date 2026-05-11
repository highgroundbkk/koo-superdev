import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { resolveAgentLabel } from './agent-presets.js';

const DIM = '\x1b[2m';
const RESET = '\x1b[0m';
const CYAN = '\x1b[36m';
const GREEN = '\x1b[32m';

export interface CliInvocation {
  label: string;
  showHelp: boolean;
  showVersion: boolean;
  args: string[];
}

export function parseCliInvocation(argv: string[]): CliInvocation {
  return {
    label: resolveAgentLabel(argv),
    showHelp: argv.includes('--help') || argv.includes('-h') || argv.includes('/help') || argv.includes('help'),
    showVersion: argv.includes('--version') || argv.includes('-v') || argv.includes('/version') || argv.includes('version'),
    args: argv,
  };
}

export function printCliHelp(): void {
  const commands = [
    ['/command', 'ultra-minimal cheatsheet'],
    ['/help', 'show all commands'],
    ['/version', 'show app version'],
    ['/agent sharp', 'switch to KOO-SHARP'],
    ['/agent builder', 'switch to KOO-BUILDER'],
    ['/model', 'switch model interactively'],
    ['/compact', 'trim old messages'],
    ['/autocompact', 'toggle automatic compaction'],
    ['/loop', 'toggle loop mode'],
    ['/session', 'show current session'],
    ['/log', 'list recent sessions'],
    ['/check', 'quick config check'],
    ['/refine', 'install community pack'],
    ['/refine list', 'list installed packs'],
    ['/refine remove <pack>', 'remove a pack'],
  ] as const;

  console.log(`${GREEN}KOO agent shell${RESET}`);
  console.log(`${DIM}Theme / skin plus agent presets.${RESET}`);
  console.log('');
  console.log(`${CYAN}Usage${RESET}`);
  console.log(`  koo${DIM} [sharp|builder|agent4.1]${RESET}`);
  console.log(`  koo tui${DIM} [sharp|builder]${RESET}`);
  console.log(`  koo cli${DIM} [sharp|builder]${RESET}`);
  console.log('');
  console.log(`${CYAN}Flags${RESET}`);
  console.log(`  ${DIM}--help, -h${RESET}      show this help`);
  console.log(`  ${DIM}--version, -v${RESET}   show version`);
  console.log('');
  console.log(`${CYAN}Slash Commands${RESET}`);
  for (const [name, desc] of commands) {
    console.log(`  ${CYAN}${name.padEnd(16)}${RESET}${DIM}${desc}${RESET}`);
  }
  console.log('');
  console.log(`${DIM}Community:${RESET} debug, safe, fast, deep, review, publish, secure, superpowers, supergstack, graphify, memory`);
  console.log(`${DIM}External:${RESET} automem, skills, cron, agents, return, rewind, teleport, superman`);
  console.log('');
  console.log(`${DIM}Tip:${RESET} run ${CYAN}koo sharp${RESET} or ${CYAN}koo builder${RESET} for ready-made clones.`);
}

export function printCliVersion(): void {
  const pkgPath = resolve('package.json');
  if (!existsSync(pkgPath)) {
    console.log('koo-superdev unknown');
    return;
  }
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8')) as { name?: string; version?: string };
  console.log(`${pkg.name ?? 'koo-superdev'} v${pkg.version ?? 'unknown'}`);
}