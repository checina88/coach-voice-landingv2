'use client';

import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/60 backdrop-blur-md shadow-sm border-b border-white/20 py-4'
                : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Logo */}
                <div className="font-sans font-bold text-xl tracking-tight text-cv-text-primary">
                    Coach Voice
                </div>

                {/* Menu Items */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-cv-text-secondary">
                    <a href="#" className="hover:text-cv-text-primary transition-colors">About Us</a>
                    <a href="#" className="hover:text-cv-text-primary transition-colors">Features</a>
                    <a href="#" className="hover:text-cv-text-primary transition-colors">How it works</a>
                    <a href="#" className="hover:text-cv-text-primary transition-colors">Book</a>

                    <button className="px-5 py-2 rounded-full bg-white/50 hover:bg-white/80 border border-white/20 text-cv-text-primary transition-all shadow-sm hover:shadow">
                        Make a call
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
