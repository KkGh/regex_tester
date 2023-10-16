import { fireEvent, render, screen } from "@testing-library/react";
import { RegexpFlagMenu } from "./RegexpFlagMenu";

describe("RegexpFlagsMenu", () => {
    it("shows regexp flags", async () => {
        const callback = jest.fn();
        render(<RegexpFlagMenu flags="i" onChange={callback} />);
        fireEvent.click(screen.getByRole("button"));

        expect(await screen.findByText(/ignore case/)).toBeInTheDocument();
    });

    it("fire onChange on click", async () => {
        const callback = jest.fn();
        render(<RegexpFlagMenu flags="i" onChange={callback} />);
        fireEvent.click(screen.getByRole("button"));

        fireEvent.click(await screen.findByText(/multiline/));
        expect(callback).toBeCalled();
    });
});