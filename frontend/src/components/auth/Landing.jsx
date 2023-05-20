import { Link } from 'react-router-dom'  /* reloadDocument -> skip client-side routing -> normal a href */

export default function Landing() {
  const landingButtonStyle = 
    "text-white py-2 px-5 rounded-full bg-blue-500 text-center" +
    " hover:bg-blue-700";
  return (
    <div>
      <section className="p-10">
        <div className="my-5">
          <h1 className="text-2xl">Welcome to</h1>
          <h2 className="text-5xl text-blue-500 font-bold">A note-taking app</h2>
        </div>
        <div className="flex space-x-10 py-4">
          <div className="w-1/2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            <div className="w-1/3 mt-10">  {/*mx-auto*/}
              <div className="flex space-x-3">
                <Link to="/login"><div className={landingButtonStyle}>Login</div></Link> 
                <Link to="/signup"><div className={landingButtonStyle}>Signup</div></Link> 
                <Link to="/public"><div className={landingButtonStyle}>Browse</div></Link> 
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <img src="https://picsum.photos/200/300" alt="random-img" />
            <img src="https://picsum.photos/200/300" alt="random-img" />
          </div>
        </div>
      </section>
      <div className="bg-black text-white p-10">
        <div className="text-5xl">Why make this app?</div>
        <div></div>
      </div>
    </div>
  )
}