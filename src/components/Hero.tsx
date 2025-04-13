import React from 'react';
import { Badge } from './Badge';
import { Button } from './Button';

export function Hero() {
  return (
    <main className="hero">
      <div className="hero-content">
        <Badge text="Backed by top AI researchers" />
        <h1 className="hero-title">
          Interview Preparation
        </h1>
        <h2 className="hero-subtitle">
          in good hands
        </h2>
        <p className="hero-description">
          InterviewAI is a better way to practice and master your interview skills. 
          Get personalized feedback and coaching from our advanced AI system.
        </p>
        <Button>Get early access</Button>
      </div>
      <div className="grid-background"></div>
    </main>
  );
}