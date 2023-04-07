import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faArrowLeft, faGear } from '@fortawesome/free-solid-svg-icons'
import { useLocation, useNavigate } from 'react-router-dom';

export default function DashboardHeader() {
  const { pathname } = useLocation(); 
  const navigate = useNavigate(); 
  const goHome = () => navigate("/dashboard"); 
  const goBack = () => navigate(-1);
  let homeButton = null; 
  let backButton = null; 
  let settingsButton = null; 
  if (pathname !== "/dashboard") {  // Logged in -> already at home
    backButton = <button
      className="border-2 rounded-md p-2 mx-1 px-3"
      title="Home"
      onClick={goBack}
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
    homeButton = <button 
      className="border-2 rounded-md p-2 mx-1 px-3"
      title="Home"
      onClick={goHome} /* Tricky bug: onClick={navigate("/dashboard")}*/
    >
      <FontAwesomeIcon icon={faHouse} />
    </button>  
  }
  if (pathname !== "/settings") { // route will be implemented later. 
    settingsButton = <button
      className="border-2 rounded-md p-2 mx-1 px-3"
      title="Home"
    >
      <FontAwesomeIcon icon={faGear}/>
    </button>
  }
  return (
    <header className="bg-green-700 text-white px-5 py-2">
      <div className="flex justify-between h-full">
        <div className="text-2xl font-bold flex h-fit my-auto mx-5">
          StudyPhilosophy v.0.0.1
        </div>
        <div className="flex">
          <div>{backButton}</div>
          <div>{homeButton}</div>
          <div>{settingsButton}</div>
        </div>
      </div>
      <nav></nav>
    </header>
  )
}