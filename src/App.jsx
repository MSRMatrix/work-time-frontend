import './App.css'
import { useState } from 'react'
import { Timelog, User } from './components/context/Context'
import Dashboard from './components/dashboard/Dashboard'

function App() {
const [user, setUser] = useState([])
const [timelog, setTimelog] = useState([])

  return (
    <>
      <User.Provider value={{user, setUser}}>
        <Timelog.Provider value={{timelog, setTimelog}}>
    <Dashboard />
        </Timelog.Provider>
      </User.Provider>
    </>
  )
}

export default App
