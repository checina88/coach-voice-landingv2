'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type TargetId = 'coaches' | 'clubs' | 'federations';

interface ProductCard {
    id: string;
    title: string;
    content: React.ReactNode;
}

const targetIds: TargetId[] = ['coaches', 'clubs', 'federations'];
const CYCLE_INTERVAL = 6000;

/* ── Fixed card height for uniform sizing ── */
const CARD_HEIGHT = 230;

const targets: { id: TargetId; label: string; description: string; cards: ProductCard[] }[] = [
    {
        id: 'coaches',
        label: 'Coaches',
        description: 'Understand how your communication patterns influence autonomy, competence, and relatedness during training.',
        cards: [
            {
                id: 'c-sdt',
                title: 'SDT Score',
                content: (
                    <div className="space-y-4 flex-1 flex flex-col justify-center">
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-light text-cv-text-primary">78</span>
                            <span className="text-xs text-cv-accent font-medium">+4.2%</span>
                        </div>
                        <div className="space-y-2.5">
                            {[{ l: 'Autonomy', v: 82 }, { l: 'Competence', v: 75 }, { l: 'Relatedness', v: 77 }].map(m => (
                                <div key={m.l} className="space-y-1">
                                    <div className="flex justify-between text-[11px] text-cv-text-secondary"><span>{m.l}</span><span>{m.v}</span></div>
                                    <div className="h-1.5 bg-cv-text-primary/10 rounded-full"><div className="h-full bg-cv-accent/60 rounded-full" style={{ width: `${m.v}%` }} /></div>
                                </div>
                            ))}
                        </div>
                    </div>
                ),
            },
            {
                id: 'c-trend',
                title: 'Session Trend',
                content: (
                    <div className="space-y-3 flex-1 flex flex-col justify-center">
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-cv-accent font-medium">Last 8 sessions</span>
                        </div>
                        <svg viewBox="0 0 160 60" className="w-full h-20">
                            <polyline fill="none" stroke="#3f857e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points="0,50 20,44 40,47 60,35 80,37 100,28 120,22 140,18 160,14" />
                            <polyline fill="none" stroke="#3f857e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.3" points="0,38 20,40 40,35 60,42 80,32 100,35 120,28 140,25 160,22" />
                        </svg>
                        <div className="flex justify-between text-[11px] text-cv-text-secondary">
                            <span>Week 1</span>
                            <span>Week 8</span>
                        </div>
                    </div>
                ),
            },
            {
                id: 'c-feedback',
                title: 'Communication',
                content: (
                    <div className="space-y-4 flex-1 flex flex-col justify-center">
                        {[{ l: 'Directive', r: 'Non-directive', v: 35 }, { l: 'Controlling', r: 'Supportive', v: 72 }, { l: 'Negative', r: 'Positive', v: 80 }].map(d => (
                            <div key={d.l} className="flex items-center gap-2">
                                <span className="text-[10px] text-cv-text-secondary w-16 text-right truncate">{d.l}</span>
                                <div className="flex-1 h-1.5 bg-cv-text-primary/10 rounded-full relative">
                                    <div className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-cv-accent" style={{ left: `${d.v}%`, transform: `translateX(-50%) translateY(-50%)` }} />
                                </div>
                                <span className="text-[10px] text-cv-text-secondary w-16 truncate">{d.r}</span>
                            </div>
                        ))}
                    </div>
                ),
            },
        ],
    },
    {
        id: 'clubs',
        label: 'Clubs',
        description: 'See how coaching behaviors shape development environments across teams, staff, and sessions.',
        cards: [
            {
                id: 'cl-overview',
                title: 'Team Overview',
                content: (
                    <div className="space-y-3 flex-1 flex flex-col justify-center">
                        <div className="grid grid-cols-2 gap-3">
                            {[{ l: 'U-14', v: '82', c: 'text-cv-accent' }, { l: 'U-16', v: '74', c: 'text-cv-text-secondary' }, { l: 'U-18', v: '88', c: 'text-cv-accent' }, { l: 'Senior', v: '71', c: 'text-cv-text-secondary' }].map(t => (
                                <div key={t.l} className="bg-white/30 rounded-lg p-3 text-center">
                                    <div className={`text-xl font-light ${t.c}`}>{t.v}</div>
                                    <div className="text-[10px] text-cv-text-secondary mt-0.5">{t.l}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ),
            },
            {
                id: 'cl-alert',
                title: 'Alert',
                content: (
                    <div className="space-y-3 flex-1 flex flex-col justify-center">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-amber-400" />
                            <span className="text-xs font-medium text-amber-600">Attention needed</span>
                        </div>
                        <p className="text-sm text-cv-text-secondary leading-relaxed">
                            U-16 coach shows declining supportive communication over 3 consecutive sessions.
                        </p>
                        <div className="flex gap-2 mt-1">
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">U-16</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cv-accent/10 text-cv-accent">Communication</span>
                        </div>
                    </div>
                ),
            },
            {
                id: 'cl-climate',
                title: 'Motivational Climate',
                content: (
                    <div className="space-y-3 flex-1 flex flex-col justify-center">
                        <div className="flex gap-1.5 items-end h-20">
                            {[65, 72, 58, 80, 74, 68, 85, 78].map((v, i) => (
                                <div key={i} className="flex-1 bg-cv-accent/40 rounded-t transition-all" style={{ height: `${v}%` }} />
                            ))}
                        </div>
                        <div className="flex justify-between text-[10px] text-cv-text-secondary">
                            <span>Jan</span><span>Apr</span><span>Aug</span>
                        </div>
                    </div>
                ),
            },
        ],
    },
    {
        id: 'federations',
        label: 'Federations',
        description: 'Build a measurable coaching culture at scale and support more consistent player development systems.',
        cards: [
            {
                id: 'f-dashboard',
                title: 'Federation Dashboard',
                content: (
                    <div className="space-y-4 flex-1 flex flex-col justify-center">
                        <div className="flex gap-4">
                            {[{ l: 'Coaches', v: '248' }, { l: 'Sessions', v: '1.2k' }, { l: 'Avg SDT', v: '76' }].map(s => (
                                <div key={s.l} className="flex-1 text-center">
                                    <div className="text-xl font-light text-cv-text-primary">{s.v}</div>
                                    <div className="text-[10px] text-cv-text-secondary mt-0.5">{s.l}</div>
                                </div>
                            ))}
                        </div>
                        <div className="h-px bg-cv-text-primary/10" />
                        <div className="text-xs text-cv-accent font-medium">12 regions monitored</div>
                    </div>
                ),
            },
            {
                id: 'f-dist',
                title: 'Domain Distribution',
                content: (
                    <div className="space-y-3 flex-1 flex flex-col justify-center">
                        {[{ l: 'Supportive', v: 74 }, { l: 'Autonomy', v: 68 }, { l: 'Questioning', v: 55 }, { l: 'Positive', v: 81 }].map(d => (
                            <div key={d.l} className="space-y-1">
                                <div className="flex justify-between text-[10px] text-cv-text-secondary"><span>{d.l}</span><span>{d.v}%</span></div>
                                <div className="h-1.5 bg-cv-text-primary/10 rounded-full"><div className="h-full bg-cv-accent/50 rounded-full" style={{ width: `${d.v}%` }} /></div>
                            </div>
                        ))}
                    </div>
                ),
            },
            {
                id: 'f-trend',
                title: 'National Trend',
                content: (
                    <div className="space-y-3 flex-1 flex flex-col justify-center">
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-cv-accent font-medium">Year over year</span>
                            <span className="text-[11px] text-cv-accent/70">+8.3%</span>
                        </div>
                        <svg viewBox="0 0 160 50" className="w-full h-16">
                            <polyline fill="none" stroke="#3f857e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 2" points="0,42 40,36 80,33 120,26 160,24" />
                            <polyline fill="none" stroke="#3f857e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points="0,38 40,30 80,23 120,16 160,10" />
                        </svg>
                        <div className="flex justify-between text-[10px] text-cv-text-secondary">
                            <span>2023</span><span>2024</span><span>2025</span>
                        </div>
                    </div>
                ),
            },
        ],
    },
];

// Cards on left for even indices (coaches, federations), right for odd (clubs)
const isCardsLeft = (id: TargetId) => {
    const idx = targetIds.indexOf(id);
    return idx % 2 === 0;
};

const contentVariants = {
    initial: (direction: number) => ({
        opacity: 0,
        x: direction * 60,
    }),
    animate: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
    },
    exit: (direction: number) => ({
        opacity: 0,
        x: direction * -60,
        transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
    }),
};

const cardVariants = {
    initial: { opacity: 0, y: 16, scale: 0.96 },
    animate: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { delay: i * 0.08, duration: 0.4, ease: 'easeOut' },
    }),
};

const textVariants = {
    initial: { opacity: 0, y: 12 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { delay: 0.25, duration: 0.4, ease: 'easeOut' },
    },
};

const Understand = () => {
    const [activeTarget, setActiveTarget] = useState<TargetId>('coaches');
    const isPausedRef = useRef(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const directionRef = useRef(1);
    const currentTarget = targets.find(t => t.id === activeTarget)!;
    const cardsLeft = isCardsLeft(activeTarget);

    const changeTarget = useCallback((newTarget: TargetId) => {
        setActiveTarget(prev => {
            const prevIdx = targetIds.indexOf(prev);
            const newIdx = targetIds.indexOf(newTarget);
            directionRef.current = newIdx >= prevIdx ? 1 : -1;
            return newTarget;
        });
    }, []);

    // Auto-cycle logic
    const startCycle = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            if (!isPausedRef.current) {
                setActiveTarget(prev => {
                    const idx = targetIds.indexOf(prev);
                    directionRef.current = 1;
                    return targetIds[(idx + 1) % targetIds.length];
                });
            }
        }, CYCLE_INTERVAL);
    }, []);

    useEffect(() => {
        startCycle();
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [startCycle]);

    const handleSelect = useCallback((id: TargetId) => {
        isPausedRef.current = true;
        changeTarget(id);
    }, [changeTarget]);

    const handleHover = useCallback((id: TargetId) => {
        isPausedRef.current = true;
        changeTarget(id);
    }, [changeTarget]);

    const handleHoverEnd = useCallback(() => {
        isPausedRef.current = false;
        startCycle();
    }, [startCycle]);

    return (
        <section className="w-full py-20 px-6 md:px-12 lg:px-24 flex flex-col items-center overflow-hidden">
            {/* Title — slightly higher */}
            <div className="max-w-4xl w-full text-center mb-8">
                <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-playfair)] text-cv-text-primary tracking-tight">
                    Understand what truly happens.
                </h2>
            </div>

            {/* Selector buttons — centered horizontal pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
                {targets.map(target => {
                    const isActive = activeTarget === target.id;
                    return (
                        <button
                            key={target.id}
                            onClick={() => handleSelect(target.id)}
                            onMouseEnter={() => handleHover(target.id)}
                            onMouseLeave={handleHoverEnd}
                            className={`px-6 py-2.5 rounded-full text-base transition-all duration-300 cursor-pointer ${
                                isActive
                                    ? 'bg-white/25 backdrop-blur-sm font-semibold text-cv-text-primary'
                                    : 'font-normal text-cv-text-secondary hover:bg-white/10'
                            }`}
                            style={{
                                transform: isActive ? 'scale(1.05)' : 'scale(1)',
                                transformOrigin: 'center center',
                            }}
                        >
                            {target.label}
                        </button>
                    );
                })}
            </div>

            {/* Content area — fixed min-height prevents layout shift */}
            <div className="w-full max-w-7xl mx-auto" style={{ minHeight: `${CARD_HEIGHT + 40}px` }}>
                <AnimatePresence mode="wait" custom={directionRef.current}>
                    <motion.div
                        key={activeTarget}
                        custom={directionRef.current}
                        variants={contentVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                    >
                        {/* Cards column — 2/3 */}
                        <div className={`md:col-span-8 ${cardsLeft ? 'md:order-1' : 'md:order-2'}`}>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {currentTarget.cards.map((card, i) => (
                                    <motion.div
                                        key={card.id}
                                        custom={i}
                                        variants={cardVariants}
                                        initial="initial"
                                        animate="animate"
                                        className="bg-white/40 backdrop-blur-sm border border-white/30 rounded-2xl p-6 shadow-lg flex flex-col"
                                        style={{ height: `${CARD_HEIGHT}px` }}
                                    >
                                        <div className="text-[11px] font-medium text-cv-text-secondary/70 uppercase tracking-wider mb-3">
                                            {card.title}
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            {card.content}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Text column — 1/3 */}
                        <div className={`md:col-span-4 flex items-center ${cardsLeft ? 'md:order-2' : 'md:order-1'}`}>
                            <motion.div
                                variants={textVariants}
                                initial="initial"
                                animate="animate"
                            >
                                <h3 className="text-xl md:text-2xl font-medium text-cv-text-primary mb-4">
                                    {currentTarget.label}
                                </h3>
                                <p className="text-base md:text-lg font-light text-cv-text-secondary leading-relaxed">
                                    {currentTarget.description}
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Helper text — fixed position, stable anchor */}
            <div className="w-full flex justify-center mt-16 text-[#1a1d21]/30 text-sm font-light tracking-widest uppercase">
                Keep exploring
            </div>
        </section>
    );
};

export default Understand;
