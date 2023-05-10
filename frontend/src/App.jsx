import { useState } from 'react'
import Header from './components/Header'
import SideBar from './components/SideBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header /> 
      <SideBar />
    </>
  )
}

export default App
