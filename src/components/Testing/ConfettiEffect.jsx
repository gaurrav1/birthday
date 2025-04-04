// ConfettiEffect.jsx
import { forwardRef, useEffect } from 'react';
import confetti from 'canvas-confetti';

export const ConfettiEffect = forwardRef((props, ref) => {
  useEffect(() => {
    // Initialize with a dummy function first
    ref.current = () => {};
    
    // Assign actual confetti function
    ref.current = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    };
  }, [ref]);

  return null;
});