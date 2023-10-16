import { fireEvent } from "@testing-library/react";

export function clickCheckbox(element: HTMLInputElement, newChecked: boolean) {
    fireEvent.click(element);
    fireEvent.change(element, { target: { checked: newChecked } });
}