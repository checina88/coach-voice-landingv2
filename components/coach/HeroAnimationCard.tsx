'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import WaveformStep from './hero/WaveformStep';
import AnalysisStep from './hero/AnalysisStep';
import InsightsStep from './hero/InsightsStep';

const STEP_DURATION = 3500;
const TRANSITION_DURATION = 0.5;

const steps = [
  { key: 'waveform', Component: WaveformStep },
  { key: 'analysis', Component: AnalysisStep },
  { key: 'insights', Component: InsightsStep },
];

const HeroAnimationCard = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, STEP_DURATION);
    return () => clearInterval(interval);
  }, []);

  const { key, Component } = steps[currentStep];

  return (
    <div className="relative w-full max-w-[480px] aspect-[4/3] rounded-2xl bg-white/40 backdrop-blur-md border border-white/50 overflow-hidden shadow-xl shadow-black/5">
      {/* Subtle inner glow at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

      {/* Step indicator dots */}
      <div className="absolute top-4 right-4 flex gap-1.5 z-10">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === currentStep
                ? 'bg-cv-accent w-4'
                : 'bg-cv-text-primary/15 w-1.5'
            }`}
          />
        ))}
      </div>

      {/* Animated step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: TRANSITION_DURATION, ease: 'easeInOut' }}
          className="absolute inset-0 p-6"
        >
          <Component />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HeroAnimationCard;
