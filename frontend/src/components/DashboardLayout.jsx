import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <>
      <header>
        <h1 className="text-2xl font-bold">Rewrite</h1>
        <nav>
          <Link to="/dashboard/sources/new">Create</Link>
          <Link to="/dashboard/sources">My sources</Link>
          <Link to="/logout">Logout</Link>
        </nav>
      </header>
      <main>
        <h1 className="text-3xl">Dashboard Layout</h1>
        <Outlet />
      </main>
      <footer>
        <h1>Dashboard footer</h1>
      </footer>
    </>
  )
}