import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashboardLayout from './components/DashboardLayout'
import Welcome from './features/auth/Welcome'
import ListSources from './features/sources/ListSources'
import Settings from './features/userProfile/Settings'

export default function App() {  /* Define layout for client-side routing */
  return (
    <Routes>
      <Route path="/" element={<Layout />}>  
        <Route index element={<Public />} />  { /* Each route must have an index (?) */}
        <Route path="login" element={<Login />} />  
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Welcome />} />          
          {/* Sources */ }
          <Route path="sources">
            <Route index element={<ListSources />} />
          </Route>
          {/* User Profile */}
          <Route path="userProfile">
            <Route index element={<Settings />} />
          </Route>
        </Route> 
      </Route>
    </Routes>
  )
}

/*
 function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

 */
