import { useState } from "react";
import "./App.css";

export default function App2() {
  const [clicked, setClicked] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClicked(!clicked);
    setClickCount(prev => prev + 1);
  };

  const getClickMessage = () => {
    if (clickCount === 0) return null;
    if (clickCount === 1) return "İlk tıklama! 👆";
    if (clickCount === 5) return "5 tıklama! 🔥";
    if (clickCount === 10) return "10 tıklama! 🎉";
    return `Tıklama sayısı: ${clickCount}`;
  };

  return (
    <div className="mini-card">
      <h2>Mini Kart 2 🎴</h2>
      <p>Bu, ikinci bir modern kart örneğidir.</p>
      {clickCount > 0 && (
        <p className="click-info">{getClickMessage()}</p>
      )}
      <button onClick={handleClick}>
        {clicked ? "Tıklanıldı! ✅" : "Daha Fazla"}
      </button>
    </div>
  );
}
