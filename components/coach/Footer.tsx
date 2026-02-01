
import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full py-12 px-6 md:px-12 lg:px-24 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
                <div className="text-sm text-white/60 font-light">
                    &copy; {new Date().getFullYear()} Coach Voice. All rights reserved.
                </div>

                <div className="flex flex-wrap justify-center gap-6 text-sm text-white/60 font-light">
                    <a href="#" className="hover:text-white transition-colors">Contact</a>
                    <a href="#" className="hover:text-white transition-colors">FAQ</a>
                    <a href="#" className="hover:text-white transition-colors">Methodology</a>
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
