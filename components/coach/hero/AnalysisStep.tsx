'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const metrics = [
  { label: 'Autonomy', value: 78, delay: 0 },
  { label: 'Relatedness', value: 65, delay: 0.15 },
  { label: 'Competence', value: 72, delay: 0.3 },
];

const FILL_DURATION = 1.2;

const AnalysisStep = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full bg-cv-accent" />
        <span className="text-xs font-medium text-cv-text-secondary uppercase tracking-wider">
          Session Analysis
        </span>
      </div>

      {/* Metrics */}
      <div className="flex flex-col gap-5 flex-1 justify-center">
        {metrics.map((metric) => (
          <MetricRow key={metric.label} {...metric} />
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-cv-text-primary/10">
        <p className="text-xs text-cv-text-secondary font-light">
          Based on Self-Determination Theory framework
        </p>
      </div>
    </div>
  );
};

const MetricRow = ({ label, value, delay }: { label: string; value: number; delay: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const startTime = Date.now() + delay * 1000;
    const duration = FILL_DURATION * 1000;
    let rafId: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed < 0) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * value));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [value, delay]);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-baseline">
        <span className="text-sm font-medium text-cv-text-secondary">{label}</span>
        <span className="text-lg font-light text-cv-text-primary tabular-nums">{displayValue}</span>
      </div>
      <div className="h-2 w-full bg-cv-text-primary/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-cv-accent"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{
            duration: FILL_DURATION,
            delay: delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      </div>
    </div>
  );
};

export default AnalysisStep;
