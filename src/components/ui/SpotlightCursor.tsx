/* ===========================================
   GLOBAL AESTHETICS - SPOTLIGHT CURSOR
   =========================================== */

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useEffect } from 'react';
import styles from './SpotlightCursor.module.css';

export function SpotlightCursor() {
    const mouseX = useMotionValue(-100); // Start off-screen
    const mouseY = useMotionValue(-100);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Increased opacity for "brighter" effect (0.03 -> 0.15)
    // Fixed position relative to viewport
    const background = useMotionTemplate`
        radial-gradient(
            400px circle at ${mouseX}px ${mouseY}px,
            rgba(255, 255, 255, 0.15),
            transparent 80%
        )
    `;

    return (
        <motion.div
            className={styles.spotlight}
            style={{ background }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        />
    );
}

export default SpotlightCursor;
