/* ===========================================
   FOOTER COMPONENT
   =========================================== */

import { motion } from 'framer-motion';
import styles from './Footer.module.css';
import { MagneticButton } from '../ui/MagneticButton';
import { fadeUp, staggerContainer } from '../../motion';

const socialLinks = [
    { name: 'GitHub', href: 'https://github.com', icon: 'GH' },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'LI' },
    { name: 'Twitter', href: 'https://twitter.com', icon: 'TW' },
    { name: 'Dribbble', href: 'https://dribbble.com', icon: 'DR' },
];

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentYear = new Date().getFullYear();

    return (
        <motion.footer
            className={styles.footer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
        >
            <div className={`container ${styles.footerContainer}`}>
                {/* Back to Top */}
                {/* Back to Top */}
                <div className={styles.backToTopWrapper}>
                    <MagneticButton
                        className={styles.backToTop}
                        onClick={scrollToTop}
                        strength={0.4}
                    >
                        <span className={styles.arrow}>↑</span>
                        <span className={styles.backToTopText}>Back to Top</span>
                    </MagneticButton>
                </div>

                {/* Main Footer Content */}
                <div className={styles.footerContent}>
                    <motion.div className={styles.footerLeft} variants={fadeUp}>
                        <p className={styles.tagline}>
                            Crafted with <span className={styles.heart}>♥</span> and lots of coffee
                        </p>
                        <p className={styles.copyright}>
                            © {currentYear} Omkar. All rights reserved.
                        </p>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div className={styles.socialLinks} variants={fadeUp}>
                        {socialLinks.map((link) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                className={styles.socialLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={link.name}
                                whileHover={{ y: -3, scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className={styles.socialIcon}>{link.icon}</span>
                            </motion.a>
                        ))}
                    </motion.div>
                </div>

                {/* Bottom Gradient Line */}
                <div className={styles.gradientLine} />
            </div>
        </motion.footer>
    );
}

export default Footer;
