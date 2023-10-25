import { render, screen } from "@testing-library/react";
import { PreText } from "./PreText";

describe("PreText", () => {
  it("shows whitespaces", () => {
    render(<PreText text={"this is tab.\t\n."} />);

    const pt = screen.getByTestId("pretext");
    expect(pt).toBeInTheDocument();
    expect(pt).toHaveTextContent("this is tab");
    expect(pt).not.toHaveTextContent("\t");
    expect(pt).not.toHaveTextContent("\n");
  });

  it("shows fallback message", () => {
    render(<PreText text={""} />);

    expect(screen.getByText("(empty)")).toBeInTheDocument();
  });
});
