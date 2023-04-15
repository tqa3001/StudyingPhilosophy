import { Link } from 'react-router-dom'  /* reloadDocument -> skip client-side routing -> normal a href */

export default function Public() {
  const landingButtonStyle = "text-white py-2 px-5 rounded-full bg-blue-500 text-center"; // move this to ../styles ?
  return (
    <section className="p-10">
      <header className="my-5">
        <h1 className="text-2xl">Welcome to</h1>
        <h2 className="text-5xl text-blue-500 font-bold">A note-taking app</h2>
      </header>
      <main>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </main>
      <footer className="mx-auto w-1/3 mt-10"> 
        <Link to="/login"><div className={landingButtonStyle + " my-2"}>Login</div></Link> 
        <Link to="/dashboard"><div className={landingButtonStyle}>Open Dashboard</div></Link> 
      </footer>
    </section>
  )
}