'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const valueCards = [
    {
        title: 'Understand your real communication',
        text: 'Discover how your instructions, feedback, and tone are actually perceived by players.',
    },
    {
        title: 'Align staff communication',
        text: 'Ensure coaching messages across teams and staff are consistent and aligned with your development philosophy.',
    },
    {
        title: 'Build a measurable coaching culture',
        text: 'Turn communication into objective insights and scale coaching quality across the organization.',
    },
];

const FeedbackDomains = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

    return (
        <section ref={sectionRef} className="w-full py-28 px-6 md:px-12 lg:px-24 flex flex-col items-center">
            <div className="max-w-5xl w-full">

                {/* Headline */}
                <motion.h2
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="text-3xl md:text-5xl font-[family-name:var(--font-playfair)] text-cv-text-primary tracking-tight text-center mb-16"
                >
                    Make coaching communication visible.
                </motion.h2>

                {/* Quote block */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
                    className="flex gap-6 mb-20 max-w-3xl mx-auto"
                >
                    {/* Thin vertical line */}
                    <div className="w-[2px] bg-cv-accent/40 rounded-full flex-shrink-0" />
                    <p className="text-2xl md:text-3xl font-[family-name:var(--font-playfair)] italic text-cv-text-primary/80 leading-relaxed">
                        What you don&apos;t hear, you can&apos;t improve.
                    </p>
                </motion.div>

                {/* Three value cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {valueCards.map((card, i) => (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 + i * 0.15, ease: 'easeOut' }}
                            className="bg-white/30 backdrop-blur-sm border border-white/30 rounded-2xl p-8 shadow-md hover:shadow-lg hover:bg-white/40 transition-all duration-300"
                        >
                            <h3 className="text-lg font-medium text-cv-text-primary mb-3">
                                {card.title}
                            </h3>
                            <p className="text-sm font-light text-cv-text-secondary leading-relaxed">
                                {card.text}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default FeedbackDomains;
