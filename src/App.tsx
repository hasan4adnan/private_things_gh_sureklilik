import { useEffect, useCallback, useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  const [count, setCount] = useLocalStorage<number>('counter-value', 0)
  const [maxCount, setMaxCount] = useLocalStorage<number>('counter-max', 0)

  const increment = useCallback(() => setCount((prev) => prev + 1), [setCount])
  const decrement = useCallback(() => setCount((prev) => prev - 1), [setCount])
  const reset = useCallback(() => setCount(0), [setCount])
  const incrementBy10 = useCallback(() => setCount((prev) => prev + 10), [setCount])

  const milestoneMessage = useMemo(() => {
    const milestones = [10, 25, 50, 100]
    if (milestones.includes(count)) {
      const messages: Record<number, string> = {
        10: "🎯 Tam 10! Mükemmel!",
        25: "🌟 25'e ulaştınız! Süper!",
        50: "🏆 50! Efsane!",
        100: "🚀 100! İnanılmaz!"
      }
      return { text: messages[count], type: 'milestone' }
    }
    if (count > 10 && !milestones.includes(count)) {
      return { text: "🎉 Harika! 10'dan fazla tıkladınız!", type: 'celebration' }
    }
    if (count < 0) return { text: "⚠️ Negatif değere ulaştınız!", type: 'warning' }
    if (maxCount > 0 && count === maxCount && count > 0) {
      return { text: `🏅 Yeni rekor! En yüksek: ${maxCount}`, type: 'record' }
    }
    return null
  }, [count, maxCount])

  useEffect(() => {
    if (count > maxCount) {
      setMaxCount(count)
    }
  }, [count, maxCount, setMaxCount])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '+' || e.key === '=') {
        setCount((prev) => prev + 1)
      } else if (e.key === '-') {
        setCount((prev) => prev - 1)
      } else if (e.key === 'r' || e.key === 'R') {
        setCount(0)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setCount((prev) => prev + 1)
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setCount((prev) => prev - 1)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [setCount])

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
            onClick={incrementBy10} 
            className="increment-10-btn"
            title="Add 10"
          >
            +10
          </button>
        </div>
        <p className="keyboard-hint">
          <small>💡 Klavye: + / - / R / ↑ / ↓</small>
        </p>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        {milestoneMessage && (
          <p className={`${milestoneMessage.type}-message`}>
            {milestoneMessage.text}
          </p>
        )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div className="footer-info">
        <small>Made with ❤️ using React {count > 0 ? `(${count} clicks)` : ''}</small>
        {maxCount > 0 && (
          <small className="max-indicator">📊 En yüksek: {maxCount}</small>
        )}
        {count > 0 && (
          <small className="save-indicator">💾 Değer kaydedildi</small>
        )}
      </div>
    </>
  )
}

export default App
