import React, { memo } from "react";
import { commonExtensions, editorOptions, } from "../../constants";
import { RegexpEditor } from "./regexp_editor/RegexpEditor";
import { Panel } from "../shared/Panel";
import { Spaced } from "../../components/Spaced";
import createTheme from "@uiw/codemirror-themes";

const editorExpressionTheme = createTheme(editorOptions);

type Props = {
  value: { pattern: string, flags: string };
  onChange?: (regex: RegExp | null, pattern: string, flags: string) => void;
  tools: React.ReactElement[];
};

export const RegExpression = memo(({ value, onChange, tools }: Props) => {

  return (
    <section className="pattern">
      <Panel
        label={
          <Spaced
            left="Expression:"
            right={
              <div className="d-flex gap-2">
                {tools.map((t, i) => <div key={i}>{t}</div>)}
              </div>
            }
          />
        }
        content={
          <div className="pattern-conainter p-2">
            <RegexpEditor
              value={value}
              onChange={onChange}
              theme={editorExpressionTheme}
              extensions={commonExtensions}
            />
          </div>
        }
      />
    </section>
  );
});