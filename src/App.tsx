import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const increment = () => setCount((prev) => prev + 1)
  const decrement = () => setCount((prev) => prev - 1)
  const reset = () => setCount(0)

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
        <button onClick={reset} className="reset-btn">Reset</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        {count > 10 && (
          <p style={{ color: '#10b981', fontWeight: 'bold', marginTop: '1em' }}>
            🎉 Harika! 10'dan fazla tıkladınız!
          </p>
        )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
