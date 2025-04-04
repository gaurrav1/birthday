// components/FirstPage.jsx
import { useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

export const FirstPage = () => {
  const [time, setTime] = useState(new Date());
  const [targetDate] = useState(new Date('2025-03-23'));
  const navigate = useNavigate();

  useGSAP(() => {
    gsap.from('.panel', {
      duration: 1,
      x: '-100%',
      stagger: 0.2,
      ease: 'power3.out'
    });
  });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const calculateCountdown = () => {
    const diff = targetDate - new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60)
    };
  };

  return (
    <div className="container">
      <div className="panel time-panel">
        <h2>Current Time</h2>
        <div className="time-display">
          {time.toLocaleDateString()} {time.toLocaleTimeString()}
        </div>
      </div>
      
      <div className="panel countdown-panel">
        <h2>Countdown</h2>
        <div className="countdown">
          {Object.entries(calculateCountdown()).map(([unit, value]) => (
            <div key={unit} className="countdown-unit">
              <span className="value">{value}</span>
              <span className="unit">{unit}</span>
            </div>
          ))}
        </div>
        {calculateCountdown().days <= 0 && (
          <button onClick={() => navigate('/celebration')}>
            Start Celebration!
          </button>
        )}
      </div>
    </div>
  );
};