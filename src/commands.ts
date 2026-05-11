import type { Interface } from 'readline';
import type { AgentConfig, AgentProfile } from './config.js';
import type { ChatMessage } from './agent.js';
import { listSessions } from './session.js';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { COMMUNITY_PACKS } from './agent-presets.js';

const DIM = '\x1b[2m';
const RESET = '\x1b[0m';
const CYAN = '\x1b[36m';
const GREEN = '\x1b[32m';

export interface CommandContext {
  config: AgentConfig;
  rl: Interface;
  messages: ChatMessage[];
  sessionPath: string;
  resetSession: () => string;
  totalTokens: { input: number; output: number };
}

export interface SlashCommand {
  name: string;
  description: string;
  execute: (args: string, ctx: CommandContext) => Promise<void>;
}

const commands: SlashCommand[] = [];

function printCheatSheet(ctx: CommandContext): void {
  console.log(`  ${CYAN}/help${RESET}${DIM}            Show all commands${RESET}`);
  console.log(`  ${CYAN}/command${RESET}${DIM}          Ultra-minimal cheat sheet${RESET}`);
  console.log(`  ${CYAN}/version${RESET}${DIM}          Show app version${RESET}`);
  console.log(`  ${CYAN}/agent${RESET}${DIM}            Switch preset agent clone${RESET}`);
  console.log(`  ${CYAN}/model${RESET}${DIM}            Switch model${RESET}`);
  console.log(`  ${CYAN}/compact${RESET}${DIM}          Trim old messages${RESET}`);
  console.log(`  ${CYAN}/autocompact${RESET}${DIM}      Toggle automatic compaction${RESET}`);
  console.log(`  ${CYAN}/loop${RESET}${DIM}             Toggle loop mode${RESET}`);
  console.log(`  ${CYAN}/session${RESET}${DIM}          Show current session path${RESET}`);
  console.log(`  ${CYAN}/log${RESET}${DIM}              List recent sessions${RESET}`);
  console.log(`  ${CYAN}/check${RESET}${DIM}            Quick config check${RESET}`);
  console.log(`  ${CYAN}/refine${RESET}${DIM}           Install community pack${RESET}`);
  console.log(`  ${CYAN}/new${RESET}${DIM}              Start a fresh conversation${RESET}`);
  console.log('');
  console.log(`  ${DIM}Try:${RESET} ${CYAN}/agent sharp${RESET}  ${DIM}|${RESET}  ${CYAN}/agent builder${RESET}  ${DIM}|${RESET}  ${CYAN}/model${RESET}`);
  console.log(`  ${DIM}Flags:${RESET} ${CYAN}koo --help${RESET}  ${DIM}|${RESET}  ${CYAN}koo --version${RESET}  ${DIM}|${RESET}  ${CYAN}koo sharp${RESET}`);
}

function printMinimalCheatSheet(ctx: CommandContext): void {
  console.log(`  ${CYAN}/help${RESET}${DIM}      full command list${RESET}`);
  console.log(`  ${CYAN}/agent${RESET}${DIM}     switch clone preset${RESET}`);
  console.log(`  ${CYAN}/model${RESET}${DIM}     switch model${RESET}`);
  console.log(`  ${CYAN}/compact${RESET}${DIM}   trim memory${RESET}`);
  console.log(`  ${CYAN}/session${RESET}${DIM}   session status${RESET}`);
  console.log(`  ${CYAN}/refine${RESET}${DIM}    install community pack${RESET}`);
}

function printCommunityPacks(ctx?: CommandContext): void {
  console.log(`  ${DIM}Community packs are opt-in.${RESET}`);
  for (const pack of COMMUNITY_PACKS) {
    const installed = ctx && ctx.config && ctx.config.profiles && ctx.config.profiles[pack.key] ? `${GREEN}✓${RESET}` : ' ';
    console.log(`  ${installed} ${CYAN}/${pack.key}${RESET}  ${pack.title}${RESET}  ${DIM}—${RESET} ${pack.description}`);
  }
  console.log('');
  // Suggest packs based on context (simple example: if debug not installed, suggest it)
  if (ctx && ctx.config && ctx.config.profiles) {
    const missing = COMMUNITY_PACKS.filter(p => !ctx.config.profiles[p.key]);
    if (missing.length) {
      const suggest = missing.slice(0, 2).map(p => `/${p.key}`).join('  ');
      console.log(`  ${DIM}Try:${RESET} ${CYAN}${suggest}${RESET}`);
    }
  }
  console.log(`  ${DIM}Use:${RESET} ${CYAN}/refine debug${RESET}  ${DIM}|${RESET}  ${CYAN}/refine safe${RESET}  ${DIM}|${RESET}  ${CYAN}/refine publish${RESET}`);
  console.log(`  ${DIM}Ideas kept external:${RESET} automem, skills, cron, agents, return, rewind, teleport, superman`);
}

function applyProfile(ctx: CommandContext, profile: AgentProfile): void {
  ctx.config.name = profile.name;
  ctx.config.model = profile.model;
  if (profile.systemPrompt) ctx.config.systemPrompt = profile.systemPrompt;
  if (profile.maxSteps !== undefined) ctx.config.maxSteps = profile.maxSteps;
  if (profile.maxCost !== undefined) ctx.config.maxCost = profile.maxCost;
}

function persistCommunityPack(key: string, profile: AgentProfile): void {
  const configPath = resolve('agent.config.json');
  const existing = existsSync(configPath) ? JSON.parse(readFileSync(configPath, 'utf-8')) : {};
  const profiles = { ...(existing.profiles ?? {}) } as Record<string, AgentProfile>;
  profiles[key] = profile;
  writeFileSync(configPath, JSON.stringify({ ...existing, profiles }, null, 2) + '\n');
}

commands.push({
  name: '/command',
  description: 'Ultra-minimal cheat sheet',
  execute: async (_args, ctx) => {
    printMinimalCheatSheet(ctx);
  },
});

commands.push({
  name: '/refine',
  description: 'Install or preview community pack',
  execute: async (args, ctx) => {
    const key = args.trim().toLowerCase();
    if (!key) {
      printCommunityPacks();
      return;
    }

    const pack = COMMUNITY_PACKS.find((p) => p.key === key);
    if (!pack) {
      console.log(`  ${DIM}Unknown pack: ${key}${RESET}`);
      return;
    }

    persistCommunityPack(key, pack.profile);
    ctx.config.profiles[key] = pack.profile;
    applyProfile(ctx, pack.profile);
    console.log(`  ${GREEN}✓${RESET} ${DIM}Installed${RESET} ${CYAN}/${key}${RESET} ${DIM}→${RESET} ${CYAN}${pack.title}${RESET}`);
    console.log(`  ${DIM}Now active:${RESET} ${CYAN}${ctx.config.name}${RESET} ${DIM}(${ctx.config.model})${RESET}`);
  },
});

commands.push({
  name: '/agent',
  description: 'Switch to a preset agent clone',
  execute: async (args, ctx) => {
    const profiles = Object.entries(ctx.config.profiles ?? {});
    if (!profiles.length) {
      console.log(`  ${DIM}No agent profiles configured.${RESET}`);
      return;
    }

    const key = args.trim().toLowerCase();
    if (key) {
      const found = ctx.config.profiles[key];
      if (!found) {
        console.log(`  ${DIM}Unknown agent preset: ${key}${RESET}`);
        return;
      }
      applyProfile(ctx, found);
      console.log(`  ${DIM}Agent →${RESET} ${CYAN}${ctx.config.name}${RESET} ${DIM}(${ctx.config.model})${RESET}`);
      return;
    }

    console.log(`  ${DIM}Current:${RESET} ${CYAN}${ctx.config.name}${RESET} ${DIM}(${ctx.config.model})${RESET}`);
    profiles.forEach(([name, profile], index) => {
      console.log(`  ${DIM}${String(index + 1).padStart(2)})${RESET} ${CYAN}/${name}${RESET} ${DIM}${profile.name}${RESET} ${DIM}→${RESET} ${profile.model}`);
    });
    const pick = await ask(ctx.rl, `\n  ${DIM}Select (1-${profiles.length}) or preset name:${RESET} `);
    const trimmed = pick.trim();
    const index = Number(trimmed) - 1;
    const selected = Number.isInteger(index) && index >= 0 ? profiles[index]?.[1] : ctx.config.profiles[trimmed.toLowerCase()];
    if (!selected) {
      console.log(`  ${DIM}Cancelled.${RESET}`);
      return;
    }
    applyProfile(ctx, selected);
    console.log(`  ${DIM}Agent →${RESET} ${CYAN}${ctx.config.name}${RESET} ${DIM}(${ctx.config.model})${RESET}`);
  },
});

function ask(rl: Interface, prompt: string): Promise<string> {
  return new Promise((r) => {
    process.stdin.resume();
    rl.question(prompt, (answer) => { r(answer); });
  });
}

commands.push({
  name: '/model',
  description: 'Switch to a different model',
  execute: async (_args, ctx) => {
    console.log(`  ${DIM}Current:${RESET} ${CYAN}${ctx.config.model}${RESET}`);
    const query = await ask(ctx.rl, `  ${DIM}Search models:${RESET} `);
    if (!query.trim()) return;
    process.stdout.write(`  ${DIM}Fetching\u2026${RESET}`);
    const res = await fetch('https://openrouter.ai/api/v1/models');
    const { data } = (await res.json()) as { data: { id: string; name: string }[] };
    process.stdout.write('\r\x1b[K');
    const q = query.toLowerCase();
    const matches = data
      .filter((m) => m.id.toLowerCase().includes(q) || m.name.toLowerCase().includes(q))
      .slice(0, 15);
    if (!matches.length) {
      console.log(`  ${DIM}No models matching "${query}".${RESET}`);
      return;
    }
    matches.forEach((m, i) =>
      console.log(`  ${DIM}${String(i + 1).padStart(2)})${RESET} ${m.id}`),
    );
    const pick = await ask(ctx.rl, `\n  ${DIM}Select (1-${matches.length}):${RESET} `);
    const idx = parseInt(pick) - 1;
    if (idx >= 0 && idx < matches.length) {
      ctx.config.model = matches[idx].id;
      console.log(`  ${DIM}Model \u2192${RESET} ${CYAN}${ctx.config.model}${RESET}`);
    } else {
      console.log(`  ${DIM}Cancelled.${RESET}`);
    }
  },
});

commands.push({
  name: '/new',
  description: 'Start a fresh conversation',
  execute: async (_args, ctx) => {
    ctx.messages.length = 0;
    ctx.sessionPath = ctx.resetSession();
    console.log(`  ${GREEN}\u2713${RESET} ${DIM}New session started.${RESET}`);
  },
});

commands.push({
  name: '/version',
  description: 'Show app version',
  execute: async () => {
    const pkgPath = resolve('package.json');
    if (!existsSync(pkgPath)) {
      console.log(`  ${DIM}Version unknown.${RESET}`);
      return;
    }
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8')) as { version?: string; name?: string };
    console.log(`  ${CYAN}${pkg.name ?? 'koo-superdev'}${RESET} ${DIM}v${pkg.version ?? 'unknown'}${RESET}`);
  },
});

commands.push({
  name: '/session',
  description: 'Show current session info',
  execute: async (_args, ctx) => {
    console.log(`  ${DIM}Session:${RESET} ${CYAN}${ctx.sessionPath}${RESET}`);
    console.log(`  ${DIM}Messages:${RESET} ${CYAN}${ctx.messages.length}${RESET}`);
    console.log(`  ${DIM}Loop:${RESET} ${CYAN}${ctx.config.loopMode ? 'on' : 'off'}${RESET}  ${DIM}Auto-compact:${RESET} ${CYAN}${ctx.config.autoCompact ? 'on' : 'off'}${RESET}`);
  },
});

commands.push({
  name: '/log',
  description: 'List recent sessions',
  execute: async (_args, ctx) => {
    const sessions = listSessions(ctx.config.sessionDir).slice(-10).reverse();
    if (!sessions.length) {
      console.log(`  ${DIM}No saved sessions yet.${RESET}`);
      return;
    }
    for (const session of sessions) {
      console.log(`  ${CYAN}${session}${RESET}`);
    }
  },
});

commands.push({
  name: '/check',
  description: 'Quick configuration check',
  execute: async (_args, ctx) => {
    const checks = [
      ['API key', ctx.config.apiKey ? 'ok' : 'missing'],
      ['Model', ctx.config.model || 'missing'],
      ['Profile', ctx.config.name || 'missing'],
      ['Slash commands', ctx.config.slashCommands ? 'enabled' : 'disabled'],
    ] as const;
    for (const [label, value] of checks) {
      console.log(`  ${DIM}${label}:${RESET} ${value === 'ok' || value === 'enabled' ? GREEN : CYAN}${value}${RESET}`);
    }
  },
});

commands.push({
  name: '/refine',
  description: 'Install, list, or remove community packs',
  execute: async (args, ctx) => {
    const arg = args.trim().toLowerCase();
    if (!arg) {
      printCommunityPacks(ctx);
      console.log(`  ${DIM}Tip:${RESET} Use /refine <pack> to install, /refine list to see installed, or /refine remove <pack> to remove.`);
      return;
    }

    // /refine list
    if (arg === 'list') {
      const profiles = Object.entries(ctx.config.profiles ?? {});
      if (!profiles.length) {
        console.log(`  ${DIM}No packs installed.${RESET}`);
        return;
      }
      console.log(`  ${CYAN}Installed packs:${RESET}`);
      for (const [key, profile] of profiles) {
        const isActive = ctx.config.name === profile.name ? `${GREEN}*${RESET}` : ' ';
        console.log(`  ${isActive} ${CYAN}/${key}${RESET}  ${DIM}${profile.name}${RESET}  ${profile.model ? CYAN + profile.model + RESET : ''}`);
      }
      return;
    }

    // /refine remove <key>
    if (arg.startsWith('remove ')) {
      const key = arg.replace(/^remove\s+/, '').trim();
      if (!key) {
        console.log(`  ${DIM}Usage:${RESET} /refine remove <pack>`);
        return;
      }
      if (!ctx.config.profiles[key]) {
        console.log(`  ${DIM}Pack not found:${RESET} ${CYAN}${key}${RESET}`);
        return;
      }
      // Prevent removing the active profile
      if (ctx.config.name === ctx.config.profiles[key].name) {
        console.log(`  ${DIM}Cannot remove the active pack. Switch agent first.${RESET}`);
        return;
      }
      // Remove from config and disk
      const configPath = resolve('agent.config.json');
      const existing = existsSync(configPath) ? JSON.parse(readFileSync(configPath, 'utf-8')) : {};
      const profiles = { ...(existing.profiles ?? {}) } as Record<string, AgentProfile>;
      delete profiles[key];
      writeFileSync(configPath, JSON.stringify({ ...existing, profiles }, null, 2) + '\n');
      delete ctx.config.profiles[key];
      console.log(`  ${GREEN}\u2713${RESET} ${DIM}Removed pack:${RESET} ${CYAN}${key}${RESET}`);
      return;
    }

    // /refine <pack>
    const key = arg;
    const pack = COMMUNITY_PACKS.find((p) => p.key === key);
    if (!pack) {
      console.log(`  ${DIM}Unknown pack: ${key}${RESET}`);
      return;
    }
    persistCommunityPack(key, pack.profile);
    ctx.config.profiles[key] = pack.profile;
    applyProfile(ctx, pack.profile);
    console.log(`  ${GREEN}\u2713${RESET} ${DIM}Installed${RESET} ${CYAN}/${key}${RESET} ${DIM}\u2192${RESET} ${CYAN}${pack.title}${RESET}`);
    console.log(`  ${DIM}Now active:${RESET} ${CYAN}${ctx.config.name}${RESET} ${DIM}(${ctx.config.model})${RESET}`);
  },
});

commands.push({
  name: '/help',
  description: 'List available commands',
  execute: async (_args, ctx) => {
    printCheatSheet(ctx);
  },
});

export async function dispatch(input: string, ctx: CommandContext): Promise<boolean> {
  const [name, ...rest] = input.split(' ');
  const cmd = commands.find((c) => c.name === name);
  if (!cmd) {
    console.log(
      `  ${DIM}Unknown command: ${name}. Type /help for available commands.${RESET}`,
    );
    return true;
  }
  await cmd.execute(rest.join(' '), ctx);
  return true;
}