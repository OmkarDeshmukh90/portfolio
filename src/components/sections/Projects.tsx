/* ===========================================
   PROJECTS SECTION COMPONENT
   =========================================== */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from '../ui/MagneticButton';
import styles from './Projects.module.css';
import { fadeUp, staggerContainer, scaleIn } from '../../motion';

interface Project {
    id: number;
    title: string;
    description: string;
    longDescription: string;
    category: string;
    image: string;
    tech: string[];
    liveUrl: string;
    githubUrl: string;
    featured: boolean;
}

const projects: Project[] = [
    {
        id: 1,
        title: 'OptimizeIt Analytics',
        description: 'Dashboard-based supply chain optimization tool.',
        longDescription: 'Designed and deployed a dashboard-based supply chain optimization tool to track inventory, forecast demand, and analyze lead times. Applied EOQ and cost-vs-time models using Python, achieving 18% reduction in overstocking. Improved planning efficiency by 24% using predictive models and decision support.',
        category: 'Supply Chain',
        image: '/projects/optimizeit.png',
        tech: ['Python', 'Data Analytics', 'EOQ Models', 'Dashboarding'],
        liveUrl: 'https://optimiseit.vly.site/',
        githubUrl: '#',
        featured: true,
    },
    {
        id: 2,
        title: 'Supply Chain Digital Twin',
        description: 'Interactive dashboard for simulated supply chain visualization.',
        longDescription: 'Developed a 3-tier interactive dashboard for 10+ simulated suppliers, manufacturers, and retailers to visualize real-time inventory and order flows. Implemented smart alert systems to flag bottlenecks, reducing simulated stock-outs by 23%. Generated insights from over 5,000 synthetic transactions.',
        category: 'Simulation',
        image: '',
        tech: ['Shaden', 'Framer Motion', 'React', 'Simulation'],
        liveUrl: '#',
        githubUrl: '#',
        featured: true,
    },
    {
        id: 3,
        title: 'Urban Waste Management',
        description: 'ML-powered system to optimize waste collection.',
        longDescription: 'Built in under 36 hours at a national-level hackathon. Uses ML to track, forecast, and optimize urban waste collection. Designed a real-time Streamlit dashboard powered by SQL queries, enabling route optimization with projected savings of up to 18% in fuel and labor hours. Applied scikit-learn models on 500+ data points.',
        category: 'AI/ML',
        image: '',
        tech: ['Python', 'SQL', 'scikit-learn', 'Streamlit'],
        liveUrl: '#',
        githubUrl: '#',
        featured: true,
    },
];

const categories = ['All', 'Supply Chain', 'AI/ML', 'Simulation'];

export function Projects() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const filteredProjects = activeCategory === 'All'
        ? projects
        : projects.filter((p) => p.category === activeCategory || (activeCategory === 'Supply Chain' && p.category === 'Simulation')); // Group simulation under supply chain if needed, or keep separate. 
    // Actually simple exact match is better. 

    return (
        <section className={`section ${styles.projects}`} id="projects">
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
                        Featured Work
                    </motion.span>
                    <motion.h2 className={`heading-section ${styles.sectionTitle}`} variants={fadeUp}>
                        Projects That
                        <span className="text-gradient"> Define Me</span>
                    </motion.h2>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div
                    className={styles.filterTabs}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            className={`${styles.filterTab} ${activeCategory === category ? styles.active : ''}`}
                            onClick={() => setActiveCategory(category)}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {category}
                            {activeCategory === category && (
                                <motion.div
                                    className={styles.tabIndicator}
                                    layoutId="tabIndicator"
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                />
                            )}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <motion.div className={styles.projectsGrid} layout>
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => (
                            <motion.article
                                key={project.id}
                                className={`${styles.projectCard} ${project.featured ? styles.featured : ''}`}
                                variants={scaleIn}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                layout
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                onClick={() => setSelectedProject(project)}
                                whileHover={{ y: -10 }}
                            >
                                <div className={styles.projectImage}>
                                    {project.image ? (
                                        <img src={project.image} alt={project.title} className={styles.projectImg} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div className={styles.imagePlaceholder}>
                                            <span>{project.title.charAt(0)}</span>
                                        </div>
                                    )}
                                    <div className={styles.projectOverlay}>
                                        <span className={styles.viewProject}>View Project →</span>
                                    </div>
                                </div>
                                <div className={styles.projectContent}>
                                    <span className={styles.projectCategory}>{project.category}</span>
                                    <h3 className={styles.projectTitle}>{project.title}</h3>
                                    <p className={styles.projectDescription}>{project.description}</p>
                                    <div className={styles.techStack}>
                                        {project.tech.slice(0, 3).map((tech) => (
                                            <span key={tech} className={styles.techBadge}>
                                                {tech}
                                            </span>
                                        ))}
                                        {project.tech.length > 3 && (
                                            <span className={styles.techBadge}>+{project.tech.length - 3}</span>
                                        )}
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className={styles.modalBackdrop}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            className={styles.modal}
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 50 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className={styles.modalClose}
                                onClick={() => setSelectedProject(null)}
                                aria-label="Close modal"
                            >
                                ×
                            </button>

                            <div className={styles.modalImage}>
                                {selectedProject.image ? (
                                    <img src={selectedProject.image} alt={selectedProject.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <div className={styles.imagePlaceholder}>
                                        <span>{selectedProject.title.charAt(0)}</span>
                                    </div>
                                )}
                            </div>

                            <div className={styles.modalContent}>
                                <span className={styles.projectCategory}>{selectedProject.category}</span>
                                <h3 className={styles.modalTitle}>{selectedProject.title}</h3>
                                <p className={styles.modalDescription}>{selectedProject.longDescription}</p>

                                <div className={styles.techStack}>
                                    {selectedProject.tech.map((tech) => (
                                        <span key={tech} className={styles.techBadge}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className={styles.modalActions}>
                                    <MagneticButton
                                        as="a"
                                        href={selectedProject.liveUrl}
                                    >
                                        Live Demo
                                    </MagneticButton>
                                    <MagneticButton
                                        as="a"
                                        href={selectedProject.githubUrl}
                                        className="secondary"
                                    >
                                        GitHub
                                    </MagneticButton>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

export default Projects;
