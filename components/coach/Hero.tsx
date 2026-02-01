
import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 pt-12 text-center">
            {/* Header / Logo */}
            <header className="absolute top-12 left-6 md:left-12 lg:left-24 fade-in hidden md:block">
                {/* Logo handling moved to Navbar or kept minimal here if visual continuity needed - keeping minimal placeholder hidden if Navbar present? 
             Request said "Place the Coach Voice logo in the top-left (use the official provided asset)" in previous turn, 
             but now "Left side - Coach Voice logo on the far left" in Sticky Nav. 
             If Sticky Nav is always visible, maybe we don't need it here. 
             However, let's keep it clean or remove if redundant. 
             The request said "Hero content... center", likely implying the Logo might move to Nav.
             Let's hide header here to rely on Sticky Nav for logo.
         */}
            </header>

            {/* Main Content */}
            <div className="flex flex-col items-center max-w-4xl pt-24 md:pt-0">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] mb-12 text-cv-text-primary fade-in-up" style={{ animationDelay: '0.2s' }}>
                    Coach Voice helps you slow down, listen back, and understand what truly happens in your sessions.
                </h1>

                {/* CTA Card */}
                <div className="fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <button className="group relative bg-cv-accent hover:bg-cv-teal-hover transition-all duration-500 ease-out rounded-2xl p-8 text-left shadow-2xl hover:shadow-3xl hover:-translate-y-1 w-full max-w-sm">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xl md:text-2xl font-medium text-white">Take Action</span>
                            <ArrowRight className="text-white/80 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <p className="text-white/80 text-sm md:text-base font-light">
                            A private conversation to understand your coaching environment.
                        </p>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
