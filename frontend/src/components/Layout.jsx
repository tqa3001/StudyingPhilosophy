import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <h1 className="p-3 bg-black text-white">Using Outlets</h1>
      <Outlet />
      <h1 className="p-3 bg-black text-white">Still using outlets</h1>
      <h2 className="px-3 bg-black text-white">Frontend server port: {FRONTEND_PORT}</h2>
      <h2 className="px-3 bg-black text-white">Backend server port: {BACKEND_PORT}</h2>
    </div>
  )
}
