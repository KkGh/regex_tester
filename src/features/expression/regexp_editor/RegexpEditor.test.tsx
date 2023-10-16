/* eslint-disable testing-library/no-unnecessary-act */
// HACK: suppress act warning
// https://github.com/orgs/react-hook-form/discussions/4232

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RegexpEditor } from './RegexpEditor';


function setup(regexp: RegExp, changeMock = jest.fn()) {
  return render(
    <RegexpEditor
      value={{ pattern: regexp.source, flags: regexp.flags }}
      onChange={changeMock}
    />
  );
}

describe("RegPatternEditor", () => {
  beforeEach(() => {
    // 内部エラーメッセージを非表示にする
    //   TypeError: Cannot read properties of undefined (reading 'length') at textCoords
    jest.spyOn(console, "error").mockImplementation(() => { });
  })

  it("can change the pattern and flags by props", async () => {
    const { rerender } = setup(/a/gd);

    expect(await screen.findByText("a")).toBeInTheDocument();
    expect(await screen.findByText("dg")).toBeInTheDocument();

    rerender(<RegexpEditor
      value={{ pattern: "abc", flags: "gdm" }}
    />);

    expect(await screen.findByText("abc")).toBeInTheDocument();
    expect(await screen.findByText("dgm")).toBeInTheDocument();
  });

  it("fires onChange on flag menu item clicked", async () => {
    const mock = jest.fn();
    setup(/a/gd, mock);

    fireEvent.click(await screen.findByText("dg"));
    fireEvent.click(await screen.findByText(/multiline/));

    await new Promise(process.nextTick);
    expect(mock).toBeCalledWith(/a/dgm, "a", "dgm");
  });

  it("fires onChange on empty pattern", async () => {
    const mock = jest.fn();
    setup(/a/gd, mock);

    const cm = await screen.findByRole("textbox");
    userEvent.click(cm);
    userEvent.keyboard("{del}");
    await waitFor(() => {
      expect(cm.textContent).toBe("");
    });

    await new Promise(process.nextTick);
    expect(mock).toBeCalledWith(/(?:)/dg, "", "dg");
  });

  it("shows error message on invalid pattern", async () => {
    const mock = jest.fn();
    setup(/a/gd, mock);

    const cm = await screen.findByRole("textbox");
    userEvent.click(cm);
    userEvent.keyboard("(");
    await waitFor(async () => {
      expect(cm.textContent).toBe("(a");
    });

    await new Promise(process.nextTick);
    expect(await screen.findByText("Unterminated group")).toBeInTheDocument();
    expect(mock).toBeCalledWith(null, "(a", "dg");
  });

  it("shows error message on invalid unicode", async () => {
    const mock = jest.fn();
    setup(/\u{h}/gd, mock);

    fireEvent.click(await screen.findByText("dg"));
    fireEvent.click(await screen.findByText(/unicode/));

    expect(await screen.findByText("Invalid Unicode escape")).toBeInTheDocument();
    await new Promise(process.nextTick);
    expect(mock).toBeCalledWith(null, "\\u{h}", "dgu");
  });
});