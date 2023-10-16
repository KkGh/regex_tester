import { act, renderHook } from '@testing-library/react';
import { useReducer } from 'react';
import { hoverItemReducer } from './hoverItemReducer';

describe("hoveritemReducer", () => {
    it("has currently hovering range", async () => {
        const { result } = renderHook(() => {
            return useReducer(hoverItemReducer, {});
        });
        const dispatch = result.current[1];

        expect(result.current[0]).toEqual({ item: undefined });

        act(() => {
            dispatch({ type: 'enter', newItem: { start: 4, end: 7 } });
        });

        expect(result.current[0]).toEqual({ item: { start: 4, end: 7 } });

        act(() => {
            dispatch({ type: 'leave' });
        });

        expect(result.current[0]).toEqual({ item: undefined });
    });
});