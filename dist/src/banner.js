const R = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';
function rgb(r, g, b) {
    return `\x1b[38;2;${r};${g};${b}m`;
}
function vLen(s) {
    return s.replace(/\x1b\[[0-9;]*m/g, '').length;
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function rainbow(text, bold = false) {
    const stops = [
        [255, 64, 64],
        [255, 160, 0],
        [245, 235, 0],
        [60, 225, 95],
        [0, 220, 255],
        [70, 100, 255],
        [170, 55, 255],
        [255, 55, 205],
    ];
    let out = '';
    for (let i = 0; i < text.length; i++) {
        const t = (i / Math.max(text.length - 1, 1)) * (stops.length - 1);
        const idx = Math.min(Math.floor(t), stops.length - 2);
        const mix = t - idx;
        const a = stops[idx];
        const b = stops[idx + 1];
        const r = Math.round(a[0] + (b[0] - a[0]) * mix);
        const g = Math.round(a[1] + (b[1] - a[1]) * mix);
        const bl = Math.round(a[2] + (b[2] - a[2]) * mix);
        out += rgb(r, g, bl) + (bold ? BOLD : '') + text[i] + R;
    }
    return out;
}
function gradient(text, from, to, bold = false) {
    let out = '';
    for (let i = 0; i < text.length; i++) {
        const t = text.length > 1 ? i / (text.length - 1) : 0;
        const r = Math.round(from[0] + (to[0] - from[0]) * t);
        const g = Math.round(from[1] + (to[1] - from[1]) * t);
        const b = Math.round(from[2] + (to[2] - from[2]) * t);
        out += rgb(r, g, b) + (bold ? BOLD : '') + text[i] + R;
    }
    return out;
}
const W = 54;
const LOGO = [
    '  ██╗  ██╗  ██████╗   ██████╗  ',
    '  ██║ ██╔╝ ██╔═══██╗ ██╔═══██╗ ',
    '  █████╔╝  ██║   ██║ ██║   ██║ ',
    '  ██╔═██╗  ██║   ██║ ██║   ██║ ',
    '  ██║  ██╗ ╚██████╔╝ ╚██████╔╝ ',
    '  ╚═╝  ╚═╝  ╚═════╝   ╚═════╝  ',
];
function box(inner, border) {
    const pad = Math.max(0, W - vLen(inner));
    return border + '│' + R + inner + ' '.repeat(pad) + border + '│' + R;
}
function frameTop(border) {
    return border + '╭' + '─'.repeat(W) + '╮' + R;
}
function frameMid(border) {
    return border + '├' + '─'.repeat(W) + '┤' + R;
}
function frameBot(border) {
    return border + '╰' + '─'.repeat(W) + '╯' + R;
}
function pixelLine(offset, width = W) {
    const glyphs = ['·', '•', '◦', '▪', '▫'];
    const palette = [
        [0, 220, 255],
        [80, 140, 255],
        [170, 80, 255],
        [255, 60, 190],
        [255, 120, 40],
    ];
    let out = '';
    for (let i = 0; i < width; i++) {
        const p = (i + offset) % 10;
        if (p < 4) {
            const c = palette[(i + offset) % palette.length];
            const glyph = glyphs[(i + offset) % glyphs.length];
            out += rgb(c[0], c[1], c[2]) + BOLD + glyph + R;
        }
        else if (p === 4 || p === 5) {
            const t = i / Math.max(width - 1, 1);
            const r = Math.round(255 - 160 * t);
            const g = Math.round(80 + 160 * t);
            const b = Math.round(255 - 90 * t);
            out += rgb(r, g, b) + '·' + R;
        }
        else {
            out += DIM + '·' + R;
        }
    }
    return out;
}
function center(text, width) {
    const left = Math.max(0, Math.floor((width - vLen(text)) / 2));
    return ' '.repeat(left) + text;
}
export async function printBanner(model) {
    const border = rgb(78, 66, 140);
    const rows = [];
    const title = center(gradient('KOO-AGENT4.1', [255, 70, 60], [70, 120, 255], true), W);
    const version = center(DIM + 'v1.0' + R, W);
    const tagline = center(rainbow('build faster. feel sharper. ship better.', false), W);
    const headerGlow = box(pixelLine(0), border);
    const footerGlow = box(pixelLine(6), border);
    rows.push('');
    rows.push(frameTop(border));
    rows.push(headerGlow);
    rows.push(box(pixelLine(3), border));
    rows.push(box(center(gradient(LOGO[0].trim(), [0, 220, 255], [190, 60, 255], true), W), border));
    rows.push(box(center(gradient(LOGO[1].trim(), [0, 205, 255], [170, 80, 255], true), W), border));
    rows.push(box(center(gradient(LOGO[2].trim(), [0, 190, 255], [150, 100, 255], true), W), border));
    rows.push(box(center(gradient(LOGO[3].trim(), [0, 175, 255], [180, 70, 255], true), W), border));
    rows.push(box(center(gradient(LOGO[4].trim(), [0, 160, 255], [200, 50, 255], true), W), border));
    rows.push(box(center(gradient(LOGO[5].trim(), [0, 145, 255], [220, 30, 220], true), W), border));
    rows.push(box('', border));
    rows.push(frameMid(border));
    rows.push(box('', border));
    rows.push(box(title, border));
    rows.push(box(version, border));
    rows.push(box(tagline, border));
    rows.push(box('', border));
    rows.push(frameMid(border));
    rows.push(box('', border));
    rows.push(box(gradient('› koo agent4.1  Default clone', [0, 255, 170], [0, 180, 255], true), border));
    rows.push(box(gradient('› koo sharp     Minimal clone', [0, 180, 255], [170, 80, 255], true), border));
    rows.push(box(gradient('› koo builder   Balanced clone', [170, 80, 255], [255, 70, 190], true), border));
    rows.push(box(gradient('› koo tui       Terminal UI mode', [70, 210, 255], [120, 90, 255], true), border));
    rows.push(box(gradient('› koo cli       CLI mode', [255, 140, 90], [255, 70, 190], true), border));
    rows.push(box('', border));
    rows.push(frameMid(border));
    rows.push(box('', border));
    rows.push(box(center(DIM + 'model  ' + R + gradient(model, [90, 255, 220], [170, 90, 255], true), W), border));
    rows.push(footerGlow);
    rows.push(frameBot(border));
    process.stdout.write('\x1b[?25l');
    for (const row of rows) {
        process.stdout.write(row + '\n');
        await sleep(34);
    }
    process.stdout.write('\x1b[?25h');
}
