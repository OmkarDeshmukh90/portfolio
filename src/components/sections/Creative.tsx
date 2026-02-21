/* ===========================================
   CREATIVE "WOW" SECTION - 3D SKILL CLOUD
   =========================================== */

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import styles from './Creative.module.css';
import { fadeUp, staggerContainer } from '../../motion';

const skills = [
    'React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker',
    'GraphQL', 'PostgreSQL', 'Next.js', 'Tailwind', 'Framer',
    'Git', 'Redis', 'Mongo', 'Prisma', 'Vite', 'Three.js'
];

const liveStats = [
    { label: 'GitHub Commits', value: 2847, suffix: '+' },
    { label: 'Lines of Code', value: 500, suffix: 'K+' },
    { label: 'Cups of Coffee', value: 3421, suffix: '' },
    { label: 'Years Coding', value: 5, suffix: '+' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [value]);

    return (
        <span>
            {count.toLocaleString()}{suffix}
        </span>
    );
}

export function Creative() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isInView, setIsInView] = useState(false);
    const requestRef = useRef<number | undefined>(undefined);
    const rotationRef = useRef({ x: 0, y: 0 }); // Current rotation angles
    const mouseRef = useRef({ x: 0, y: 0 }); // Mouse position relative to center

    // 3D Point handling
    const pointsRef = useRef<{ x: number; y: number; z: number; label: string }[]>([]);

    const initPoints = useCallback((radius: number) => {
        // Fibonacci Sphere Distribution
        const points = [];
        const phi = Math.PI * (3 - Math.sqrt(5)); // Golden Angle

        for (let i = 0; i < skills.length; i++) {
            const y = 1 - (i / (skills.length - 1)) * 2; // y goes from 1 to -1
            const radiusAtY = Math.sqrt(1 - y * y); // Radius at y
            const theta = phi * i; // Golden angle increment

            const x = Math.cos(theta) * radiusAtY;
            const z = Math.sin(theta) * radiusAtY;

            points.push({
                x: x * radius,
                y: y * radius,
                z: z * radius,
                label: skills[i]
            });
        }
        pointsRef.current = points;
    }, []);

    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;

        ctx.clearRect(0, 0, width, height);

        // Update rotation based on mouse with damping
        const targetRotX = mouseRef.current.y * 0.0001; // Vertical mouse moves X axis rotation
        const targetRotY = mouseRef.current.x * 0.0001; // Horizontal mouse moves Y axis rotation

        // Auto rotation when idle or ease adjust
        rotationRef.current.x += (targetRotX - rotationRef.current.x) * 0.05;
        rotationRef.current.y += (targetRotY - rotationRef.current.y) * 0.05;

        // Add base rotation so it always moves slightly
        const baseSpeed = 0.002;
        const rx = rotationRef.current.x + baseSpeed;
        const ry = rotationRef.current.y + baseSpeed;

        // Rotation Matrices
        // Rotate around X
        const cx = Math.cos(rx);
        const sx = Math.sin(rx);
        // Rotate around Y
        const cy = Math.cos(ry);
        const sy = Math.sin(ry);

        // Sort points by Z depth for correct occlusion (painters algorithm)
        // We need to project first to know Z, or just rotate and check new Z
        // Ideally we rotate points, store transformed, then sort and draw.

        const transformedPoints = pointsRef.current.map(point => {
            // Rotate Y
            let x = point.x * cy - point.z * sy;
            let z = point.z * cy + point.x * sy;
            let y = point.y;

            // Rotate X
            let y2 = y * cx - z * sx;
            let z2 = z * cx + y * sx; // New Z

            return {
                x: x,
                y: y2,
                z: z2,
                label: point.label,
                originX: point.x, // Store original to keep state if needed, though we update rotation view only
                originY: point.y,
                originZ: point.z
            };
        });

        // Update original points? No, we rotate the view references, or we accumulate rotation on the points?
        // Standard tag cloud accumulates rotation on the point coordinates themselves.

        pointsRef.current = transformedPoints.map(p => ({
            x: p.x, y: p.y, z: p.z, label: p.label
        }));

        transformedPoints.sort((a, b) => b.z - a.z); // Draw furthest back first? actually standard canvas is painters algo: draw back first.
        // Wait, positive Z is usually 'out' towards screen in standard cartesian, but here let's assume
        // we want standard Z-buffer behavior.
        // Let's stick to standard: larger Z is closer? Or typically Z- into screen.
        // Let's simply scale based on Z.

        // Scale / Perspectve
        // Assuming Camera at z = radius * 2
        // scale = focalLength / (focalLength + z)
        // Let's use simple opacity/size scaling mapping Z range [-radius, radius]

        const maxRadius = Math.min(width, height) / 3; // Approx radius bound

        transformedPoints.forEach(p => {
            // Map z from [-r, r] to [0, 1] for depth
            // Actually let's just use linear mapping for simplicity
            const depth = (p.z + maxRadius) / (2 * maxRadius); // 0 (back) to 1 (front)
            const clampedDepth = Math.max(0, Math.min(1, depth));

            const scale = 0.5 + (0.5 * clampedDepth); // Scale 0.5 to 1.0
            const alpha = 0.3 + (0.7 * clampedDepth); // Opacity 0.3 to 1.0

            ctx.save();
            ctx.translate(centerX + p.x, centerY + p.y);

            // Draw Text
            ctx.font = `${Math.floor(14 * scale + 12)}px "Space Grotesk"`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Text Color
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;

            // Glow for front items
            if (clampedDepth > 0.8) {
                ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
                ctx.shadowBlur = 10;
            }

            ctx.fillText(p.label, 0, 0);
            ctx.restore();
        });

        requestRef.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !isInView) return;

        const handleResize = () => {
            const container = canvas.parentElement;
            if (container) {
                canvas.width = container.clientWidth;
                canvas.height = container.clientHeight;
                const radius = Math.min(canvas.width, canvas.height) / 3;
                initPoints(radius);
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const x = e.clientX - rect.left - centerX;
            const y = e.clientY - rect.top - centerY;

            mouseRef.current = { x, y };
        };

        const handleMouseLeave = () => {
            mouseRef.current = { x: 0, y: 0 };
        };

        window.addEventListener('resize', handleResize);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        handleResize(); // Init size and points
        animate(); // Start loop

        return () => {
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [isInView, initPoints, animate]);

    return (
        <section className={`section ${styles.creative}`} id="creative">
            <div className="container">
                {/* Section Header */}
                <motion.div
                    className={styles.sectionHeader}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={staggerContainer}
                    onViewportEnter={() => setIsInView(true)}
                >
                    <motion.span className={styles.sectionLabel} variants={fadeUp}>
                        Interactive Playground
                    </motion.span>
                    <motion.h2 className={`heading-section ${styles.sectionTitle}`} variants={fadeUp}>
                        3D Skill<span className="text-gradient"> Cloud</span>
                    </motion.h2>
                    <motion.p className={styles.sectionDescription} variants={fadeUp}>
                        A 3D projection of my technical arsenal. Hover to influence the rotation.
                    </motion.p>
                </motion.div>

                {/* Playground */}
                <motion.div
                    className={styles.playground}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <canvas ref={canvasRef} className={styles.canvas} />
                </motion.div>

                {/* Live Stats */}
                <motion.div
                    className={styles.statsGrid}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                >
                    {liveStats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            className={styles.statCard}
                            variants={fadeUp}
                            whileHover={{ y: -5, scale: 1.02 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <span className={styles.statValue}>
                                {isInView && <AnimatedCounter value={stat.value} suffix={stat.suffix} />}
                            </span>
                            <span className={styles.statLabel}>{stat.label}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default Creative;
