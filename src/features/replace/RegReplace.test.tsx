import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RegReplace } from './RegReplace';

function setup(text: string, matches: RegExpMatchArray[], initPattern: string) {
  return render(
    <RegReplace
      text={text}
      execArray={matches}
      initialPattern={initPattern}
    />);
}

describe("RegReplace", () => {
  it("shows replaced text", async () => {
    const regexp = /\w+/g;
    const text = "apple,banana,orange";
    const matches = [...text.matchAll(regexp)];
    const initPattern = "($&)";
    setup(text, matches, initPattern);

    const [patternTextbox, outputTextbox] = screen.getAllByRole("textbox");
    expect(outputTextbox).toHaveTextContent("(apple),(banana),(orange)");

    fireEvent.change(patternTextbox, { target: { value: "#" } });
    await waitFor(() => expect(outputTextbox).toHaveTextContent("#,#,#"));
  });

  it("handle empty regexp", async () => {
    const regexp = new RegExp("(?:)", "g");
    const text = "abc";
    const matches = [...text.matchAll(regexp)];
    const initPattern = "#";
    setup(text, matches, initPattern);

    const [patternTextbox, outputTextbox] = screen.getAllByRole("textbox");
    expect(outputTextbox).toHaveTextContent("#a#b#c#");
  });

  it("highlights replaced text", async () => {
    const regexp = /\w+/g;
    const text = "abc,123";
    const matches = [...text.matchAll(regexp)];
    const initPattern = "[$&]";
    setup(text, matches, initPattern);

    const [patternTextbox, outputTextbox] = screen.getAllByRole("textbox");
    expect(outputTextbox).toHaveTextContent("[abc],[123]");

    await waitFor(() => expect(screen.getByText("[abc]")).toHaveClass("cm-replaced"));
    await waitFor(() => expect(screen.getByText("[123]")).toHaveClass("cm-replaced"));
  });
});

