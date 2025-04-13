import React from 'react';
import { Star } from 'lucide-react';

interface BadgeProps {
  text: string;
}

export function Badge({ text }: BadgeProps) {
  return (
    <div className="badge">
      <Star size={16} />
      <span className="badge-text">{text}</span>
    </div>
  );
}