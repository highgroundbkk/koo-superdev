import { OpenRouter } from '@openrouter/agent';
import { stepCountIs, maxCost } from '@openrouter/agent/stop-conditions';
import { tools } from './tools/index.js';
export async function runAgent(config, input, options) {
    const client = new OpenRouter({ apiKey: config.apiKey });
    const result = client.callModel({
        model: config.model,
        instructions: config.systemPrompt.replace('{cwd}', process.cwd()),
        input: input,
        tools,
        stopWhen: [stepCountIs(config.maxSteps), maxCost(config.maxCost)],
    });
    if (options?.onEvent) {
        const textByItem = new Map();
        const callNames = new Map();
        for await (const item of result.getItemsStream()) {
            if (options?.signal?.aborted)
                break;
            if (item.type === 'message') {
                const text = item.content
                    ?.filter((c) => 'text' in c)
                    .map((c) => c.text)
                    .join('') ?? '';
                const prev = textByItem.get(item.id) ?? 0;
                if (text.length > prev) {
                    options.onEvent({ type: 'text', delta: text.slice(prev) });
                    textByItem.set(item.id, text.length);
                }
            }
            else if (item.type === 'function_call') {
                callNames.set(item.callId, item.name);
                if (item.status === 'completed') {
                    const args = (() => {
                        try {
                            return item.arguments ? JSON.parse(item.arguments) : {};
                        }
                        catch {
                            return {};
                        }
                    })();
                    options.onEvent({ type: 'tool_call', name: item.name, callId: item.callId, args });
                }
            }
            else if (item.type === 'function_call_output') {
                const out = typeof item.output === 'string' ? item.output : JSON.stringify(item.output);
                options.onEvent({
                    type: 'tool_result',
                    name: callNames.get(item.callId) ?? 'unknown',
                    callId: item.callId,
                    output: out.length > 200 ? out.slice(0, 200) + '…' : out,
                });
            }
            else if (item.type === 'reasoning') {
                const text = item.summary?.map((s) => s.text).join('') ?? '';
                if (text)
                    options.onEvent({ type: 'reasoning', delta: text });
            }
        }
    }
    const response = await result.getResponse();
    return {
        text: response.outputText ?? '',
        usage: response.usage,
        output: response.output,
    };
}
export async function runAgentWithRetry(config, input, options) {
    for (let attempt = 0, max = options?.maxRetries ?? 3; attempt <= max; attempt++) {
        try {
            return await runAgent(config, input, options);
        }
        catch (err) {
            const s = err?.status ?? err?.statusCode;
            if (!(s === 429 || (s >= 500 && s < 600)) || attempt === max)
                throw err;
            await new Promise((r) => setTimeout(r, Math.min(1000 * 2 ** attempt, 30000)));
        }
    }
    throw new Error('Unreachable');
}
