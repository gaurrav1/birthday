import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import "./css/BirthdayAnimation.css";

export function BirthdayAnimation() {
  const navigate = useNavigate();
  const manRef = useRef(null);
  const glassRef = useRef(null);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    // Animate the man walking forward
    gsap.to(manRef.current, {
      x: "50vw",
      duration: 4,
      ease: "power2.out",
    });

    // After 4s, trigger glass break
    setTimeout(() => {
      gsap.to(glassRef.current, {
        opacity: 0,
        duration: 1.5,
        onComplete: () => {
          glassRef.current.style.display = "none";
        },
      });
    }, 4000);

    // After 5s, show "21" in new glass
    setTimeout(() => {
      gsap.fromTo(
        "#new-glass",
        { opacity: 0 },
        { opacity: 1, duration: 1.5 }
      );
    }, 5000);

    // Start real-time countdown from March 26, 2005
    const birthday = new Date("2005-03-26").getTime();
    setInterval(() => {
      const now = new Date().getTime();
      const diff = now - birthday;
      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      const days = Math.floor(
        (diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24)
      );
      setCountdown(`${years} years, ${days} days`);
    }, 1000);

    // Move countdown panel up after 8s and show "Next Page"
    setTimeout(() => {
      gsap.to("#countdown-container", {
        y: "-50px",
        duration: 1,
      });
      gsap.to("#next-btn", {
        opacity: 1,
        duration: 1.5,
      });
    }, 8000);
  }, []);

  return (
    <div className="animation-container">
      <div ref={manRef} className="man">🚶‍♂️</div>

      {/* Glass with number 20 */}
      <div ref={glassRef} className="glass" id="glass-20">
        <span>20</span>
      </div>

      {/* New glass with number 21 (Initially hidden) */}
      <div className="glass new-glass" id="new-glass">
        <span>21</span>
      </div>

      {/* Countdown */}
      <div id="countdown-container" className="countdown">
        Parth has been alive for: {countdown}
      </div>

      {/* Next Page Button (Initially hidden) */}
      <button id="next-btn" className="next-button" onClick={() => navigate("/birthday-wish")}>
        Next Page
      </button>
    </div>
  );
}
