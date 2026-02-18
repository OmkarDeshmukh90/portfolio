/* ===========================================
   ABOUT SECTION COMPONENT
   =========================================== */

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './About.module.css';
import { fadeUp, staggerContainer } from '../../motion';

const education = [
    {
        year: '2022-2026',
        title: 'Bachelor of Engineering in Computer Engineering',
        institution: 'University of Mumbai',
        description: 'Focus on AI, System Design, and Business Logic.',
    },
    {
        year: 'Certifications',
        title: 'Diploma in Supply Chain Management (NPTEL)',
        institution: '',
        description: 'Intermediate SQL Certification (HackerRank)',
    },
];

export function About() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section ref={containerRef} className={`section ${styles.about}`} id="about">
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
                        About Me
                    </motion.span>
                    <motion.h2 className={`heading-section ${styles.sectionTitle}`} variants={fadeUp}>
                        Engineering
                        <span className="text-gradient"> Solutions</span>
                    </motion.h2>
                </motion.div>

                {/* Content Grid */}
                <div className={styles.contentGrid}>
                    {/* Image Column */}
                    <motion.div
                        className={styles.imageColumn}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div className={styles.imageWrapper} style={{ y: imageY }}>
                            <img
                                src="/profile.jpg"
                                alt="Omkar Deshmukh"
                                className={styles.profileImage}
                            />
                            <div className={styles.imageDecor} />
                        </motion.div>
                    </motion.div>

                    {/* Text Column */}
                    <motion.div
                        className={styles.textColumn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <motion.p className={styles.introParagraph} variants={fadeUp}>
                            Computer Engineering student with hands-on experience in <strong>Artificial Intelligence, supply chain optimization</strong>, and data-driven development.
                        </motion.p>

                        <motion.p className={styles.paragraph} variants={fadeUp}>
                            Skilled in Python, SQL, and web technologies, with a strong foundation in system design and business logic. Passionate about applying technology to solve enterprise-level problems in techno-consulting roles.
                        </motion.p>
                    </motion.div>
                </div>

                {/* Education Section (Replacing Timeline) */}
                <motion.div
                    className={styles.timeline}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    variants={staggerContainer}
                >
                    <motion.h3 className={styles.timelineTitle} variants={fadeUp}>
                        Education & Certifications
                    </motion.h3>

                    <div className={styles.timelineTrack}>
                        {education.map((item, index) => (
                            <motion.div
                                key={item.title}
                                className={styles.timelineItem}
                                variants={fadeUp}
                                custom={index}
                            >
                                <div className={styles.timelineMarker}>
                                    <span className={styles.timelineYear}>{item.year}</span>
                                    <div className={styles.timelineDot} />
                                </div>
                                <div className={styles.timelineContent}>
                                    <h4 className={styles.timelineItemTitle}>{item.title}</h4>
                                    {item.institution && <p className={styles.timelineCompany}>{item.institution}</p>}
                                    <p className={styles.timelineDescription}>{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                        <div className={styles.timelineLine} />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default About;
