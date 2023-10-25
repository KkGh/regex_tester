import { ChangeEvent, memo, useCallback, useMemo, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { EXTRACT_DELAY, commonExtensions } from "../../constants";
import { convertEscapeSequence } from "../../functions/util";
import { useDebounce } from "../../hooks/useDebounce";
import { RegReadonlyCodeMirror } from "../codemirror/RegReadonlyCodeMirror";
import { Regex } from "../regex/Regex";

type Props = {
  initialPattern?: string;
  execArray: RegExpMatchArray[];
};

export const RegExtract = memo(
  ({ initialPattern = "[$&]\\n", execArray }: Props) => {
    const [pattern, setPattern] = useState(initialPattern);
    const debouncedPattern = useDebounce(pattern, EXTRACT_DELAY);
    const result = useMemo(() => {
      return Regex.extract(execArray, convertEscapeSequence(debouncedPattern));
    }, [execArray, debouncedPattern]);

    const patternChanged = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setPattern(event.target.value);
      },
      []
    );

    return (
      <section className="extract h-100">
        <div className="operation-container p-2">
          <InputGroup className=" mb-2">
            <Form.Control
              type="text"
              className="form-control-sm"
              value={pattern}
              onChange={patternChanged}
              placeholder="$1"
            />
          </InputGroup>

          <div className="overflow-y-auto">
            <RegReadonlyCodeMirror
              value={result}
              extensions={commonExtensions}
            />
          </div>
        </div>
      </section>
    );
  }
);
