
'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';

const originalCards = [
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

// Triplicate the array for infinite illusion
const infiniteCards = [...originalCards, ...originalCards, ...originalCards];

const SlowDown = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Initial scroll positioning and infinite loop logic
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleInfiniteScroll = () => {
            if (!container) return;

            const maxScrollLeft = container.scrollWidth - container.clientWidth;
            const oneSetWidth = container.scrollWidth / 3;

            // If scrolled near the START (left), jump forward to middle set
            if (container.scrollLeft < 50) {
                container.scrollLeft += oneSetWidth;
            }
            // If scrolled near the END (right), jump backward to middle set
            else if (container.scrollLeft > maxScrollLeft - 50) {
                container.scrollLeft -= oneSetWidth;
            }
        };

        container.addEventListener('scroll', handleInfiniteScroll);

        // Start in the middle set
        // Need a slight delay or layout readiness for accurate scrollWidth
        const initScroll = () => {
            const oneSetWidth = container.scrollWidth / 3;
            // Center the middle set roughly
            container.scrollLeft = oneSetWidth + (oneSetWidth / 2) - (container.clientWidth / 2);
        };

        // Try immediately and slightly after layout
        initScroll();
        setTimeout(initScroll, 100);

        return () => container.removeEventListener('scroll', handleInfiniteScroll);
    }, []);

    return (
        <section className="w-full py-24 flex flex-col justify-center overflow-hidden">
            {/* Title Section */}
            <div className="px-6 md:px-12 lg:px-24 mb-16 text-center">
                <div className="max-w-2xl mx-auto fade-in-up" style={{ animationDelay: '0.6s' }}>
                    <h2 className="text-3xl md:text-4xl font-light mb-6 text-cv-text-primary">
                        Slow down
                    </h2>
                    <p className="text-xl md:text-2xl text-cv-text-secondary font-light leading-relaxed">
                        Create space between what happens and how you respond.
                    </p>
                </div>
            </div>

            {/* Circular Carousel Track */}
            <div
                ref={containerRef}
                className="flex overflow-x-auto gap-12 px-[50vw] pb-16 pt-12 snap-x snap-mandatory scrollbar-hide items-center w-full"
                style={{
                    scrollBehavior: 'auto', // disable smooth scroll for the instant jump to work invisible
                    perspective: '1000px' // Add perspective for 3D feel if we want
                }}
            >
                {infiniteCards.map((card, index) => (
                    // Using index as key is necessary here because IDs are duplicated
                    <FoggyCard key={`${card.id}-${index}`} card={card} index={index + 1} containerRef={containerRef} />
                ))}
            </div>
        </section>
    );
};

const FoggyCard = ({ card, index, containerRef }: { card: any, index: number, containerRef: React.RefObject<HTMLDivElement | null> }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState({ opacity: 0.5, filter: 'blur(4px)', transform: 'scale(0.8)', zIndex: 1 });

    const updateStyle = useCallback(() => {
        if (!containerRef.current || !cardRef.current) return;

        const container = containerRef.current;
        const cardEl = cardRef.current;
        const containerRect = container.getBoundingClientRect();
        const cardRect = cardEl.getBoundingClientRect();

        const containerCenter = containerRect.left + containerRect.width / 2;
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(containerCenter - cardCenter);

        // Distance at which card becomes fully "background"
        const maxDist = containerRect.width / 2; // Roughly half screen width
        const normalized = Math.min(distance / maxDist, 1); // 0 (center) to 1 (edge)

        // Depth Logic (User Spec):
        // Center: Scale 1, Blur 0, Opacity 1
        // Edge: Scale 0.75, Blur 6px, Opacity 0.4
        // Circular illusion: Cards shrink and disappear "behind" on exit.

        const scale = 1 - (normalized * 0.25); // 1 -> 0.75
        const blur = normalized * 6;           // 0 -> 6px
        const opacity = 1 - (normalized * 0.6); // 1 -> 0.4

        // Z-index layer: Center is highest, edges drop back
        const zIndex = Math.round((1 - normalized) * 100);

        setStyle({
            opacity,
            filter: `blur(${blur}px)`,
            transform: `scale(${scale})`, // Just scale, no 3D rotate to keep it "calm" but "deep"
            zIndex
        });
    }, [containerRef]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const onScroll = () => requestAnimationFrame(updateStyle);

        container.addEventListener('scroll', onScroll);
        window.addEventListener('resize', onScroll);

        // Initial calc
        updateStyle();

        return () => {
            container.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [containerRef, updateStyle]);

    return (
        <div
            ref={cardRef}
            className="flex-shrink-0 w-[80vw] md:w-[400px] h-[320px] snap-center bg-glass rounded-2xl p-8 flex flex-col justify-between transition-all duration-75 ease-out hover:bg-glass-heavy shadow-lg"
            style={{
                opacity: style.opacity,
                filter: style.filter,
                transform: style.transform,
                zIndex: style.zIndex,
                willChange: 'opacity, filter, transform'
            }}
        >
            <div className="flex justify-between items-start">
                <span className="text-4xl font-light text-cv-text-secondary/30">{String(card.id).padStart(2, '0')}</span>
            </div>
            <div>
                <h3 className="text-2xl font-normal text-cv-text-primary mb-3">{card.title}</h3>
                <p className="text-cv-text-secondary font-light leading-relaxed">{card.description}</p>
            </div>
        </div>
    )
}

export default SlowDown;
