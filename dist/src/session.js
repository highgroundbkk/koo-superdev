import { appendFileSync, readFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';
export function initSessionDir(dir) {
    if (!existsSync(dir))
        mkdirSync(dir, { recursive: true });
}
export function saveMessage(sessionPath, message) {
    const entry = {
        timestamp: new Date().toISOString(),
        message,
    };
    appendFileSync(sessionPath, JSON.stringify(entry) + '\n');
}
export function loadSession(sessionPath) {
    if (!existsSync(sessionPath))
        return [];
    return readFileSync(sessionPath, 'utf-8')
        .split('\n')
        .filter(Boolean)
        .map((line) => {
        try {
            const entry = JSON.parse(line);
            return entry.message;
        }
        catch {
            return null;
        }
    })
        .filter((m) => m !== null);
}
export function listSessions(dir) {
    if (!existsSync(dir))
        return [];
    return readdirSync(dir)
        .filter((f) => f.endsWith('.jsonl'))
        .sort();
}
export function newSessionPath(dir) {
    const id = new Date().toISOString().replace(/[:.]/g, '-');
    return join(dir, `${id}.jsonl`);
}
