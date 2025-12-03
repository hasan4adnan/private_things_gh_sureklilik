import { useMemo, useCallback } from "react";
import "./App.css";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App2() {
  const [clicked, setClicked] = useLocalStorage<boolean>('app2-clicked', false);
  const [clickCount, setClickCount] = useLocalStorage<number>('app2-click-count', 0);

  const handleClick = useCallback(() => {
    setClicked(!clicked);
    setClickCount(prev => prev + 1);
  }, [clicked, setClicked, setClickCount]);

  const clickMessage = useMemo(() => {
    if (clickCount === 0) return null;
    if (clickCount === 1) return "İlk tıklama! 👆";
    if (clickCount === 5) return "5 tıklama! 🔥";
    if (clickCount === 10) return "10 tıklama! 🎉";
    if (clickCount === 20) return "20 tıklama! 🌟";
    return `Tıklama sayısı: ${clickCount}`;
  }, [clickCount]);

  return (
    <div className="mini-card">
      <h2>Mini Kart 2 🎴</h2>
      <p>Bu, ikinci bir modern kart örneğidir.</p>
      {clickCount > 0 && clickMessage && (
        <p className="click-info">{clickMessage}</p>
      )}
      <button onClick={handleClick}>
        {clicked ? "Tıklanıldı! ✅" : "Daha Fazla"}
      </button>
    </div>
  );
}
