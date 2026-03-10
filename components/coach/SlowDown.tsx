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

const RADIUS = 480;
const CARD_COUNT = cards.length;
const ANGLE_PER_CARD = 360 / CARD_COUNT;
const FRICTION = 0.94;
const MIN_VELOCITY = 0.01;

const SlowDown = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rotationRef = useRef(0);
    const velocityRef = useRef(0);
    const rafRef = useRef<number>(0);
    const isDraggingRef = useRef(false);
    const lastPointerXRef = useRef(0);
    const [rotation, setRotation] = useState(0);

    // Focus easing: compress center angles, widen the "focus zone"
    const focusEase = useCallback((angle: number): number => {
        const sign = Math.sign(angle);
        const abs = Math.abs(angle);
        return sign * Math.pow(abs / 180, 0.75) * 180;
    }, []);

    // Animation loop for momentum
    const animate = useCallback(() => {
        if (!isDraggingRef.current && Math.abs(velocityRef.current) > MIN_VELOCITY) {
            velocityRef.current *= FRICTION;
            rotationRef.current += velocityRef.current;
            setRotation(rotationRef.current);
        } else if (!isDraggingRef.current) {
            velocityRef.current = 0;
        }
        rafRef.current = requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        rafRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafRef.current);
    }, [animate]);

    // Wheel handler
    const handleWheel = useCallback((e: WheelEvent) => {
        e.preventDefault();
        const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
        velocityRef.current += delta * 0.015;
        rotationRef.current += delta * 0.015;
        setRotation(rotationRef.current);
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

    // Attach wheel listener with passive: false
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        el.addEventListener('wheel', handleWheel, { passive: false });
        return () => el.removeEventListener('wheel', handleWheel);
    }, [handleWheel]);

    return (
        <section className="w-full py-32 flex flex-col justify-center overflow-hidden relative">
            {/* Title Section */}
            <div className="px-6 md:px-12 lg:px-24 mb-24 text-center relative z-10">
                <div className="max-w-2xl mx-auto fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-playfair)] mb-6 text-cv-text-primary tracking-tight">
                        Slow down
                    </h2>
                    <p className="text-xl md:text-2xl text-cv-text-secondary font-light leading-relaxed">
                        Create space between what happens and how you respond.
                    </p>
                </div>
            </div>

            {/* 3D Wheel Container */}
            <div
                ref={containerRef}
                className="relative w-full h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
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

                        // Apply focus easing
                        const easedAngle = focusEase(normalizedAngle);

                        const rad = (easedAngle * Math.PI) / 180;
                        const x = RADIUS * Math.sin(rad);
                        const z = RADIUS * Math.cos(rad) - RADIUS;

                        // Scale tiers
                        const absAngle = Math.abs(normalizedAngle);
                        let scale: number;
                        let blur: number;

                        if (absAngle < 20) {
                            // Center card
                            scale = 1;
                            blur = 0;
                        } else if (absAngle < 55) {
                            // Side cards
                            const t = (absAngle - 20) / 35;
                            scale = 1 - t * 0.15; // 1 → 0.85
                            blur = t * 1.5;
                        } else {
                            // Back cards
                            const t = Math.min((absAngle - 55) / 50, 1);
                            scale = 0.85 - t * 0.15; // 0.85 → 0.7
                            blur = 1.5 + t * 3;
                        }

                        const opacity = absAngle > 110 ? Math.max(0, 1 - (absAngle - 110) / 30) : 1;
                        const brightness = absAngle > 40 ? Math.max(0.7, 1 - (absAngle - 40) / 200) : 1;
                        const isVisible = opacity > 0.02;

                        return (
                            <div
                                key={card.id}
                                className="absolute top-1/2 left-1/2 w-[300px] md:w-[360px]"
                                style={{
                                    transform: `translate(-50%, -50%) translate3d(${x}px, 0px, ${z}px) scale(${scale})`,
                                    zIndex: Math.round((z + RADIUS) * 10),
                                    opacity,
                                    filter: `blur(${blur}px) brightness(${brightness})`,
                                    visibility: isVisible ? 'visible' : 'hidden',
                                    willChange: 'transform, opacity',
                                    pointerEvents: absAngle < 25 ? 'auto' : 'none',
                                }}
                            >
                                <div className="w-full h-[300px] bg-white/40 backdrop-blur-xl border border-white/40 rounded-3xl p-8 flex flex-col justify-between shadow-xl">
                                    <div className="flex justify-between items-start">
                                        <span className="text-4xl font-light text-[#1a1d21]/15">{String(card.id).padStart(2, '0')}</span>
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

            <div className="w-full flex justify-center mt-8 text-[#1a1d21]/30 text-sm font-light tracking-widest uppercase">
                Scroll or drag to explore
            </div>
        </section>
    );
};

export default SlowDown;
