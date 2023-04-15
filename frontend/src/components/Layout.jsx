import { Outlet } from "react-router-dom";
import MessageBoard from "./MessageQueueViewer";

/* Put anything that you want to display in every route here */
export default function Layout() {
  return (
    <div className="h-full">
      <h1 className="p-3 bg-black text-white">Using Outlets</h1>
      <Outlet />
      <h1 className="p-3 bg-black text-white fixed bottom-0 right-0">
        Message window
        <MessageBoard />
      </h1>
      <h2 className="px-3 bg-black text-white">Frontend server port: {FRONTEND_PORT}</h2>
      <h2 className="px-3 bg-black text-white">Backend server port: {BACKEND_PORT}</h2>
    </div>
  )
}
