"use client";

import { useEffect, useState } from "react";

export default function CosmicBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-cosmic-black" />

            {/* Radial Gradient for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(2,245,132,0.03),transparent_50%)]" />

            {/* Stars - using CSS gradients for performance */}
            <div className="absolute inset-0 opacity-40"
                style={{
                    backgroundImage: `radial-gradient(1px 1px at 20px 30px, #fff, transparent),
            radial-gradient(1px 1px at 40px 70px, #fff, transparent),
            radial-gradient(1px 1px at 50px 160px, #fff, transparent),
            radial-gradient(1.5px 1.5px at 90px 40px, #fff, transparent),
            radial-gradient(1px 1px at 130px 80px, #fff, transparent),
            radial-gradient(1.5px 1.5px at 160px 120px, #fff, transparent)`,
                    backgroundSize: "350px 350px",
                    animation: "pulse-slow 8s linear infinite"
                }}
            />

            <div className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: `radial-gradient(1px 1px at 80px 10px, #fff, transparent),
              radial-gradient(1px 1px at 120px 150px, #fff, transparent),
              radial-gradient(1.5px 1.5px at 200px 30px, #fff, transparent)`,
                    backgroundSize: "250px 250px",
                    transform: "rotate(20deg)",
                    animation: "pulse 6s linear infinite"
                }}
            />
        </div>
    );
}
