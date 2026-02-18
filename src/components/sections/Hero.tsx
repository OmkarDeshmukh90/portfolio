/* ===========================================
   HERO SECTION - DRAMATIC LIGHT ORB DESIGN
   Pure CSS orb for seamless integration
   =========================================== */

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './Hero.module.css';

export function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={containerRef} className={styles.hero} id="hero">
            {/* Noise Texture Overlay */}
            <div className={styles.noiseOverlay} />

            {/* Background Hero Image */}
            <motion.div
                className={styles.heroImageWrapper}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
            >
                <video
                    src="/HeroText.mp4"
                    className={styles.heroImage}
                    autoPlay
                    loop
                    muted
                    playsInline
                />
            </motion.div>

            {/* Tagline - Moved for correct positioning */}
            <motion.p
                className={styles.tagline}
                style={{ opacity }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
            >
                Computer Engineering Student | AI & Supply Chain Optimization
            </motion.p>

            {/* Main Content Overlay */}
            <motion.div
                className={styles.heroContent}
                style={{ y, opacity }}
            >
                {/* Content has been moved out for custom positioning */}
            </motion.div>

            {/* Scroll Indicator - Bottom Setup */}
            <motion.div
                className={styles.scrollIndicator}
                style={{ opacity }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <span className={styles.scrollText}>Scroll</span>
                <motion.div
                    className={styles.scrollLine}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 1, delay: 2 }}
                />
            </motion.div>
        </section>
    );
}

export default Hero;
