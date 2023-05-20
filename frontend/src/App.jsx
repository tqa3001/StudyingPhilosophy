import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'  
import Landing from './components/auth/Landing'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Admin from './components/admin/Admin'
import DashboardLayout from './components/private/dashboard/DashboardLayout'
import Dashboard from './components/private/dashboard/Dashboard'
import ListUsers from './components/admin/ListUsers'
import ListSources from './components/private/sources/ListSources'
import ListNotes from './components/private/notes/ListNotes'
import User from './components/private/users/User'
import Source from './components/private/sources/Source'
import NoteViewer from './components/private/notes/NoteViewer'

export default function App() {  /* Define layout for client-side routing */
  return (
    <Routes>
      <Route path="/" element={<Layout />}>  

        {/* Landing page */}
        <Route index element={<Landing />} />

        {/* Authentication */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        {/* Public routes */}
        <Route path="public" />

        {/* Admin routes */}
        <Route path="admin">
          <Route index element={<Admin />}/>
          <Route path="users">
            <Route index element={<ListUsers />} />
            <Route path=":id" element={<User />} />
          </Route>
        </Route>

        {/* User-specific dashboard */ }        
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
        </Route>

        <Route path="profile" element={<User />} />

        {/* User-specific sources and notes for each source */}
        <Route path="sources">
          <Route index element={<ListSources />} />
          <Route path=":source-id"/>
            <Route index element={<Source/>} /> {/* TODO: add listnotes to source */}
            <Route path=":note-id" element={<NoteViewer/>} />
          </Route>
        </Route>

    </Routes>
  )
}
