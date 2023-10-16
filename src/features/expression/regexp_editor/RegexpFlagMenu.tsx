import { useCallback } from "react";
import { Dropdown } from "react-bootstrap";
import ReactDOM from "react-dom";
import RegexpFlagMenuItem from "./RegexpFlagMenuItem";

const flagList = [
  {
    label: "ignore case (i)",
    value: "i",
    description: "大文字と小文字を区別しません。"
  },
  {
    label: "multiline (m)",
    value: "m",
    description: "^ と $ が各行の先頭と末尾にマッチします。"
  },
  {
    label: "dot all (s)",
    value: "s",
    description: ". が改行文字にマッチします。"
  },
  {
    label: "unicode (u)",
    value: "u",
    description: "ユニコードエスケープシーケンスを有効化します。"
  },
  {
    label: "has indices (d)",
    value: "d",
    description: "マッチ結果に開始・終了インデックスを含めます。",
    fixed: true, // dフラグはON固定。マッチインデックスはエディタのDecorationやスクロールに使用される。
  },
  {
    label: "global (g)",
    value: "g",
    description: "全てのマッチを検索します。"
  },
];

type Props = {
  flags: string;
  onChange?: (flags: string) => void;
}

export const RegexpFlagMenu = (({ flags, onChange }: Props) => {
  const selectedFlagList = flagList.filter(f => flags.includes(f.value));

  const handleSelect = useCallback((eventKey: string | null) => {
    if (eventKey) {
      const target = flagList[parseInt(eventKey)];
      const alreadyExists = selectedFlagList.includes(target);

      const newItems = alreadyExists
        ? selectedFlagList.filter(f => f !== target)
        : [...selectedFlagList, target];

      const newFlags = newItems
        .map(f => f.value)
        .sort()
        .join("");
      onChange?.(newFlags);
    }
  }, [onChange, selectedFlagList]);

  const selectedFlags = selectedFlagList
    .map(f => f.value)
    .sort()
    .join("");

  return (
    <Dropdown
      focusFirstItemOnShow
      autoClose="outside"
      onSelect={handleSelect}
    >
      <Dropdown.Toggle className="p-1 bg-secondary border-secondary">
        {selectedFlags}
      </Dropdown.Toggle>
      {ReactDOM.createPortal(
        <Dropdown.Menu style={{ maxWidth: "250px" }} role="menu">
          {flagList.filter(f => !f.fixed).map((f, i) =>
            <Dropdown.Item
              key={i}
              eventKey={i}
              style={{ whiteSpace: "normal" }}
            >
              <RegexpFlagMenuItem
                visible={selectedFlagList.includes(f)}
                label={f.label}
                description={f.description}
              />
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
        , document.body)
      }
    </Dropdown>
  );
});