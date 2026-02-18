/* ===========================================
   MOTION SYSTEM - TRANSITIONS & EASINGS
   =========================================== */

import type { Transition } from 'framer-motion';

// ========== SPRING TRANSITIONS ==========
export const springGentle: Transition = {
    type: 'spring',
    stiffness: 100,
    damping: 20,
    mass: 1,
};

export const springBouncy: Transition = {
    type: 'spring',
    stiffness: 400,
    damping: 15,
    mass: 0.5,
};

export const springSnappy: Transition = {
    type: 'spring',
    stiffness: 500,
    damping: 30,
    mass: 0.8,
};

export const springSmooth: Transition = {
    type: 'spring',
    stiffness: 200,
    damping: 25,
    mass: 1,
};

// ========== TWEEN TRANSITIONS ==========
export const tweenFast: Transition = {
    type: 'tween',
    duration: 0.15,
    ease: [0.33, 1, 0.68, 1], // easeOutCubic
};

export const tweenNormal: Transition = {
    type: 'tween',
    duration: 0.3,
    ease: [0.33, 1, 0.68, 1],
};

export const tweenSlow: Transition = {
    type: 'tween',
    duration: 0.5,
    ease: [0.65, 0, 0.35, 1], // easeInOutCubic
};

export const tweenSlower: Transition = {
    type: 'tween',
    duration: 0.8,
    ease: [0.65, 0, 0.35, 1],
};

// ========== SPECIAL TRANSITIONS ==========
export const pageTransition: Transition = {
    type: 'tween',
    duration: 0.4,
    ease: [0.22, 1, 0.36, 1], // easeOutQuint
};

export const revealTransition: Transition = {
    type: 'spring',
    stiffness: 100,
    damping: 20,
    mass: 1.2,
};

export const hoverTransition: Transition = {
    type: 'spring',
    stiffness: 400,
    damping: 17,
};

export const magneticTransition: Transition = {
    type: 'spring',
    stiffness: 150,
    damping: 15,
    mass: 0.1,
};

// ========== STAGGER DELAYS ==========
export const staggerDelay = {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
};

// ========== DURATION PRESETS ==========
export const duration = {
    instant: 0,
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    slower: 0.8,
    slowest: 1.2,
};

// ========== EASING PRESETS ==========
export const easing = {
    // Standard easings
    easeOut: [0.33, 1, 0.68, 1] as const,
    easeInOut: [0.65, 0, 0.35, 1] as const,
    easeIn: [0.36, 0, 0.66, -0.56] as const,

    // Expressive easings
    easeOutQuint: [0.22, 1, 0.36, 1] as const,
    easeOutExpo: [0.16, 1, 0.3, 1] as const,
    easeOutBack: [0.34, 1.56, 0.64, 1] as const,

    // Smooth
    smooth: [0.4, 0, 0.2, 1] as const,
};

// ========== COMBINED PRESETS ==========
export const defaultTransition: Transition = {
    type: 'spring',
    stiffness: 300,
    damping: 25,
};

export const viewportOnce = {
    once: true,
    margin: '-100px',
};

export const viewportRepeating = {
    once: false,
    margin: '-50px',
    amount: 0.3 as const,
};
