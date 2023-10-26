import { EditorView } from "@codemirror/view";
import { ChangeEvent, memo, useCallback, useMemo, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { REPLACE_DELAY, commonExtensions } from "../../constants";
import { convertEscapeSequence } from "../../functions/util";
import { useDebounce } from "../../hooks/useDebounce";
import { RegReadonlyCodeMirror } from "../codemirror/RegReadonlyCodeMirror";
import { Regex } from "../regex/Regex";

type Props = {
  initialPattern?: string;
  execArray: RegExpMatchArray[];
  text: string;
};

export const RegReplace = memo(
  ({ initialPattern = "$&", execArray, text }: Props) => {
    // console.log("RegReplace", execArray.length);
    const [pattern, setPattern] = useState(initialPattern);
    const debouncedPattern = useDebounce(pattern, REPLACE_DELAY);
    const result = useMemo(() => {
      const escaped = convertEscapeSequence(debouncedPattern);
      return Regex.replaceAllWithIndex(execArray, text, escaped);
    }, [debouncedPattern, execArray, text]);

    const replacePatternChanged = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setPattern(event.target.value);
      },
      []
    );

    const highlightRanges = result.replacements
      .filter((r) => r.newValue.length > 0)
      .map((r) => ({
        from: r.newIndex,
        to: r.newIndex + r.newValue.length,
      }));

    return (
      <section className="replace h-100">
        <div className="operation-container p-2">
          <InputGroup className="mb-2">
            <Form.Control
              type="text"
              className="form-control-sm"
              value={pattern}
              onChange={replacePatternChanged}
              placeholder="[$&]"
            />
          </InputGroup>

          <div className="overflow-y-auto">
            <RegReadonlyCodeMirror
              value={result.str}
              highlightRanges={highlightRanges}
              highlightClassName="cm-replaced"
              extensions={defaultExtensions.concat(commonExtensions)}
            />
          </div>
        </div>
      </section>
    );
  }
);

const defaultExtensions = [
  EditorView.theme({
    ".cm-replaced": { backgroundColor: "darkslategray" },
  }),
];
