import { Extension, Prec } from "@codemirror/state";
import { CreateThemeOptions } from "@uiw/codemirror-themes";
import { createContext } from "react";
import {
  highlightSpace,
  highlightTab,
  highlightWidespace,
  linebreakTheme,
  whitespaceTheme,
  wideSpaceTheme,
} from "./features/codemirror/highlightInvisibles";

// codemirrorのリソース

// custom theme
// https://www.npmjs.com/package/@uiw/react-codemirror#using-custom-theme
export const editorOptions: CreateThemeOptions = {
  theme: "dark",
  settings: {
    caret: "#eeeeee",
    fontFamily: "Consolas",
  },
  styles: [],
};

export const EditorThemeContext = createContext<Extension>({ extension: [] });

export const commonExtensions = [
  // 空白文字を可視化する
  Prec.high(highlightTab()), // background-imageが隠れないように優先度を高くする
  highlightSpace(),
  highlightWidespace(),
  wideSpaceTheme,
  linebreakTheme,
  whitespaceTheme,
];

// 定数

export const MATCH_DELAY = 500;
export const MATCH_TIMEOUT = 300;
export const MATCHLIST_LIMIT = 1000;
export const REPLACE_DELAY = 100;
export const EXTRACT_DELAY = 100;

// テスト用データ

export const TESTREG_HUGE = /./dgm;
export const TESTINPUT_HUGE = Array(1000)
  .fill(null)
  .map(() => `1234567890`)
  .join("\n");

export const TESTREG_DANGER = /^(a|a)*$/dg;
export const TESTINPUT_DANGER = "aaaaaaaaaaaaaaaaaaaaaaaZ";

export const TESTREG = /"(\w+)": (".+"|\w+)/dg;
export const TESTINPUT = `{
  "people": [
    {
      "name": "John Doe",
      "age": 30,
      "address": "123 Main St, Anytown, USA"
    },
    {
      "name": "Jane Smith",
      "age": 28,
      "address": "456 Elm St, Othertown, USA"
    },
    {
      "name": "Bob Johnson",
      "age": 35,
      "address": "789 Oak St, Anotherplace, USA"
    }
  ]
}`;
