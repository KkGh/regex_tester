import { render, screen } from '@testing-library/react';
import { MainContent } from './MainContent';

describe("App", () => {
    it("render", async () => {
        // jestではcreateObjectURLが使用できないためモックを用意する
        global.URL.createObjectURL = jest.fn();
        render(<MainContent initialReg={/.+/dg} initialText='asdf' />);
        expect(await screen.findByText("Expression:")).toBeInTheDocument();
    });
});