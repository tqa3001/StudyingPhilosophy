import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './components/Landing'
import Login from './features/auth/Login'
import DashboardLayout from './components/DashboardLayout'
import Welcome from './features/auth/Welcome'
import ListSources from './features/sources/ListSources'
import ListUsers from './features/users/ListUsers'
import User from './features/users/User'

export default function App() {  /* Define layout for client-side routing */
  return (
    <Routes>
      <Route path="/" element={<Layout />}>  
        <Route index element={<Landing />} />  { /* Each route must have an index (?) */}
        <Route path="login" element={<Login />} />  
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Welcome />} />          
          {/* Sources */ }
          <Route path="sources">
            <Route index element={<ListSources />} />
          </Route>
          {/* Users */}
          <Route path="users">
            <Route index element={<ListUsers />} />
            <Route path=":id" element={<User />} />
          </Route>
        </Route> 
      </Route>
    </Routes>
  )
}
