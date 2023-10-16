import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RegExtract } from './RegExtract';

function setup(matches: RegExpMatchArray[], initialPattern: string) {
  return render(
    <RegExtract
      execArray={matches}
      initialPattern={initialPattern}
    />);
}

describe("RegExtract", () => {
  it("shows matched text", async () => {
    const regexp = /\w+(\d\d)/g;
    const text = "apple11,banana,orange33";
    const matches = [...text.matchAll(regexp)];
    const initPattern = "$&_$1\n";
    setup(matches, initPattern);

    const [patternTextbox, outputTextbox] = screen.getAllByRole("textbox");
    expect(outputTextbox).toHaveTextContent("apple11_11orange33_33");

    fireEvent.change(patternTextbox, { target: { value: "#" } });
    await waitFor(() => expect(outputTextbox).toHaveTextContent("##"));
  });

  it("handle empty regexp", async () => {
    const regexp = new RegExp("(?:)", "g");
    const text = "apple";
    const matches = [...text.matchAll(regexp)];
    const initPattern = "$&";
    setup(matches, initPattern);

    const [patternTextbox, outputTextbox] = screen.getAllByRole("textbox");
    expect(outputTextbox).toHaveTextContent("");
  });
});

