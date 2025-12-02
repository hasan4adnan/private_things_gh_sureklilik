import React from "react";
import "./App.css";

import { useState } from "react";
import "./App.css";

export default function App2() {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="mini-card">
      <h2>Mini Kart 2 🎴</h2>
      <p>Bu, ikinci bir modern kart örneğidir.</p>
      <button onClick={() => setClicked(!clicked)}>
        {clicked ? "Tıklanıldı! ✅" : "Daha Fazla"}
      </button>
    </div>
  );
}
