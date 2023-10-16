import { Extension } from "@codemirror/state";
import { memo, useCallback, useState } from "react";
import { InputGroup } from "react-bootstrap";
import { RegexpFlagMenu } from "./RegexpFlagMenu";
import { RegexpPatternEditor } from "./RegexpPatternEditor";
import { Regex } from "../../regex/Regex";

type Props = {
  // RegExpのパターンとフラグ文字列を別々にpropsで受け取る。
  // RegExpオブジェクトで受け取ってしまうと、パターンが空文字の場合に regexp.source === "(?:)" になってしまう。
  value: { pattern: string, flags: string };
  // pattern, flagsは親で管理しているステート。バリデーションチェックで更新を遮らないように注意。
  onChange?: (regexp: RegExp | null, pattern: string, flags: string) => void;
  extensions?: Extension[];
  theme?: Extension | "light" | "dark" | "none";
};

export const RegexpEditor = memo(({ value, onChange, extensions, theme }: Props) => {
  const { pattern, flags } = value;
  
  const [errorMessage, setErrorMessage] = useState("");
  // console.log("RegexpEditor", pattern, flags);

  const handleRegexpChange = useCallback((pattern: string, flags: string) => {
    try {
      const r = new RegExp(pattern, flags);
      setErrorMessage("");
      onChange?.(r, pattern, flags);
    } catch (error) {
      if (error instanceof SyntaxError) {
        const reason = Regex.getRegExpSyntaxErrorReason(error.message);
        setErrorMessage(reason);
        onChange?.(null, pattern, flags);
      }
      else {
        throw error;
      }
    }
  }, [onChange]);

  const handlePatternChange = useCallback((pattern: string) => {
    handleRegexpChange(pattern, flags);
  }, [handleRegexpChange, flags]);

  const handleFlagsChange = useCallback((flags: string) => {
    handleRegexpChange(pattern, flags);
  }, [handleRegexpChange, pattern]);

  return (
    <div>
      <InputGroup className="mb-2">
        <InputGroup.Text>/</InputGroup.Text>
        <span className="form-control">
          <RegexpPatternEditor
            value={pattern}
            onChange={handlePatternChange}
            theme={theme}
            extensions={extensions}
          />
        </span>
        <InputGroup.Text>/</InputGroup.Text>

        <RegexpFlagMenu
          flags={flags}
          onChange={handleFlagsChange}
        />
      </InputGroup>

      <div>
        <span className="text-danger">{" " + errorMessage}</span>
      </div>
    </div>
  );
});