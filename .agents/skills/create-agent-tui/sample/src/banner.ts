
// Color codes for gradients and effects
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';
const CYAN = '\x1b[36m';
const MAGENTA = '\x1b[35m';
const YELLOW = '\x1b[33m';
const GREEN = '\x1b[32m';
const BLUE = '\x1b[34m';
const WHITE = '\x1b[97m';
const BG_MAGENTA = '\x1b[45m';
const BG_CYAN = '\x1b[46m';
const BG_BLUE = '\x1b[44m';
const BG_BLACK = '\x1b[40m';

// Gradient effect for the main title
const gradient = [CYAN, BLUE, MAGENTA, YELLOW, GREEN];
function colorize(text: string, colors: string[]): string {
  let out = '';
  for (let i = 0; i < text.length; i++) {
    out += colors[i % colors.length] + text[i];
  }
  return out + RESET;
}

const LOGO = `
${BOLD}${BG_BLACK}${WHITE}╭────────────────────────────────────────────╮${RESET}
${BOLD}${BG_BLACK}${WHITE}│${RESET}   ${colorize('KOO SUPERDEV', gradient)}      ${BOLD}${WHITE}⚡️${RESET}${BG_BLACK}${WHITE}   │${RESET}
${BOLD}${BG_BLACK}${WHITE}│${RESET}   ${CYAN}AI Terminal Toolkit${RESET}   ${MAGENTA}v1.0${RESET}      ${BG_BLACK}${WHITE}│${RESET}
${BOLD}${BG_BLACK}${WHITE}│${RESET}   ${YELLOW}Type /koo, /koo tui, /koo cli${RESET}   ${BG_BLACK}${WHITE}│${RESET}
${BOLD}${BG_BLACK}${WHITE}│${RESET}   ${DIM}"Unleash your dev superpower!"${RESET}   ${BG_BLACK}${WHITE}│${RESET}
${BOLD}${BG_BLACK}${WHITE}╰────────────────────────────────────────────╯${RESET}

${BOLD}${CYAN}        ╔═╗┬ ┬┌─┐  ╔═╗┬ ┬┌─┐┬─┐${RESET}
${BOLD}${MAGENTA}        ║  ├─┤├┤   ║  ├─┤├┤ ├┬┘${RESET}
${BOLD}${YELLOW}        ╚═╝┴ ┴└─┘  ╚═╝┴ ┴└─┘┴└─${RESET}

${BOLD}${GREEN}        🚀 Fast. ${CYAN}✨ Beautiful. ${MAGENTA}🦾 Powerful.${RESET}
`;

export function printBanner(model: string): void {
  console.log(LOGO);
  console.log(`\n  ${DIM}model  ${RESET}${model}\n`);
}
