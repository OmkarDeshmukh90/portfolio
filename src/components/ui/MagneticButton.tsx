/* ===========================================
   MAGNETIC BUTTON COMPONENT
   =========================================== */

import { useRef, useState, type ReactNode, type CSSProperties } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './MagneticButton.module.css';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    strength?: number;
    onClick?: () => void;
    href?: string;
    as?: 'button' | 'a';
}

export function MagneticButton({
    children,
    className = '',
    style,
    strength = 0.3,
    onClick,
    href,
    as = 'button',
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        x.set(distanceX * strength);
        y.set(distanceY * strength);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const Component = motion[as];

    return (
        <Component
            ref={ref}
            className={`${styles.magneticButton} ${className}`}
            style={{
                ...style,
                x: springX,
                y: springY,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            onClick={onClick}
            href={as === 'a' ? href : undefined}
            whileTap={{ scale: 0.95 }}
            data-hovered={isHovered}
        >
            <span className={styles.content}>{children}</span>
            <span className={styles.glow} />
        </Component>
    );
}

export default MagneticButton;
