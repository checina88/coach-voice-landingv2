'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroAnimationCard from './HeroAnimationCard';
import Image from 'next/image';

const STATE_1_DURATION = 10000;
const STATE_2_DURATION = 6000;
const CROSSFADE = 0.8;

const Hero = () => {
    const [activeState, setActiveState] = useState<1 | 2>(1);

    useEffect(() => {
        const duration = activeState === 1 ? STATE_1_DURATION : STATE_2_DURATION;
        const timer = setTimeout(() => {
            setActiveState(prev => (prev === 1 ? 2 : 1));
        }, duration);
        return () => clearTimeout(timer);
    }, [activeState]);

    return (
        <section className="relative w-full h-screen overflow-hidden">
            <AnimatePresence mode="wait">
                {activeState === 1 ? (
                    /* ── STATE 1: Product Hero ── */
                    <motion.div
                        key="state-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: CROSSFADE, ease: 'easeInOut' }}
                        className="w-full h-full flex items-center justify-center px-6 md:px-12 lg:px-24 pt-20"
                    >
                        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="flex flex-col items-start text-left space-y-8 z-10">
                                <h1 className="text-4xl lg:text-5xl font-light tracking-tight leading-[1.1] text-cv-text-primary">
                                    Coach Voice helps you slow down, listen back, and understand what&apos;s really happening in your sessions.
                                </h1>
                                <div className="flex flex-col items-start gap-4">
                                    <a href="/book" className="px-8 py-3 bg-cv-accent hover:bg-cv-teal-hover text-white text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group">
                                        Take Action
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                    <p className="text-sm text-cv-text-secondary/80 font-light">
                                        A private conversation to understand your coaching environment.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center justify-center relative">
                                <HeroAnimationCard />
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    /* ── STATE 2: Full-bleed Reflection Hero ── */
                    <motion.div
                        key="state-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: CROSSFADE, ease: 'easeInOut' }}
                        className="w-full h-full relative"
                    >
                        {/* Full-bleed background image */}
                        <Image
                            src="/hero-reflection.png"
                            alt="Player completing post-session reflection"
                            fill
                            className="object-cover object-center"
                            priority
                        />

                        {/* Gradient overlays for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

                        {/* Content layer */}
                        <div className="relative z-10 w-full h-full flex items-center px-6 md:px-12 lg:px-24 pt-20">
                            <div className="w-full max-w-7xl mx-auto">

                                {/* Left-aligned text */}
                                <div className="max-w-xl space-y-8">
                                    <motion.h1
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
                                        className="text-4xl lg:text-5xl font-light tracking-tight leading-[1.1] text-white"
                                    >
                                        Coach Voice reveals how coaches actually communicate, how it is perceived, and how it impacts athletes, staff, and performance.
                                    </motion.h1>

                                    <motion.div
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
                                        className="flex flex-col items-start gap-4"
                                    >
                                        <a href="/book" className="px-8 py-3 bg-cv-accent hover:bg-cv-teal-hover text-white text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group">
                                            Take Action
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                        <p className="text-sm text-white/60 font-light">
                                            A private conversation to understand your coaching environment
                                        </p>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Reflection overlay — positioned center-right */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
                                className="absolute top-1/2 left-[50%] -translate-y-1/4 hidden md:block"
                            >
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-white/60">
                                            Reflection
                                        </span>
                                        <div className="w-8 h-px bg-white/40" />
                                    </div>
                                    <p className="text-xl md:text-2xl font-light text-white/90 leading-relaxed max-w-[340px]">
                                        Did you clearly understand what was expected of you today?
                                    </p>
                                </div>

                                {/* Thin connector line pointing toward the player */}
                                <svg className="absolute -bottom-14 right-0 w-28 h-14 overflow-visible" viewBox="0 0 112 56">
                                    <line x1="50" y1="0" x2="112" y2="48" stroke="white" strokeOpacity="0.25" strokeWidth="1" />
                                </svg>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Hero;
