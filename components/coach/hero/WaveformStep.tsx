'use client';

import React, { useState, useEffect, useRef } from 'react';

const TRANSCRIPTION_TEXT = "Good job, you should try to give them more space to...";
const TYPING_SPEED = 40;
const TYPING_DELAY = 300;
const BAR_COUNT = 24;

const WaveformStep = () => {
  const [displayedText, setDisplayedText] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayedText('');

    const startTimeout = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        if (indexRef.current < TRANSCRIPTION_TEXT.length) {
          indexRef.current++;
          setDisplayedText(TRANSCRIPTION_TEXT.slice(0, indexRef.current));
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      }, TYPING_SPEED);
    }, TYPING_DELAY);

    return () => {
      clearTimeout(startTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
        <span className="text-xs font-medium text-cv-text-secondary uppercase tracking-wider">
          Listening...
        </span>
      </div>

      {/* Waveform */}
      <div className="flex items-center justify-center gap-[3px] h-20 my-4">
        {Array.from({ length: BAR_COUNT }).map((_, i) => (
          <div
            key={i}
            className="w-[3px] rounded-full bg-cv-accent/50"
            style={{
              height: '100%',
              animation: `waveform-pulse ${0.8 + ((i * 7 + 3) % 10) / 16}s ease-in-out infinite`,
              animationDelay: `${i * 0.05}s`,
              transformOrigin: 'center',
            }}
          />
        ))}
      </div>

      {/* Transcription */}
      <div className="mt-auto">
        <p className="text-sm font-light text-cv-text-primary leading-relaxed min-h-[3rem]">
          {displayedText}
          <span className="animate-cursor-blink text-cv-accent ml-0.5">|</span>
        </p>
      </div>
    </div>
  );
};

export default WaveformStep;
