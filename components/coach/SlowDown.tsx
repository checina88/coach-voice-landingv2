'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';

/* ── Inline SVG Icons (thin stroke, monochrome) ── */
const CompassIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" />
    </svg>
);

const MicrophoneIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
);

const CloudUploadIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
        <path d="M12 12v9" />
        <path d="m16 16-4-4-4 4" />
    </svg>
);

const PauseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="10" y1="15" x2="10" y2="9" />
        <line x1="14" y1="15" x2="14" y2="9" />
    </svg>
);

const ChartIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
    </svg>
);

const LightbulbIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
    </svg>
);

const PathArrowIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
    </svg>
);

const cardIcons = [CompassIcon, MicrophoneIcon, CloudUploadIcon, PauseIcon, ChartIcon, LightbulbIcon, PathArrowIcon];
const cardBgColors = ['#F4F8F6', '#E9F2EE', '#EDF5F1', '#E2ECE7', '#F1F7F4', '#E9F2EE', '#F4F8F6'];

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
        description: "Upload the recording and return to it when you're ready."
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
        description: "Use what you've learned to guide your next session with confidence and direction."
    }
];

const RADIUS = 300;
const CARD_COUNT = cards.length;
const ANGLE_PER_CARD = 360 / CARD_COUNT;
const FRICTION = 0.92;
const MIN_VELOCITY = 0.01;
const AUTO_SPEED = 0.06;

const SlowDown = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rotationRef = useRef(0);
    const velocityRef = useRef(0);
    const rafRef = useRef<number>(0);
    const isDraggingRef = useRef(false);
    const lastPointerXRef = useRef(0);
    const [rotation, setRotation] = useState(0);

    // Animation loop: base rotation ALWAYS runs, user momentum decays on top
    const animate = useCallback(() => {
        // Base auto-rotation — constant, never stops
        rotationRef.current += AUTO_SPEED;

        // Decay user momentum when not dragging
        if (!isDraggingRef.current && Math.abs(velocityRef.current) > MIN_VELOCITY) {
            velocityRef.current *= FRICTION;
            rotationRef.current += velocityRef.current;
        } else if (!isDraggingRef.current) {
            velocityRef.current = 0;
        }

        setRotation(rotationRef.current);
        rafRef.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        rafRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafRef.current);
    }, [animate]);

    // Wheel handler — ONLY respond to horizontal scroll (deltaX)
    const handleWheel = useCallback((e: WheelEvent) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX) * 1.5) return;
        if (Math.abs(e.deltaX) > 2) {
            e.preventDefault();
            velocityRef.current += e.deltaX * 0.015;
            rotationRef.current += e.deltaX * 0.015;
            setRotation(rotationRef.current);
        }
    }, []);

    // Pointer handlers for drag
    const handlePointerDown = useCallback((e: React.PointerEvent) => {
        isDraggingRef.current = true;
        lastPointerXRef.current = e.clientX;
        velocityRef.current = 0;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    }, []);

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        if (!isDraggingRef.current) return;
        const dx = e.clientX - lastPointerXRef.current;
        lastPointerXRef.current = e.clientX;
        const delta = -dx * 0.12;
        velocityRef.current = delta;
        rotationRef.current += delta;
        setRotation(rotationRef.current);
    }, []);

    const handlePointerUp = useCallback(() => {
        isDraggingRef.current = false;
    }, []);

    // Attach wheel listener with passive: false so we can conditionally preventDefault
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        el.addEventListener('wheel', handleWheel, { passive: false });
        return () => el.removeEventListener('wheel', handleWheel);
    }, [handleWheel]);

    return (
        <section className="w-full pt-16 pb-12 flex flex-col justify-center overflow-hidden relative">
            {/* Title Section — tighter spacing */}
            <div className="px-6 md:px-12 lg:px-24 mb-6 text-center relative z-10">
                <div className="max-w-2xl mx-auto fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-playfair)] mb-4 text-cv-text-primary tracking-tight">
                        Slow down
                    </h2>
                    <p className="text-xl md:text-2xl text-cv-text-secondary font-light leading-relaxed">
                        Create space between what happens and how you respond.
                    </p>
                </div>
            </div>

            {/* 3D Wheel Container — reduced height */}
            <div
                ref={containerRef}
                className="relative w-full h-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
            >
                <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '2000px' }}>
                    {cards.map((card, index) => {
                        const cardAngleOffset = ANGLE_PER_CARD * index;
                        const rawAngle = cardAngleOffset - rotation;
                        const normalizedAngle = ((rawAngle % 360) + 540) % 360 - 180;

                        // Direct angle → position (no focus easing = constant linear speed)
                        const rad = (normalizedAngle * Math.PI) / 180;
                        const x = RADIUS * Math.sin(rad);
                        const z = RADIUS * Math.cos(rad) - RADIUS;

                        // ── Continuous interpolation — NO discrete tiers ──
                        const absAngle = Math.abs(normalizedAngle);
                        const t = absAngle / 180; // 0 at front, 1 at back

                        // Smooth scale: 1.04 (center) → 0.70 (back)
                        const scale = 1.04 - 0.34 * t;

                        // Smooth opacity: cosine falloff for natural feel
                        const opacity = Math.max(0, (1 + Math.cos(t * Math.PI)) / 2);

                        // Smooth blur: linear increase
                        const blur = t * 5;

                        // Continuous shadow depth
                        const shadowSpread = 8 + (1 - t) * 12;
                        const shadowBlur = 24 + (1 - t) * 16;
                        const shadowAlpha = 0.03 + (1 - t) * 0.05;

                        const isVisible = opacity > 0.02;
                        const IconComponent = cardIcons[index];
                        const bgColor = cardBgColors[index];

                        return (
                            <div
                                key={card.id}
                                className="absolute top-1/2 left-1/2 w-[300px] md:w-[360px]"
                                style={{
                                    transform: `translate(-50%, -50%) translate3d(${x}px, 0px, ${z}px) scale(${scale})`,
                                    zIndex: Math.round((z + RADIUS) * 10),
                                    opacity,
                                    filter: blur > 0.2 ? `blur(${blur}px)` : 'none',
                                    visibility: isVisible ? 'visible' : 'hidden',
                                    willChange: 'transform, opacity',
                                    pointerEvents: absAngle < 25 ? 'auto' : 'none',
                                }}
                            >
                                <div
                                    className="w-full h-[300px] backdrop-blur-xl border border-white/50 rounded-3xl p-8 flex flex-col justify-between"
                                    style={{
                                        backgroundColor: bgColor,
                                        boxShadow: `0 ${shadowSpread}px ${shadowBlur}px rgba(0,0,0,${shadowAlpha})`,
                                    }}
                                >
                                    <div className="flex justify-between items-start">
                                        <span className="text-4xl font-light text-[#1a1d21]/15">{String(card.id).padStart(2, '0')}</span>
                                        <div className="text-[#1a1d21]/25">
                                            <IconComponent />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-normal text-[#1a1d21] mb-3">{card.title}</h3>
                                        <p className="text-[#475569] font-light leading-relaxed text-sm md:text-base">{card.description}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Helper text — always visible */}
            <div className="w-full flex justify-center mt-2 text-[#1a1d21]/30 text-sm font-light tracking-widest uppercase">
                Swipe or drag to explore
            </div>
        </section>
    );
};

export default SlowDown;
