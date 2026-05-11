import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
const DEFAULTS = {
    apiKey: '',
    model: 'anthropic/claude-sonnet-4',
    name: 'KOO SUPERDEV v1.0',
    systemPrompt: [
        'You are KOO SUPERDEV v1.0 — an elite coding agent built for maximum throughput.',
        'You have access to tools for reading, writing, editing, and searching files, and running shell commands.',
        '',
        'Current working directory: {cwd}',
        '',
        'Guidelines:',
        '- Use your tools aggressively and proactively. Explore the codebase to find answers instead of asking.',
        '- Keep working until the task is fully resolved before responding.',
        '- Do not guess or make up information — use your tools to verify.',
        '- Be concise and direct. No fluff.',
        '- Show file paths clearly when working with files.',
        '- Prefer grep and glob tools over shell commands for file search.',
        '- When editing code, make minimal targeted changes consistent with the existing style.',
        '- Ship fast. Bias toward action.',
    ].join('\n'),
    maxSteps: 30,
    maxCost: 2.0,
    sessionDir: '.sessions',
    showBanner: true,
    display: {
        toolDisplay: 'grouped',
        reasoning: false,
        inputStyle: 'block',
        loader: { text: 'KOO', style: 'spinner' },
    },
    slashCommands: true,
    loopMode: false,
    autoCompact: false,
    profiles: {
        'agent4.1': {
            name: 'KOO-AGENT4.1',
            model: 'anthropic/claude-sonnet-4',
        },
        'sharp': {
            name: 'KOO-SHARP',
            model: 'anthropic/claude-sonnet-4',
            systemPrompt: [
                'You are KOO-SHARP — concise, crisp, and implementation-first.',
                'Prefer smaller changes, minimal churn, and pragmatic fixes.',
                'Keep responses short and make the best command or code change quickly.',
                '',
                'Current working directory: {cwd}',
            ].join('\n'),
        },
        'builder': {
            name: 'KOO-BUILDER',
            model: 'anthropic/claude-sonnet-4',
            systemPrompt: [
                'You are KOO-BUILDER — slightly more expansive when the task benefits from it.',
                'Prefer robust solutions with clear verification and low-risk defaults.',
                '',
                'Current working directory: {cwd}',
            ].join('\n'),
        },
    },
};
export function loadConfig(overrides = {}, opts) {
    let config = { ...DEFAULTS };
    const configPath = resolve('agent.config.json');
    if (existsSync(configPath)) {
        const file = JSON.parse(readFileSync(configPath, 'utf-8'));
        if (file.display) {
            config.display = { ...config.display, ...file.display };
        }
        config = { ...config, ...file, display: config.display };
    }
    if (process.env.OPENROUTER_API_KEY)
        config.apiKey = process.env.OPENROUTER_API_KEY;
    if (process.env.AGENT_MODEL)
        config.model = process.env.AGENT_MODEL;
    if (process.env.AGENT_MAX_STEPS)
        config.maxSteps = Number(process.env.AGENT_MAX_STEPS);
    if (process.env.AGENT_MAX_COST)
        config.maxCost = Number(process.env.AGENT_MAX_COST);
    if (config.profiles === undefined)
        config.profiles = DEFAULTS.profiles;
    if (config.loopMode === undefined)
        config.loopMode = DEFAULTS.loopMode;
    if (config.autoCompact === undefined)
        config.autoCompact = DEFAULTS.autoCompact;
    if (overrides.display) {
        config.display = { ...config.display, ...overrides.display };
    }
    config = { ...config, ...overrides, display: config.display };
    if (!config.apiKey && !opts?.skipApiKey)
        throw new Error('OPENROUTER_API_KEY is required.');
    return config;
}
