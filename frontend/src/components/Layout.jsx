import { Outlet } from "react-router-dom";
import MessageBoard from "./MessageQueueViewer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

/* Put anything that you want to display in every route here */
/* FRONTEND_PORT + BACKEND_PORT are global variables defined in vite's config */
export default function Layout() {
  return (
    <div className="h-full">
      <div className="flex justify-between bg-black text-white">
        <Link to="/" className="p-3 ">StudyPhilosophy v.0.0.1</Link>
        <a href="https://github.com/tqa3001/StudyingPhilosophy" className="my-auto mx-4 w-5 fa-lg">
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
      <Outlet />
      <h1 className="p-3 bg-black text-white fixed bottom-0 right-0">
        Message window
        <MessageBoard />
      </h1>
    </div>
  )
}
