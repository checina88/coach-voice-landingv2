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
                ? 'bg-glass py-4'
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

                    <button className="px-5 py-2 rounded-full bg-cv-accent hover:bg-cv-teal-hover text-white transition-all shadow-md hover:shadow-lg">
                        Take Action
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
