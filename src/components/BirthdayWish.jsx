import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/BirthdayWish.css";

export function BirthdayWish() {
  const [isBlown, setIsBlown] = useState(false);
  const navigate = useNavigate();

  let holdTimer;

  const startBlowing = () => {
    holdTimer = setTimeout(() => {
      setIsBlown(true);
    }, 2000); // Hold for 2 seconds to blow the candle
  };

  const stopBlowing = () => {
    clearTimeout(holdTimer);
  };

  return (
    <div className="wish-container">
      <h1>🎂 Parth's Birthday 🎂</h1>

      <div className="cake">
        <div className="candle">
          {!isBlown && <div className="flame"></div>}
        </div>
      </div>

      {!isBlown ? (
        <button
          className="hold-button"
          onMouseDown={startBlowing}
          onMouseUp={stopBlowing}
          onTouchStart={startBlowing} // For mobile devices
          onTouchEnd={stopBlowing}
        >
          Hold to Blow Candle
        </button>
      ) : (
        <h2 className="birthday-message">🎉 Happy Birthday Parth! 🎉</h2>
      )}
      
      {isBlown && (
        <button className="next-button" onClick={() => navigate("/")}>
          Go Home
        </button>
      )}
    </div>
  );
}
