import { Decoration, EditorView, MatchDecorator, ViewPlugin } from "@codemirror/view";

const defaultInvisibleCharColors = "#888";

// from @codemirror/view
function matcher(decorator: MatchDecorator) {
    return ViewPlugin.define(view => ({
        decorations: decorator.createDeco(view),
        update(u) {
            this.decorations = decorator.updateDeco(u, this.decorations);
        },
    }), {
        decorations: v => v.decorations
    });
}

// 全角スペース
const widespaceHighlighter = matcher(new MatchDecorator({
    regexp: /　/g,
    decoration: Decoration.mark({
        class: "cm-highlightWidespace"
    }),
    boundary: /\S/,
}));
export const highlightWidespace = () => widespaceHighlighter;
export const wideSpaceTheme = EditorView.theme({
    ".cm-highlightWidespace::before": {
        content: "'\\25A2'",
        color: defaultInvisibleCharColors,
        position: "absolute",
        pointerEvents: "none",
    },
});

// 組み込みの whitespaceHighlighter はタブと連続スペースがまとめられているため、
// 分けたものを用意する。
// CSSスタイルは組み込みのものを使用する。

// タブ文字
const tabHighlighter = matcher(new MatchDecorator({
    regexp: /\t/g,
    decoration: Decoration.mark({
        class: "cm-highlightTab"
    }),
    boundary: /\S/,
}));
export const highlightTab = () => tabHighlighter;

// 半角スペース。疑似要素のcontentが長い文字列を持っているとレイアウトがおかしくなるため、
// 1つのスペースを1つのspanでラップする。
const spaceHighlighter = matcher(new MatchDecorator({
    regexp: / /g,
    decoration: Decoration.mark({
        class: "cm-highlightSpace"
    }),
    boundary: /\S/,
}));
export const highlightSpace = () => spaceHighlighter;
export const whitespaceTheme = EditorView.theme({   // colorのみ変更する
    ".cm-highlightSpace::before": {
        color: defaultInvisibleCharColors,
        content: "'·'",
    }
});

// 最終行以外の行末に改行文字を表示する。
export const linebreakTheme = EditorView.theme({
    // 空行の場合
    ".cm-line:not(:last-child):has(br)": {
        position: "relative",
    },
    ".cm-line:not(:last-child):has(br)::after": {
        content: "'\\21B5'",
        color: defaultInvisibleCharColors,
        position: "absolute",
        top: "0px",
        pointerEvents: "none"
    },
    // 通常の行の場合
    ".cm-line:not(:last-child):not(:has(br))::after": {
        content: "'\\21B5'",
        color: defaultInvisibleCharColors,
        pointerEvents: "none"
    },
});