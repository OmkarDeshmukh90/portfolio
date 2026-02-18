/* ===========================================
   EXPERIENCE SECTION COMPONENT
   =========================================== */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Experience.module.css';
import { fadeUp, staggerContainer } from '../../motion';

interface ExperienceItem {
    id: number;
    role: string;
    company: string;
    location: string;
    period: string;
    description: string;
    achievements: string[];
    technologies: string[];
}

const experiences: ExperienceItem[] = [
    {
        id: 1,
        role: 'Freelance Web Developer (Front-end)',
        company: 'UNICEF Youth Dept.',
        location: 'Mumbai, India',
        period: 'Sept 2024 – Oct 2024',
        description: 'Led the front-end development of a youth engagement platform, enhancing visibility for over 12+ UNICEF initiatives across Maharashtra.',
        achievements: [
            'Built a fully responsive UI using React and Typescript, achieving 100% Lighthouse accessibility and performance scores.',
            'Reduced page load time by 38% via optimization of assets, improving overall site interaction rate by 42% post-deployment.',
        ],
        technologies: ['React', 'TypeScript', 'Responsive UI', 'Asset Optimization'],
    },
];

export function Experience() {
    const [expandedId, setExpandedId] = useState<number | null>(1);

    return (
        <section className={`section ${styles.experience}`} id="experience">
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
                        Experience
                    </motion.span>
                    <motion.h2 className={`heading-section ${styles.sectionTitle}`} variants={fadeUp}>
                        Professional
                        <span className="text-gradient"> Journey</span>
                    </motion.h2>
                </motion.div>

                {/* Experience Cards */}
                <div className={styles.experienceList}>
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            className={`${styles.experienceCard} ${expandedId === exp.id ? styles.expanded : ''}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                        >
                            {/* Card Header */}
                            <button
                                className={styles.cardHeader}
                                onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                                aria-expanded={expandedId === exp.id}
                            >
                                <div className={styles.headerLeft}>
                                    <div className={styles.companyLogo}>
                                        {exp.company.charAt(0)}
                                    </div>
                                    <div className={styles.headerInfo}>
                                        <h3 className={styles.role}>{exp.role}</h3>
                                        <p className={styles.company}>
                                            {exp.company} <span className={styles.location}>• {exp.location}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.headerRight}>
                                    <span className={styles.period}>{exp.period}</span>
                                    <motion.span
                                        className={styles.expandIcon}
                                        animate={{ rotate: expandedId === exp.id ? 180 : 0 }}
                                    >
                                        ↓
                                    </motion.span>
                                </div>
                            </button>

                            {/* Card Content */}
                            <AnimatePresence>
                                {expandedId === exp.id && (
                                    <motion.div
                                        className={styles.cardContent}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <p className={styles.description}>{exp.description}</p>

                                        <div className={styles.achievements}>
                                            <h4 className={styles.achievementsTitle}>Key Achievements</h4>
                                            <ul className={styles.achievementsList}>
                                                {exp.achievements.map((achievement, i) => (
                                                    <motion.li
                                                        key={i}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.1 }}
                                                    >
                                                        <span className={styles.achievementIcon}>✦</span>
                                                        {achievement}
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className={styles.technologies}>
                                            {exp.technologies.map((tech) => (
                                                <span key={tech} className={styles.techTag}>
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Experience;
