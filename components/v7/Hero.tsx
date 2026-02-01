"use client";

import { motion } from "framer-motion";
import { ArrowRight, Database, Layout, Smartphone, Zap } from "lucide-react";
import Image from "next/image";

export default function HeroV7() {
    return (
        <section className="relative w-full min-h-[90vh] bg-alokai-white flex items-center overflow-hidden pt-20">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.4]"
                style={{
                    backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left: Content */}
                <div className="flex flex-col gap-6 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-alokai-green/10 text-alokai-green-dim font-semibold text-sm tracking-wide mb-4 border border-alokai-green/20">
                            ENTERPRISE GRADE SPORTS TECH
                        </span>
                        <h1 className="text-5xl lg:text-7xl font-bold text-alokai-text-primary leading-tight tracking-tight">
                            The Headless <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-alokai-green to-alokai-blue-primary">
                                Frontend for Sports
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-xl text-alokai-text-secondary leading-relaxed"
                    >
                        Build your sports legacy on a <span className="font-semibold text-alokai-text-primary">unified composable stack</span>.
                        Connect training, medical, and scouting data into one seamless interface for athletes and staff.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-wrap gap-4 mt-4"
                    >
                        <button className="px-8 py-4 bg-alokai-green text-black font-bold rounded-lg hover:bg-alokai-green-dim transition-all shadow-lg shadow-alokai-green/20 flex items-center gap-2">
                            Request Demo
                            <ArrowRight size={20} />
                        </button>
                        <button className="px-8 py-4 bg-white text-alokai-text-primary font-bold rounded-lg border border-alokai-border hover:bg-alokai-gray transition-all">
                            View Documentation
                        </button>
                    </motion.div>

                    <div className="mt-8 pt-8 border-t border-alokai-border flex gap-8">
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold text-alokai-text-primary">50%</span>
                            <span className="text-sm text-alokai-text-secondary">Faster Planning</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold text-alokai-text-primary">100+</span>
                            <span className="text-sm text-alokai-text-secondary">Integrations</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold text-alokai-text-primary">0ms</span>
                            <span className="text-sm text-alokai-text-secondary">Data Latency</span>
                        </div>
                    </div>
                </div>

                {/* Right: Architectural Diagram */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative h-[600px] w-full hidden lg:flex items-center justify-center"
                >
                    {/* Abstract "Platform" Base */}
                    <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-alokai-gray to-white rounded-full border border-alokai-border flex items-center justify-center shadow-2xl">
                        {/* Animated Rings */}
                        <div className="absolute inset-0 border border-alokai-green/10 rounded-full animate-[spin_10s_linear_infinite]" />
                        <div className="absolute inset-40 border border-alokai-blue-primary/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                    </div>

                    {/* Central Hub */}
                    <div className="relative z-20 w-32 h-32 bg-white rounded-2xl shadow-xl border border-alokai-green/50 flex flex-col items-center justify-center p-4">
                        <Layout size={40} className="text-alokai-green mb-2" />
                        <span className="text-xs font-bold text-alokai-text-primary">CORE ENGINE</span>
                    </div>

                    {/* Satellites */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-20 right-20 z-20 w-24 h-24 bg-white rounded-xl shadow-lg border border-alokai-border flex flex-col items-center justify-center"
                    >
                        <Database size={24} className="text-alokai-blue-primary mb-2" />
                        <span className="text-[10px] font-bold text-alokai-text-secondary">DATA LAYER</span>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-32 left-10 z-20 w-24 h-24 bg-white rounded-xl shadow-lg border border-alokai-border flex flex-col items-center justify-center"
                    >
                        <Smartphone size={24} className="text-electric-purple mb-2" />
                        <span className="text-[10px] font-bold text-alokai-text-secondary">MOBILE APP</span>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute bottom-20 right-40 z-20 w-24 h-24 bg-white rounded-xl shadow-lg border border-alokai-border flex flex-col items-center justify-center"
                    >
                        <Zap size={24} className="text-holographic-gold mb-2" />
                        <span className="text-[10px] font-bold text-alokai-text-secondary">REAL-TIME</span>
                    </motion.div>

                    {/* Connecting Lines (SVG) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                        {/* Lines would go here, simpler to just visualize nodes floating for now */}
                        <line x1="50%" y1="50%" x2="75%" y2="25%" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" />
                        <line x1="50%" y1="50%" x2="25%" y2="65%" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" />
                        <line x1="50%" y1="50%" x2="70%" y2="75%" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" />
                    </svg>

                </motion.div>
            </div>
        </section>
    );
}
