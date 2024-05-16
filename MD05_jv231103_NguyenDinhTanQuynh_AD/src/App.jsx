import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Index01 from './Components/Index01'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Index01/>
    </>
  )
}

export default App
