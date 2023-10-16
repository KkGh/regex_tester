import { searchKeymap } from "@codemirror/search";
import { Extension } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import createTheme from "@uiw/codemirror-themes";
import CodeMirror from "@uiw/react-codemirror";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { editorOptions } from "../../constants";
import { HighlightRange, createRangeDecorator } from "./createRangeDecorator";

// Replace, Extractの出力用CodeMirrorコンポーネント

const theme = createTheme({
  ...editorOptions,
  settings: {
    ...editorOptions.settings,
    background: "#272b30"
  }
});

const defaultExtensions = [
  EditorView.lineWrapping,
  keymap.of(searchKeymap),
];

type Props = {
  value: string;
  highlightClassName?: string;
  highlightRanges?: HighlightRange[];
  extensions?: Extension[];
};

export const RegReadonlyCodeMirror = memo((props: Props) => {
  const { value, highlightClassName = "", highlightRanges = [], extensions = [] } = props;
  const [view, setView] = useState<EditorView>();
  const highlighter = useMemo(() => createRangeDecorator(highlightClassName), [highlightClassName]);

  useEffect(() => {
    if (view && highlightRanges.length > 0) {
      view.dispatch({
        effects: [
          highlighter.clear.of(null),
          highlighter.add.of(highlightRanges)
        ]
      });
    }
  }, [highlightRanges, highlighter.add, highlighter.clear, view]);

  const handleCreateEditor = useCallback((view: EditorView) => {
    // コンポーネントがマウントされた時点では EditorView.state === undefined なため、
    //  useEffect()でなく onCreateEditor コールバックでviewを取得する。
    setView(view);
  }, []);

  return (
    <CodeMirror
      readOnly
      value={value}
      theme={theme}
      extensions={defaultExtensions.concat(extensions).concat(highlighter.extension)}
      basicSetup={false}
      onCreateEditor={handleCreateEditor}
    />
  );
});