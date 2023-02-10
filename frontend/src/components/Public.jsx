import { Link } from 'react-router-dom' 

export default function Public() {
  return (
    <section>
      <header>
        <h1 className="text-3xl">Welcome</h1>
        <h2 className="text-xl">Enjoy the ride.</h2>
      </header>
      <main>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </main>
      <footer>
        <Link to="/login">Login</Link> <br /> {/* reloadDocument -> skip client-side routing -> normal a href */}
        <Link to="/dashboard">Dashboard (cringe af)</Link> {/* component for /dashboard is assigned in App.jsx */}
      </footer>
    </section>
  )
}