import { useCallback, useRef } from "react";

type Debounce = (fn: () => void) => void;

export const useDebounceCallback = (delay = 100): Debounce => {
    const timer = useRef<number | null>(null);
    const debounce: Debounce = useCallback(
        (fn) => {
            if (timer.current) {
                window.clearTimeout(timer.current);
            }
            timer.current = window.setTimeout(fn, delay);
        }, [delay]);
    return debounce;
}

