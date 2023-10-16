import { renderHook, waitFor } from "@testing-library/react";
import { useDebounceCallback } from "./useDebounceCallback";

describe("useDebounceCallback", () => {
    it("should call last one", async () => {
        const { result } = renderHook(() => useDebounceCallback(100));
        const debounce = result.current;

        const array: number[] = [];
        for (let i = 0; i < 10; i++) {
            debounce(() => array.push(i));
        }

        await waitFor(() => {
            expect(array).toEqual([9]);
        });
    });
});