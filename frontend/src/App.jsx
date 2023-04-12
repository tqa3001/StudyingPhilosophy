import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './components/Landing'
import Login from './features/auth/Login'
import Signup from './features/auth/Signup'
import DashboardLayout from './components/DashboardLayout'
import Welcome from './features/auth/Welcome'
import ListUsers from './features/users/ListUsers'
import ListSources from './features/sources/ListSources'
import ListNotes from './features/notes/ListNotes'
import User from './features/users/User'
import Source from './features/sources/Source'
import NoteViewer from './features/notes/NoteViewer'

export default function App() {  /* Define layout for client-side routing */
  return (
    <Routes>
      <Route path="/" element={<Layout />}>  
        <Route index element={<Landing />} />  { /* Each route must have an index (?) */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Welcome />} />          
          {/* Sources */ }
          <Route path="sources">
            <Route index element={<ListSources />} />
            <Route path=":id" element={<Source/>} />
          </Route>
          {/* Users */}
          <Route path="users">
            <Route index element={<ListUsers />} />
            <Route path=":id" element={<User/>} />
          </Route>
          {/* Notes */}
          <Route path="notes">
            <Route index element={<ListNotes />} />
            <Route path=":id" element={<NoteViewer/>} />
          </Route>
        </Route> 
      </Route>
    </Routes>
  )
}
