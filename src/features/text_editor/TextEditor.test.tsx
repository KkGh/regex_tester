import { render, screen, waitFor } from "@testing-library/react";
import { Match, Regex } from "../regex/Regex";
import { TextEditor } from "./TextEditor";
import { Range } from "../shared/Range";

function setup(
  text: string,
  callBackMock: jest.Mock<any, any>,
  matchlist: Match[],
  emphasis?: Range
) {
  return render(
    <TextEditor
      value={text}
      onChange={callBackMock}
      matchList={matchlist}
      emphasis={emphasis}
    />
  );
}

describe("TextEditor", () => {
  it("shows text", () => {
    const callBackMock = jest.fn();
    setup("asdf", callBackMock, []);
    expect(screen.getByText("asdf")).toBeInTheDocument();
  });

  it("highlights matches", async () => {
    const callBackMock = jest.fn();
    const text = "apple,banana,orange";
    const matchlist = Regex.matches(/\w+/dg, text);

    setup(text, callBackMock, matchlist);

    await waitFor(() =>
      expect(screen.getByText("apple")).toHaveClass("cm-highlight-match")
    );
    await waitFor(() =>
      expect(screen.getByText("banana")).toHaveClass("cm-highlight-match")
    );
    await waitFor(() =>
      expect(screen.getByText("orange")).toHaveClass("cm-highlight-match")
    );
  });

  it("highlights groups", async () => {
    const callBackMock = jest.fn();
    const text = "<div class>_<span style>";
    const matchlist = Regex.matches(/<(.+?) (.+?)>/dg, text);

    setup(text, callBackMock, matchlist);

    await waitFor(() =>
      expect(screen.getByText("div")).toHaveClass("cm-highlight-group")
    );
    await waitFor(() =>
      expect(screen.getByText("class")).toHaveClass("cm-highlight-group")
    );
    await waitFor(() =>
      expect(screen.getByText("span")).toHaveClass("cm-highlight-group")
    );
    await waitFor(() =>
      expect(screen.getByText("style")).toHaveClass("cm-highlight-group")
    );
  });

  it("highlights an emphasis", async () => {
    const callBackMock = jest.fn();
    const text = "apple,banana,orange";
    const matchlist = Regex.matches(/banana/dg, text);
    const target = {
      ...matchlist[0],
      index: matchlist[0].matchIndex,
      isMatch: true,
    };

    const { rerender } = setup(text, callBackMock, matchlist, target);

    await waitFor(() =>
      expect(screen.getByText("banana")).toHaveClass("cm-highlight-emphasis")
    );

    rerender(
      <TextEditor value={text} onChange={callBackMock} matchList={matchlist} />
    );

    await waitFor(() =>
      expect(screen.getByText("banana")).not.toHaveClass(
        "cm-highlight-emphasis"
      )
    );
  });
});
