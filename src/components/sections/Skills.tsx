/* ===========================================
   SKILLS SECTION COMPONENT
   =========================================== */

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import styles from './Skills.module.css';
import { fadeUp, staggerContainer } from '../../motion';

interface Skill {
    name: string;
    level: number;
    color: string;
}

interface SkillCategory {
    title: string;
    icon: string;
    skills: Skill[];
}

const skillCategories: SkillCategory[] = [
    {
        title: 'Languages',
        icon: '💻',
        skills: [
            { name: 'Python', level: 95, color: '#3776AB' },
            { name: 'SQL', level: 90, color: '#4169E1' },
            { name: 'JavaScript', level: 88, color: '#F7DF1E' },
            { name: 'C', level: 80, color: '#A8B9CC' },
            { name: 'HTML/CSS', level: 92, color: '#E34F26' },
        ],
    },
    {
        title: 'Frameworks & Tools',
        icon: '🛠️',
        skills: [
            { name: 'React', level: 90, color: '#61DAFB' },
            { name: 'Flask', level: 85, color: '#000000' },
            { name: 'Tailwind', level: 88, color: '#06B6D4' },
            { name: 'Streamlit', level: 85, color: '#FF4B4B' },
            { name: 'Git/GitHub', level: 92, color: '#F05032' },
        ],
    },
    {
        title: 'Soft Skills',
        icon: '🧠',
        skills: [
            { name: 'problem-solving', level: 95, color: '#8B5CF6' },
            { name: 'Communication', level: 92, color: '#10B981' },
            { name: 'Teamwork', level: 90, color: '#F59E0B' },
            { name: 'Critical Thinking', level: 88, color: '#EC4899' },
        ],
    },
];

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className={styles.skillItem}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={styles.skillHeader}>
                <span className={styles.skillName}>{skill.name}</span>
                <motion.span
                    className={styles.skillLevel}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0.6 }}
                >
                    {skill.level}%
                </motion.span>
            </div>
            <div className={styles.skillBarTrack}>
                <motion.div
                    className={styles.skillBarFill}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: skill.level / 100 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
                        boxShadow: isHovered ? `0 0 20px ${skill.color}66` : 'none',
                    }}
                />
            </div>
        </motion.div>
    );
}

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(ySpring, [-0.5, 0.5], ['10deg', '-10deg']);
    const rotateY = useTransform(xSpring, [-0.5, 0.5], ['-10deg', '10deg']);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const xPos = (e.clientX - rect.left) / rect.width - 0.5;
        const yPos = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(xPos);
        y.set(yPos);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </motion.div>
    );
}

export function Skills() {
    return (
        <section className={`section ${styles.skills}`} id="skills">
            <div className="container">
                {/* Section Header */}
                <motion.div
                    className={styles.sectionHeader}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={staggerContainer}
                >
                    <motion.span className={styles.sectionLabel} variants={fadeUp}>
                        Technical Proficiency
                    </motion.span>
                    <motion.h2 className={`heading-section ${styles.sectionTitle}`} variants={fadeUp}>
                        My Technology
                        <span className="text-gradient"> Stack</span>
                    </motion.h2>
                    <motion.p className={styles.sectionDescription} variants={fadeUp}>
                        A comprehensive set of tools and languages I use to build efficient AI and software solutions.
                    </motion.p>
                </motion.div>

                {/* Skills Grid */}
                <div className={styles.categoriesGrid}>
                    {skillCategories.map((category, categoryIndex) => (
                        <TiltCard key={category.title} className={styles.categoryCard}>
                            <motion.div
                                className={styles.categoryInner}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: categoryIndex * 0.2 }}
                            >
                                <div className={styles.categoryHeader}>
                                    <span className={styles.categoryIcon}>{category.icon}</span>
                                    <h3 className={styles.categoryTitle}>{category.title}</h3>
                                </div>
                                <div className={styles.skillsList}>
                                    {category.skills.map((skill, index) => (
                                        <SkillBar key={skill.name} skill={skill} index={index} />
                                    ))}
                                </div>
                            </motion.div>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Skills;
