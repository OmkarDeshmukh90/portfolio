/* ===========================================
   NAVBAR COMPONENT
   =========================================== */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { MagneticButton } from '../ui/MagneticButton';
import styles from './Navbar.module.css';
import { fadeDown, staggerContainer } from '../../motion';

const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setIsScrolled(latest > 50);
    });

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <motion.header
                className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
                <div className={`container ${styles.navContainer}`}>
                    {/* Logo */}
                    <motion.a
                        href="#"
                        className={styles.logo}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className={styles.logoText}>O</span>
                        <span className={styles.logoDot} />
                    </motion.a>

                    {/* Desktop Navigation */}
                    <nav className={styles.desktopNav}>
                        <motion.ul
                            className={styles.navList}
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                        >
                            {navLinks.map((link) => (
                                <motion.li key={link.name} variants={fadeDown}>
                                    <a
                                        href={link.href}
                                        className={styles.navLink}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                    >
                                        {link.name}
                                        <span className={styles.navIndicator} />
                                    </a>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </nav>

                    {/* CTA Button */}
                    <div className={styles.ctaWrapper}>
                        <MagneticButton
                            className={styles.ctaButton}
                            onClick={() => {
                                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Let's Talk
                        </MagneticButton>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={`${styles.menuButton} ${isMobileMenuOpen ? styles.open : ''}`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span className={styles.menuLine} />
                        <span className={styles.menuLine} />
                        <span className={styles.menuLine} />
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className={styles.mobileMenu}
                        initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
                        animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
                        exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <nav className={styles.mobileNav}>
                            <motion.ul
                                className={styles.mobileNavList}
                                variants={staggerContainer}
                                initial="hidden"
                                animate="visible"
                            >
                                {navLinks.map((link, index) => (
                                    <motion.li
                                        key={link.name}
                                        variants={{
                                            hidden: { opacity: 0, x: -50 },
                                            visible: { opacity: 1, x: 0 },
                                        }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <a
                                            href={link.href}
                                            className={styles.mobileNavLink}
                                            onClick={(e) => handleNavClick(e, link.href)}
                                        >
                                            <span className={styles.mobileNavNumber}>0{index + 1}</span>
                                            {link.name}
                                        </a>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Navbar;
