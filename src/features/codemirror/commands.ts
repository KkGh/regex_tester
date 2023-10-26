import { indentLess, insertTab } from "@codemirror/commands";

export const insertTabCommand = {
  key: "Tab",
  run: insertTab,
  shift: indentLess,
  preventDefault: true,
};
