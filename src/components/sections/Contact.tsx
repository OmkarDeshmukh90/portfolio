/* ===========================================
   CONTACT SECTION COMPONENT - OUTSTANDING
   =========================================== */

import { motion } from 'framer-motion';
import styles from './Contact.module.css';
import { fadeUp, staggerContainer } from '../../motion';
import { MagneticButton } from '../ui/MagneticButton';

export function Contact() {
    return (
        <section className={`section ${styles.contact}`} id="contact">
            <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                <motion.div
                    className={styles.contentWrapper}
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div className={styles.subtitleWrapper} variants={fadeUp}>
                        <span className={styles.subtitle}>06. What's Next?</span>
                    </motion.div>

                    <motion.h2 className={styles.title} variants={fadeUp}>
                        Get In <span className={styles.textGlow}>Touch</span>
                    </motion.h2>

                    <motion.div className={styles.descriptionWrapper} variants={fadeUp}>
                        <p className={styles.description}>
                            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                        </p>
                    </motion.div>

                    <motion.div className={styles.buttonGroup} variants={fadeUp}>
                        <MagneticButton
                            as="a"
                            href="https://linkedin.com/in/omkar-deshmukh90"
                            className={styles.contactButton}
                            strength={0.4}
                        >
                            <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                            <span>LinkedIn</span>
                        </MagneticButton>

                        <MagneticButton
                            as="a"
                            href="mailto:omraje5990@gmail.com"
                            className={styles.contactButton}
                            strength={0.4}
                        >
                            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                            <span>Email Me</span>
                        </MagneticButton>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

export default Contact;
