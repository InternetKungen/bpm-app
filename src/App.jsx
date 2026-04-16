import React, { useState, useCallback } from "react";
import "./App.css";

const BPMCalculator = () => {
  const [bpm, setBpm] = useState(0);
  const [clickTimes, setClickTimes] = useState([]);
  const [display, setDisplay] = useState("BPM-Meter");
  const [flash, setFlash] = useState(false);
  const [blinking, setBlinking] = useState(false);
  const [shine, setShine] = useState(false);

  const handleClick = useCallback(() => {
    const now = Date.now();

    setClickTimes((prev) => {
      const updated = [...prev, now];

      // Behåll de senaste 8 klickningarna för ett medelvärde
      const recent = updated.slice(-8);

      if (recent.length < 2) {
        setDisplay("Tap it again...");
        return updated;
      }

      // Räkna ut genomsnittlig tid mellan klick (ms)
      let totalInterval = 0;
      for (let i = 1; i < recent.length; i++) {
        totalInterval += recent[i] - recent[i - 1];
      }
      const avgInterval = totalInterval / (recent.length - 1);

      // Konvertera till BPM: 60 000 ms / genomsnittlig interval
      const calculatedBpm = Math.round(60000 / avgInterval);
      setBpm(calculatedBpm);
      setDisplay(`${calculatedBpm} BPM`);

      if (calculatedBpm > 0) {
        setBlinking(true);
        setFlash(true);
        setShine(true);
        setTimeout(() => setFlash(false), 100);
      }

      return updated;
    });
  }, []);

  const handleReset = useCallback(() => {
    setBpm(0);
    setClickTimes([]);
    setDisplay("Tap it!");
    setBlinking(false);
    setShine(false);
  }, []);

  return (
    <div className="app-body">
      <div
        className={`background ${blinking ? 'blinking' : ''} ${flash ? 'flash' : ''}`}
        style={{ '--blink-duration': blinking ? `${60 / bpm}s` : '0.2s' }}
      ></div>
      <div className={`app-container ${shine ? 'shine' : ''}`}
      style={{ '--shine-duration': shine ? `${60 / bpm}s` : '0.2s' }}>
        <div className="app-bpm-display">{display}</div>

        <button
          className="app-button"
          onClick={handleClick}
        >
          Tap!
        </button>

        {/* <div className="app-bpm-display">{display}</div> */}

      
          <button className="app-reset-button" onClick={handleReset}>
            Reset
          </button>
       
      </div>
    </div>
  );
};

/* ─── Styles moved to App.css ─── */

export default BPMCalculator;