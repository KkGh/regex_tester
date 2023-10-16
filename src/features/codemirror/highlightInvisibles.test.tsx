/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { EditorView } from "@codemirror/view";
import { screen, render } from '@testing-library/react';
import CodeMirror from "@uiw/react-codemirror";
import { highlightSpace, highlightTab, highlightWidespace } from "./highlightInvisibles";

describe("highlightInvisibles", () => {
  it("mark content by className", async () => {
    const { container } = render(<CodeMirror
      value="space tab	wide　!"
      extensions={[highlightSpace(), highlightTab(), highlightWidespace()]}
    />);

    expect(container.querySelector(".cm-highlightSpace")).toBeTruthy();
    expect(container.querySelector(".cm-highlightTab")).toBeTruthy();
    expect(container.querySelector(".cm-highlightWidespace")).toBeTruthy();
  });
});