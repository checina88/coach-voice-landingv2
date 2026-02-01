'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const states = [
    {
        id: 'overview',
        title: 'Session snapshot',
        trigger: 'Capture moment',
        content: (
            <div className="flex flex-col gap-3 h-full justify-center">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '60%' }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="h-full bg-cv-accent"
                        />
                    </div>
                    <span className="text-xs text-white/40 font-mono">60% Coach</span>
                </div>
                <div className="w-full h-12 flex items-center gap-1 opacity-50">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="flex-1 bg-white/20 rounded-sm" style={{ height: `${Math.random() * 100}%` }}></div>
                    ))}
                </div>
            </div>
        )
    },
    {
        id: 'patterns',
        title: 'Feedback patterns',
        trigger: 'Notice patterns',
        content: (
            <div className="flex flex-col gap-3 h-full justify-center">
                <div className="space-y-2">
                    <div className="flex justify-between text-xs text-white/60">
                        <span>Autonomy-supportive</span>
                        <span className="text-cv-accent">High</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full">
                        <div className="w-[80%] h-full bg-cv-accent rounded-full opacity-80"></div>
                    </div>

                    <div className="flex justify-between text-xs text-white/60">
                        <span>Controlling</span>
                        <span className="text-rose-400">Low</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full">
                        <div className="w-[20%] h-full bg-rose-400 rounded-full opacity-80"></div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 'sdt',
        title: 'SDT insight',
        trigger: 'Discover meaning',
        content: (
            <div className="grid grid-cols-3 gap-2 h-full items-center">
                {['Autonomy', 'Competence', 'Relatedness'].map((label, i) => (
                    <div key={label} className="bg-white/5 rounded-lg p-2 text-center border border-white/5">
                        <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1">{label}</div>
                        <div className="text-lg font-light text-white/90">{8 - i}/10</div>
                    </div>
                ))}
                <div className="col-span-3 mt-2 text-xs text-white/60 font-light text-center border-t border-white/5 pt-2">
                    "High autonomy support correlates with player engagement."
                </div>
            </div>
        )
    },
    {
        id: 'action',
        title: 'Action framing',
        trigger: 'Move forward',
        content: (
            <div className="flex flex-col h-full justify-center gap-4">
                <div className="bg-cv-accent/10 border border-cv-accent/20 p-3 rounded-lg">
                    <p className="text-sm font-light text-cv-text-primary leading-relaxed">
                        "Consider asking more open questions in the first 10 minutes."
                    </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-cv-accent/80">
                    <div className="w-2 h-2 rounded-full bg-cv-accent animate-pulse"></div>
                    <span>Suggested focus area</span>
                </div>
            </div>
        )
    }
];

const InsightSystem = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % states.length);
        }, 5000); // Cycle every 5 seconds (slow, deliberate)
        return () => clearInterval(interval);
    }, []);

    const activeState = states[activeIndex];

    return (
        <div className="relative w-full aspect-square max-w-[500px] flex items-center justify-center p-8">
            {/* Technical Frame */}
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />

            {/* Corner Markers for "Technical" Feel */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/20 rounded-tl-3xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/20 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/20 rounded-bl-3xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/20 rounded-br-3xl" />

            {/* Central Insight Card */}
            <div className="relative w-full h-full bg-[#0F1412] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
                {/* Card Header */}
                <div className="h-12 border-b border-white/5 flex items-center justify-between px-6 bg-white/2">
                    <span className="text-sm font-medium text-white/70 tracking-wide">
                        {activeState.title}
                    </span>
                    <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                        <div className="w-2 h-2 rounded-full bg-white/20" />
                    </div>
                </div>

                {/* Card Content (Animated) */}
                <div className="flex-1 p-6 relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeState.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="h-full"
                        >
                            {activeState.content}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Nodes Logic - Visual Only for now, placed simply */}
            {/* We can place nodes absolutely around the frame if needed, or keep it simple as requested: "Technical frame... looks like a system diagram" */}
            {/* Let's replicate the 'Nodes positioned along frame edges' roughly */}

            <div className="absolute -right-4 top-1/4 flex items-center gap-3">
                <span className={`text-[10px] uppercase tracking-widest transition-colors duration-1000 ${activeIndex === 0 ? 'text-cv-accent' : 'text-white/20'}`}>Capture</span>
                <div className={`w-2 h-2 rounded-full transition-all duration-1000 ${activeIndex === 0 ? 'bg-cv-accent shadow-[0_0_10px_rgba(94,234,212,0.5)]' : 'bg-white/10'}`} />
            </div>

            <div className="absolute -left-4 top-1/2 flex items-center gap-3 flex-row-reverse">
                <span className={`text-[10px] uppercase tracking-widest transition-colors duration-1000 ${activeIndex === 1 ? 'text-cv-accent' : 'text-white/20'}`}>Pattern</span>
                <div className={`w-2 h-2 rounded-full transition-all duration-1000 ${activeIndex === 1 ? 'bg-cv-accent shadow-[0_0_10px_rgba(94,234,212,0.5)]' : 'bg-white/10'}`} />
            </div>

            <div className="absolute -right-4 bottom-1/4 flex items-center gap-3">
                <span className={`text-[10px] uppercase tracking-widest transition-colors duration-1000 ${activeIndex === 2 ? 'text-cv-accent' : 'text-white/20'}`}>Meaning</span>
                <div className={`w-2 h-2 rounded-full transition-all duration-1000 ${activeIndex === 2 ? 'bg-cv-accent shadow-[0_0_10px_rgba(94,234,212,0.5)]' : 'bg-white/10'}`} />
            </div>

            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <div className={`w-2 h-2 rounded-full transition-all duration-1000 ${activeIndex === 3 ? 'bg-cv-accent shadow-[0_0_10px_rgba(94,234,212,0.5)]' : 'bg-white/10'}`} />
                <span className={`text-[10px] uppercase tracking-widest transition-colors duration-1000 ${activeIndex === 3 ? 'text-cv-accent' : 'text-white/20'}`}>Action</span>
            </div>

        </div>
    );
};

export default InsightSystem;
