/* eslint-disable testing-library/no-debugging-utils */
import { EditorView } from "@codemirror/view";
import { render, screen } from '@testing-library/react';
import CodeMirror from "@uiw/react-codemirror";
import { createRangeDecorator } from './createRangeDecorator';

describe("createRangeDecorator", () => {
  it("shows decorations", async () => {
    const highlighter = createRangeDecorator("test");
    const handleCreateEditor = (v: EditorView) => {
      v.dispatch({ effects: [highlighter.add.of([{ from: 6, to: 11 }])] });
    };

    render(<CodeMirror
      value="hello world !"
      extensions={[highlighter.extension]}
      onCreateEditor={handleCreateEditor}
    />);

    expect(await screen.findByText("world")).toHaveClass("test");
  });

  it("keep decorations when character inserted", async () => {
    const changeCallback = jest.fn();
    const highlighter = createRangeDecorator("test");
    let view: EditorView;
    const handleCreateEditor = (v: EditorView) => {
      v.dispatch({ effects: [highlighter.add.of([{ from: 6, to: 11 }])] });
      view = v;
    };

    render(<CodeMirror
      value="hello world !"
      extensions={[highlighter.extension]}
      onCreateEditor={handleCreateEditor}
      onChange={changeCallback}
    />);

    expect(await screen.findByText("world")).toHaveClass("test");

    view!.dispatch({ changes: { from: 0, insert: "A" } });
    expect(screen.getByText("world")).toHaveClass("test");
  });
});
