'use client';

import React from 'react';
import { motion } from 'framer-motion';

const domains = [
  { left: 'Directive', right: 'Non-directive', value: 30, delay: 0 },
  { left: 'Controlling', right: 'Supportive', value: 75, delay: 0.15 },
  { left: 'Negative', right: 'Positive', value: 80, delay: 0.3 },
  { left: 'Telling', right: 'Questioning', value: 25, delay: 0.45 },
];

const SLIDE_DURATION = 1.0;

const InsightsStep = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-cv-accent" />
        <span className="text-xs font-medium text-cv-text-secondary uppercase tracking-wider">
          Feedback Insights
        </span>
      </div>

      {/* Sliders */}
      <div className="flex flex-col gap-4 flex-1 justify-center">
        {domains.map((domain) => (
          <SliderRow key={domain.left} {...domain} />
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-cv-text-primary/10">
        <p className="text-xs text-cv-text-secondary font-light">
          9 dimensions analyzed across your session
        </p>
      </div>
    </div>
  );
};

const SliderRow = ({
  left,
  right,
  value,
  delay,
}: {
  left: string;
  right: string;
  value: number;
  delay: number;
}) => {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-light text-cv-text-secondary w-20 text-right truncate">
        {left}
      </span>
      <div className="flex-1 h-1.5 bg-cv-text-primary/10 rounded-full relative">
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cv-accent shadow-sm shadow-cv-accent/30"
          initial={{ left: '50%', x: '-50%' }}
          animate={{ left: `${value}%`, x: '-50%' }}
          transition={{
            duration: SLIDE_DURATION,
            delay: delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      </div>
      <span className="text-[11px] font-light text-cv-text-secondary w-20 truncate">
        {right}
      </span>
    </div>
  );
};

export default InsightsStep;
