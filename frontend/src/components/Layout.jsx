import { Outlet } from "react-router-dom";
import MessageBoard from "./MessageQueueViewer";

/* Put anything that you want to display in every route here */
export default function Layout() {
  return (
    <div className="h-full">
      <div className="flex justify-between bg-black text-white">
        <h1 className="p-3">Using Outlets</h1>
        <div>
          <h2 className="px-3">Frontend port: {FRONTEND_PORT}</h2>
          <h2 className="px-3">Backend port: {BACKEND_PORT}</h2>
        </div>
      </div>
      <Outlet />
      <h1 className="p-3 bg-black text-white fixed bottom-0 right-0">
        Message window
        <MessageBoard />
      </h1>
    </div>
  )
}
