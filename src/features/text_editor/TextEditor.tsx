import { Extension, Prec } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import CodeMirror from "@uiw/react-codemirror";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { bgEmphasis, bgGroup, bgMatch } from "../../theme";
import { insertTabCommand } from "../codemirror/commands";
import { createRangeDecorator } from "../codemirror/createRangeDecorator";
import { Match } from "../regex/Regex";
import { Range } from "../shared/Range";

// 汎用クラスっぽくしたいがアプリ特有の機能が多い、要検討

// ハイライト用のViewPluginをCSS classごとに作成
// TODO:リファクタリング
const matchHighlighter = createRangeDecorator("cm-highlight-match");
const groupHighlighter = createRangeDecorator("cm-highlight-group");
const emphaHighlighter = createRangeDecorator("cm-highlight-emphasis");

// codemirrorの拡張機能。先頭のExtensionが優先される。
const defaultExtensions = [
  EditorView.lineWrapping,

  // キーバインディング
  // デフォルトの indentWithTab を上書きするため、insertTabを最優先にする。
  Prec.highest(keymap.of([insertTabCommand])),

  // ハイライト用のViewPlugin、優先順位は emphasis > group > match の順。
  emphaHighlighter.extension,
  groupHighlighter.extension,
  matchHighlighter.extension,

  EditorView.theme({
    ".cm-highlight-match": { backgroundColor: bgMatch },
    ".cm-highlight-group": { backgroundColor: bgGroup },
    ".cm-highlight-emphasis": { backgroundColor: bgEmphasis },
  }),
];

type Props = {
  value: string;
  matchList: Match[];
  emphasis?: Range;
  onChange: (value: string) => void;
  theme?: Extension | "light" | "dark" | "none";
  extensions?: Extension[];
};

export type EditorRef = {
  scrollToPos: (pos: number) => void;
};

export const TextEditor = forwardRef<EditorRef, Props>((props, ref) => {
  const {
    value,
    matchList,
    emphasis,
    onChange,
    theme,
    extensions = [],
  } = props;
  const [view, setView] = useState<EditorView>();

  // 親コンポーネントに関数を公開する
  useImperativeHandle(
    ref,
    () => ({
      scrollToPos: (pos) => {
        if (view) {
          view.dispatch({ effects: EditorView.scrollIntoView(pos) });
        }
      },
    }),
    [view]
  );

  useEffect(() => {
    if (view) {
      highlightMatchList(view, matchList);
    }
  }, [matchList, view]);

  useEffect(() => {
    if (view) {
      highlightEmphasis(view, emphasis);
    }
  }, [emphasis, view]);

  const handleCreateEditor = useCallback((view: EditorView) => {
    // コンポーネントがマウントされた時点では EditorView.state === undefined なため、
    //  useEffect でなく onCreateEditor コールバックで view を取得する。
    setView(view);
  }, []);

  return (
    <CodeMirror
      className="h-100" // .cm-theme要素のclass属性
      height="100%" // .cm-editor要素のcss heightプロパティ
      value={value}
      theme={theme}
      extensions={defaultExtensions.concat(extensions)}
      basicSetup={{
        // デフォルトでは全てのオプションがtrue
        highlightActiveLineGutter: false,
        highlightActiveLine: false,
        highlightSelectionMatches: false, // テキスト選択時に同じ文字列をハイライト表示するか
        drawSelection: false, // 選択範囲の行全体をハイライト表示するか
        indentOnInput: false, // 改行時に自動でインデントするか
      }}
      onChange={onChange}
      onCreateEditor={handleCreateEditor}
    />
  );
});

function highlightEmphasis(view: EditorView, emphasis?: Range) {
  view.dispatch({ effects: [emphaHighlighter.clear.of(null)] });

  if (emphasis && emphasis.start !== emphasis.end) {
    const emphasisRange = {
      from: emphasis.start,
      to: emphasis.end,
    };
    view.dispatch({ effects: [emphaHighlighter.add.of([emphasisRange])] });
  }
}

function highlightMatchList(view: EditorView, matchList: Match[]) {
  // 空文字を除く
  const validMatches = matchList.filter((m) => m.start !== m.end);
  // Match
  const matchRanges = validMatches.map((m) => ({
    from: m.start,
    to: m.end,
  }));

  // Group
  const groupRanges = validMatches
    .flatMap((m) => m.groups)
    .filter((g) => g.start !== g.end)
    .map((g) => ({
      from: g.start,
      to: g.end,
    }));

  view.dispatch({
    effects: [
      matchHighlighter.clear.of(null),
      matchHighlighter.add.of(matchRanges),
      groupHighlighter.clear.of(null),
      groupHighlighter.add.of(groupRanges),
    ],
  });
}
