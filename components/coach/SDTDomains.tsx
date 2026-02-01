
import React from 'react';

const SDTDomains = () => {
    return (
        <section className="w-full py-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-6xl mx-auto">
                <div className="mb-16 text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-light text-white mb-4">SDT domains</h2>
                    <p className="text-xl text-white/80 font-light">How Self-Determination Theory translates into your conversations.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Autonomy */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-colors">
                        <div className="text-5xl font-light text-white mb-4">72</div>
                        <h3 className="text-xl font-medium text-white mb-2">Autonomy</h3>
                        <p className="text-white/70 text-sm font-light leading-relaxed">
                            Encouraging players to make their own choices.
                        </p>
                    </div>

                    {/* Competence */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-colors">
                        <div className="text-5xl font-light text-white mb-4">87</div>
                        <h3 className="text-xl font-medium text-white mb-2">Competence</h3>
                        <p className="text-white/70 text-sm font-light leading-relaxed">
                            Providing feedback that builds capability.
                        </p>
                    </div>

                    {/* Relatedness */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-colors">
                        <div className="text-5xl font-light text-white mb-4">73</div>
                        <h3 className="text-xl font-medium text-white mb-2">Relatedness</h3>
                        <p className="text-white/70 text-sm font-light leading-relaxed">
                            Fostering a sense of belonging and connection.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SDTDomains;
