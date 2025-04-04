// Enhanced App.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
// import "./css/App.css";

export function App() {
  const targetDate = new Date("March 23, 2025 00:00:00").getTime();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());
  const [showEnter, setShowEnter] = useState(false);

  useGSAP(() => {
    gsap.from("h1, h2, p", {
      duration: 1,
      y: 50,
      opacity: 0,
      stagger: 0.2,
      ease: "power2.out"
    });
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      setCurrentTime(new Date(now));
      const timeRemaining = targetDate - now;
      setTimeLeft(timeRemaining);

      if (timeRemaining <= 0) {
        setShowEnter(true);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="countdown-container">
      <div className="time-display">
        <h1 className="time-text">{currentTime.toLocaleTimeString()}</h1>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(1 - timeLeft/(targetDate - Date.now()))*100}%` }}
          ></div>
        </div>
      </div>
      
      <h2 className="countdown-title">Countdown to Parth's Birthday</h2>
      <p className="countdown-timer">{formatTime(timeLeft)}</p>
      
      {showEnter && (
        <button 
          className="enter-button"
          onClick={() => {
            gsap.to(".countdown-container > *", {
              opacity: 0,
              y: -50,
              stagger: 0.1,
              onComplete: () => navigate("/birthday-animation")
            });
          }}
        >
          Enter Celebration
        </button>
      )}
    </div>
  );
}