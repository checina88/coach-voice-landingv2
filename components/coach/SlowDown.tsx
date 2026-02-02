'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';

const cards = [
    {
        id: 1,
        title: "Set an intention",
        description: "Clarify what you want to support, encourage, or develop before stepping into the session."
    },
    {
        id: 2,
        title: "Capture the moment",
        description: "Record your coaching session as it naturally unfolds."
    },
    {
        id: 3,
        title: "Bring it in",
        description: "Upload the recording and return to it when you’re ready."
    },
    {
        id: 4,
        title: "Reflect on your session",
        description: "Take a step back and revisit the session with distance and perspective."
    },
    {
        id: 5,
        title: "Notice the patterns",
        description: "Automated analysis reveals how communication flows."
    },
    {
        id: 6,
        title: "Discover what matters",
        description: "Key moments are translated into meaningful insights."
    },
    {
        id: 7,
        title: "Move forward with clarity",
        description: "Use what you’ve learned to guide your next session with confidence and direction."
    }
];

const SlowDown = () => {
    const scrollDriverRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState(0);
    const [isInteracting, setIsInteracting] = useState(false);

    // Params for the 3D wheel
    const RADIUS = 800; // Increased radius for flatter, less curved look
    const VISIBLE_ARC = 100; // Degrees of the circle visible at once

    // Handle scroll to rotation mapping
    const handleScroll = useCallback(() => {
        if (!scrollDriverRef.current) return;
        const scrollLeft = scrollDriverRef.current.scrollLeft;
        const maxScroll = scrollDriverRef.current.scrollWidth - scrollDriverRef.current.clientWidth;

        // Map scroll to total rotation (allows multiple loops if we want, or just one big one)
        // Let's make it infinite scroll feel by managing the scroll position reset

        // Simple mapping first: 1px = 0.1 degree
        const newRotation = scrollLeft * 0.05;
        setRotation(newRotation);
        setIsInteracting(true);

        // Reset interaction flag after a delay to resume auto-rotation if we had one (optional, user didn't ask for auto-play but it's nice)
        // For now, stick to user control only as requested ("Interaction feels native and intentional")
    }, []);

    // Infinite scroll loop logic (reset scroll position when reaching ends)
    useEffect(() => {
        const driver = scrollDriverRef.current;
        if (!driver) return;

        const checkInfinite = () => {
            if (driver.scrollLeft <= 100) {
                // Too far left, jump to middle
                driver.scrollLeft = 5000;
            } else if (driver.scrollLeft >= driver.scrollWidth - 500) {
                // Too far right, jump to middle
                driver.scrollLeft = 5000;
            }
        };

        // Initialize in middle
        driver.scrollLeft = 5000;

        driver.addEventListener('scroll', checkInfinite);
        return () => driver.removeEventListener('scroll', checkInfinite);
    }, []);

    useEffect(() => {
        const driver = scrollDriverRef.current;
        if (!driver) return;
        driver.addEventListener('scroll', handleScroll);
        return () => driver.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <section className="w-full py-32 flex flex-col justify-center overflow-hidden relative bg-[#e0e0e0]/20">
            {/* Title Section */}
            <div className="px-6 md:px-12 lg:px-24 mb-24 text-center relative z-10">
                <div className="max-w-2xl mx-auto fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <h2 className="text-3xl md:text-5xl font-light mb-6 text-cv-text-primary tracking-tight">
                        Slow down
                    </h2>
                    <p className="text-xl md:text-2xl text-cv-text-secondary font-light leading-relaxed">
                        Create space between what happens and how you respond.
                    </p>
                </div>
            </div>

            {/* 3D Scene Container */}
            <div className="relative w-full h-[500px] perspective-[2000px] flex items-center justify-center">

                {/* Visual Wheel (Fixed Center) */}
                <div className="relative w-full h-full flex items-center justify-center transform-style-3d">
                    {cards.map((card, index) => {
                        // Calculate position on the wheel
                        // We want equal spacing. 360 / cards.
                        const cardAngleOffset = (360 / cards.length) * index;

                        // Current angle including global rotation
                        // We subtract rotation to make it feel like scrolling right moves wheel left (standard)
                        let rawAngle = cardAngleOffset - rotation;

                        // Normalize angle to -180 to 180 for easier depth logic
                        const normalizedAngle = ((rawAngle % 360) + 540) % 360 - 180;

                        // Calculate Depth (Z) and Lateral (X)
                        // Standard circle math:
                        // x = r * sin(a)
                        // z = r * cos(a)
                        const rad = (normalizedAngle * Math.PI) / 180;
                        const x = RADIUS * Math.sin(rad);
                        const z = RADIUS * Math.cos(rad) - RADIUS; // curve back from 0

                        // Visibility/masking logic based on angle (back of wheel)
                        const isBack = Math.abs(normalizedAngle) > 90;

                        // Dynamic styles
                        const scale = 1 + (z / (RADIUS * 1.5)); // Shrink as it goes back
                        const opacity = Math.max(0, 1 + (z / (RADIUS * 0.8))); // Fade out in back
                        const blur = Math.abs(normalizedAngle) * 0.1; // Blur as angle increases (edges)

                        // Hide items that are too far back to prevent artifacting/clutter
                        const isVisible = opacity > 0.05;

                        return (
                            <div
                                key={card.id}
                                className="absolute top-1/2 left-1/2 w-[340px] md:w-[400px] -ml-[170px] md:-ml-[200px] -mt-[160px] transition-transform duration-75 ease-out"
                                style={{
                                    transform: `translate3d(${x}px, 0, ${z}px) scale(${scale})`,
                                    zIndex: Math.round(scale * 100),
                                    opacity: opacity,
                                    filter: `blur(${blur}px)`,
                                    visibility: isVisible ? 'visible' : 'hidden',
                                }}
                            >
                                <div className="w-full h-[320px] bg-white/40 backdrop-blur-xl border border-white/40 rounded-3xl p-8 flex flex-col justify-between shadow-2xl hover:bg-white/50 transition-colors duration-300">
                                    <div className="flex justify-between items-start">
                                        <span className="text-4xl font-light text-[#1a1d21]/20">{String(card.id).padStart(2, '0')}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-normal text-[#1a1d21] mb-3">{card.title}</h3>
                                        <p className="text-[#475569] font-light leading-relaxed">{card.description}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Scroll Driver (Invisible, handles interaction) */}
            {/* Extremely wide to allow for long scrolling without hitting edges immediately */}
            <div
                ref={scrollDriverRef}
                className="absolute inset-0 overflow-x-auto scrollbar-hide z-50 cursor-grab active:cursor-grabbing"
                style={{ scrollBehavior: 'auto' }}
            >
                <div className="w-[10000vw] h-full pointer-events-none" />
            </div>

            <div className="w-full flex justify-center mt-8 text-[#1a1d21]/30 text-sm font-light tracking-widest uppercase">
                Scroll / Swipe to explore
            </div>
        </section>
    );
};

export default SlowDown;
