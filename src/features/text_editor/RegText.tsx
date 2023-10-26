import createTheme from "@uiw/codemirror-themes";
import { memo } from "react";
import { Spaced } from "../../components/Spaced";
import { commonExtensions, editorOptions } from "../../constants";
import { Match } from "../regex/Regex";
import { Panel } from "../shared/Panel";
import { Range } from "../shared/Range";
import { EditorRef, TextEditor } from "./TextEditor";

const editorTheme = createTheme(editorOptions);

type Props = {
  value: string;
  matchList: Match[];
  emphasis?: Range;
  onChange: (value: string) => void;
  editorRef: React.RefObject<EditorRef>;
};

export const RegText = memo(({ editorRef, matchList, ...rest }: Props) => {
  return (
    <section className="input h-100">
      <Panel
        label={
          <Spaced
            left="Text:"
            right={<small>{matchList.length} matches</small>}
          />
        }
        content={
          <TextEditor
            ref={editorRef}
            theme={editorTheme}
            extensions={commonExtensions}
            matchList={matchList}
            {...rest}
          />
        }
      />
    </section>
  );
});
