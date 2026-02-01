
'use client';

import React, { useRef, useState, useEffect } from 'react';

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
    const containerRef = useRef<HTMLDivElement>(null);

    // Logic to track scroll position for fog effects could go here
    // For now, using CSS-based masks/opacity triggers in child components is reliable
    // But strictly, we need to know "viewport center" vs "edge"

    return (
        <section className="w-full py-24 flex flex-col justify-center overflow-hidden">
            {/* Title Section */}
            <div className="px-6 md:px-12 lg:px-24 mb-16 text-center">
                <div className="max-w-2xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: '0.6s' }}>
                    <h2 className="text-3xl md:text-4xl font-light mb-6 text-cv-text-primary">
                        Slow down
                    </h2>
                    <p className="text-xl md:text-2xl text-cv-text-secondary font-light leading-relaxed">
                        Create space between what happens and how you respond.
                    </p>
                </div>
            </div>

            {/* Merged Horizontal Scroll Track */}
            {/* Starts aligned left (pl-6), specific fog behavior */}
            <div
                ref={containerRef}
                className="flex overflow-x-auto gap-6 px-6 pb-12 pt-4 snap-x snap-mandatory scrollbar-hide items-stretch w-full"
                style={{ scrollBehavior: 'smooth' }}
            >
                {cards.map((card, index) => (
                    <FoggyCard key={card.id} card={card} index={index} containerRef={containerRef} />
                ))}
                {/* Spacer to allow scrolling to the end comfortably */}
                <div className="w-12 flex-shrink-0" />
            </div>
        </section>
    );
};

const FoggyCard = ({ card, index, containerRef }: { card: any, index: number, containerRef: React.RefObject<HTMLDivElement | null> }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [opacity, setOpacity] = useState(0.3);
    const [blur, setBlur] = useState(4);
    const [scale, setScale] = useState(0.95);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current || !cardRef.current) return;

            const container = containerRef.current;
            const card = cardRef.current;
            const containerRect = container.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();

            // Calculate center proximity
            const containerCenter = containerRect.left + containerRect.width / 2;
            const cardCenter = cardRect.left + cardRect.width / 2;
            const distance = Math.abs(containerCenter - cardCenter);

            // Calculate visibility based on distance from center
            // Range: 0 (center) to ~500px (edge)

            const maxDist = containerRect.width / 1.5;
            const normalizedDist = Math.min(distance / maxDist, 1);

            // Focus Logic:
            // Center (dist=0) -> Opacity 1, Blur 0, Scale 1
            // Edge (dist=1) -> Opacity 0.3, Blur 4px, Scale 0.95

            setOpacity(1 - (normalizedDist * 0.7)); // 1 -> 0.3
            setBlur(normalizedDist * 5); // 0 -> 5px
            setScale(1 - (normalizedDist * 0.05)); // 1 -> 0.95
        };

        const container = containerRef.current;
        container?.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();

        return () => container?.removeEventListener('scroll', handleScroll);
    }, [containerRef]);

    return (
        <div
            ref={cardRef}
            className="flex-shrink-0 w-[85vw] md:w-[400px] h-[320px] snap-center glass-panel-calm rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 ease-out hover:bg-white/40 border border-white/30"
            style={{
                opacity: opacity,
                filter: `blur(${blur}px)`,
                transform: `scale(${scale})`,
                willChange: 'opacity, filter, transform'
            }}
        >
            <div className="flex justify-between items-start">
                <span className="text-4xl font-light text-cv-text-secondary/30">{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div>
                <h3 className="text-2xl font-normal text-cv-text-primary mb-3">{card.title}</h3>
                <p className="text-cv-text-secondary font-light leading-relaxed">{card.description}</p>
            </div>
        </div>
    )
}

export default SlowDown;
