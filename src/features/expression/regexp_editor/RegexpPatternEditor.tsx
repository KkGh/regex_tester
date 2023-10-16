
import { EditorState, Extension } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import CodeMirror, { minimalSetup } from "@uiw/react-codemirror";
import { memo } from "react";
import { regexp } from "../../codemirror/lang-regexp";

const defaultExtensions = [
  minimalSetup(),
  // single line モード
  EditorState.transactionFilter.of(tr => tr.newDoc.lines > 1 ? [] : tr),
  // 横スクロールバーを非表示にする
  EditorView.theme({
    ".cm-scroller": { "overflow-x": "hidden" },
  }),
  regexp(),
];

type Props = {
  value: string;
  theme?: Extension | "light" | "dark" | "none";
  extensions?: Extension[];
  onChange: (value: string) => void;
  className?: string;
};

export const RegexpPatternEditor = memo((props: Props) => {
  const { value, theme, extensions = [], onChange, className = "" } = props;
  // console.log("RegexpPatternEditor");

  return (
    <CodeMirror
      className={className}
      value={value}
      theme={theme}
      extensions={defaultExtensions.concat(extensions)}
      basicSetup={false}
      indentWithTab={false}
      onChange={onChange}
    />
  );
});