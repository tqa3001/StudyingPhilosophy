import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <h1 className="p-3 bg-black text-white">Using Outlets</h1>
      <Outlet />
      <h1 className="p-3 bg-black text-white">Still using outlets</h1>
    </div>
  )
}
