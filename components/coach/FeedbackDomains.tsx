
import React from 'react';

const domains = [
    { left: "Directive", right: "Non-directive", value: 30 },
    { left: "Controlling", right: "Supportive", value: 75 },
    { left: "Negative", right: "Positive", value: 80 },
    { left: "Demeaning", right: "Respectful", value: 95 },
    { left: "Concise", right: "Elaborated", value: 40 },
    { left: "Individual", right: "Group", value: 60 },
    { left: "Telling", right: "Questioning", value: 25 },
    { left: "General", right: "Specific", value: 70 },
    { left: "Evaluative", right: "Informational", value: 55 },
];

const FeedbackDomains = () => {
    return (
        <section className="w-full py-24 px-6 md:px-12 lg:px-24 flex flex-col items-center">
            <div className="max-w-3xl w-full">
                <h2 className="text-2xl md:text-3xl font-light text-cv-text-primary mb-16 text-center">
                    Explore the feedback from your coaching sessions.
                </h2>

                <div className="space-y-8">
                    {domains.map((domain, index) => (
                        <div key={index} className="flex flex-col md:flex-row items-center gap-4 text-sm font-light text-cv-text-primary">
                            <span className="w-1/3 text-right hidden md:block">{domain.left}</span>
                            <div className="flex-1 w-full h-2 bg-black/5 rounded-full relative overflow-hidden">
                                <div
                                    className="absolute top-0 bottom-0 w-2 h-2 bg-cv-text-primary rounded-full shadow-sm m-auto mt-[0px]"
                                    style={{ left: `${domain.value}%`, transform: 'translateX(-50%)', height: '100%', width: '12px', background: 'var(--color-cv-accent)' }}
                                />
                            </div>
                            <span className="w-1/3 text-left hidden md:block">{domain.right}</span>

                            {/* Mobile labels */}
                            <div className="w-full flex justify-between md:hidden text-xs text-cv-text-secondary">
                                <span>{domain.left}</span>
                                <span>{domain.right}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeedbackDomains;
