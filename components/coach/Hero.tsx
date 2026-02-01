import React from 'react';
import { ArrowRight } from 'lucide-react';
import InsightSystem from './InsightSystem';

const Hero = () => {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 pt-24 md:pt-0 overflow-hidden">
            <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* LEFT SIDE: Message & Invitation */}
                <div className="flex flex-col items-start text-left space-y-8 z-10">
                    <h1 className="text-4xl lg:text-5xl font-light tracking-tight leading-[1.1] text-cv-text-primary fade-in-up" style={{ animationDelay: '0.1s' }}>
                        Coach Voice helps you slow down, listen back, and understand what’s really happening in your sessions.
                    </h1>

                    <div className="flex flex-col items-start gap-4 fade-in-up" style={{ animationDelay: '0.3s' }}>
                        <button className="px-8 py-3 bg-cv-accent hover:bg-cv-teal-hover text-white text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group">
                            Take Action
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <p className="text-sm text-cv-text-secondary/80 font-light">
                            A private conversation to understand your coaching environment.
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE: Technological Insight System */}
                <div className="flex items-center justify-center relative fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <InsightSystem />

                    {/* Background Glow for visual depth (optional) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-cv-accent/5 blur-[100px] rounded-full pointer-events-none" />
                </div>

            </div>
        </section>
    );
};

export default Hero;
