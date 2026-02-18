/* ===========================================
   CUSTOM HOOK - useMousePosition
   =========================================== */

import { useState, useEffect, useCallback, useRef } from 'react';

interface MousePosition {
    x: number;
    y: number;
    normalizedX: number; // -1 to 1
    normalizedY: number; // -1 to 1
}

export function useMousePosition(): MousePosition {
    const [mousePosition, setMousePosition] = useState<MousePosition>({
        x: 0,
        y: 0,
        normalizedX: 0,
        normalizedY: 0,
    });

    const rafRef = useRef<number | null>(null);
    const positionRef = useRef({ x: 0, y: 0 });

    const updatePosition = useCallback(() => {
        const { x, y } = positionRef.current;
        const normalizedX = (x / window.innerWidth) * 2 - 1;
        const normalizedY = (y / window.innerHeight) * 2 - 1;

        setMousePosition({ x, y, normalizedX, normalizedY });
        rafRef.current = null;
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            positionRef.current = { x: e.clientX, y: e.clientY };

            if (!rafRef.current) {
                rafRef.current = requestAnimationFrame(updatePosition);
            }
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [updatePosition]);

    return mousePosition;
}

export default useMousePosition;
