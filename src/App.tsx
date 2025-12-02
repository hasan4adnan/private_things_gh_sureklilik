import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('counter-value')
    return saved ? parseInt(saved, 10) : 0
  })

  const increment = () => setCount((prev) => prev + 1)
  const decrement = () => setCount((prev) => prev - 1)
  const reset = () => setCount(0)

  useEffect(() => {
    localStorage.setItem('counter-value', count.toString())
  }, [count])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '+' || e.key === '=') {
        setCount((prev) => prev + 1)
      } else if (e.key === '-') {
        setCount((prev) => prev - 1)
      } else if (e.key === 'r' || e.key === 'R') {
        setCount(0)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React ⚡</h1>
      <div className="card">
        <div className="counter-controls">
          <button onClick={decrement} className="counter-btn">-</button>
          <span className="counter-value">Sayaç: {count}</span>
          <button onClick={increment} className="counter-btn">+</button>
        </div>
        <div className="action-buttons">
          <button onClick={reset} className="reset-btn" title="Press 'R' to reset">
            Reset
          </button>
          <button 
            onClick={() => setCount((prev) => prev + 10)} 
            className="increment-10-btn"
            title="Add 10"
          >
            +10
          </button>
        </div>
        <p className="keyboard-hint">
          <small>💡 Klavye: + / - / R</small>
        </p>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        {count > 10 && (
          <p className="celebration-message">
            🎉 Harika! 10'dan fazla tıkladınız!
          </p>
        )}
        {count === 10 && (
          <p className="milestone-message">
            🎯 Tam 10! Mükemmel!
          </p>
        )}
        {count === 25 && (
          <p className="milestone-message">
            🌟 25'e ulaştınız! Süper!
          </p>
        )}
        {count === 50 && (
          <p className="milestone-message">
            🏆 50! Efsane!
          </p>
        )}
        {count < 0 && (
          <p className="warning-message">
            ⚠️ Negatif değere ulaştınız!
          </p>
        )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div className="footer-info">
        <small>Made with ❤️ using React {count > 0 ? `(${count} clicks)` : ''}</small>
        {count > 0 && (
          <small className="save-indicator">💾 Değer kaydedildi</small>
        )}
      </div>
    </>
  )
}

export default App
