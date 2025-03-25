import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function App() {
  const targetDate = new Date("March 23, 2025 00:00:00").getTime();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState(targetDate - new Date().getTime());
  const [showEnter, setShowEnter] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      const timeRemaining = targetDate - now.getTime();
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
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      height: "100vh", 
      background: "#C6AD94",
      color: "#463239",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1 style={{ fontSize: "2rem" }}>Current Time</h1>
      <p style={{ fontSize: "1.5rem" }}>{currentTime.toLocaleTimeString()}</p>
      
      <h2 style={{ fontSize: "2rem", marginTop: "20px" }}>Countdown to Parth's Birthday</h2>
      <p style={{ fontSize: "2rem", fontWeight: "bold" }}>{formatTime(timeLeft)}</p>
      
      {showEnter && (
        <button style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "1.5rem",
          background: "#ED6B86",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "10px",
          transition: "0.3s",
        }} 
        onClick={() => navigate("/birthday-animation")}
        >
          Enter
        </button>
      )}
    </div>
  );
}
