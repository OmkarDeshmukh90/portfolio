/* ===========================================
   CUSTOM HOOK - useScrollProgress
   =========================================== */

import { useScroll, useTransform, MotionValue } from 'framer-motion';
import type { RefObject } from 'react';

interface ScrollProgressOptions {
    target?: RefObject<HTMLElement | null>;
    offset?: [string, string];
}

interface ScrollProgressReturn {
    scrollY: MotionValue<number>;
    scrollYProgress: MotionValue<number>;
    scrollX: MotionValue<number>;
    scrollXProgress: MotionValue<number>;
    // Utility transforms
    opacity: MotionValue<number>;
    scale: MotionValue<number>;
    y: MotionValue<number>;
}

export function useScrollProgress(
    options: ScrollProgressOptions = {}
): ScrollProgressReturn {
    const { target, offset = ['start end', 'end start'] } = options;

    const { scrollY, scrollYProgress, scrollX, scrollXProgress } = useScroll(
        target
            ? {
                target,
                offset: offset as ["start end", "end start"],
            }
            : undefined
    );

    // Common transforms based on scroll progress
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return {
        scrollY,
        scrollYProgress,
        scrollX,
        scrollXProgress,
        opacity,
        scale,
        y,
    };
}

export default useScrollProgress;
