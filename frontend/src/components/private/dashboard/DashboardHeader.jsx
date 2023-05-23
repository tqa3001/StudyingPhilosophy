import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faArrowLeft, faGear } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function DashboardHeader() {
  const { pathname } = useLocation(); 
  const currentUser = useSelector(state => state.session);
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
    homeButton = <Link 
      to=""
      className="border-2 rounded-md p-2 mx-1 px-3"
      title="Home"
      onClick={goHome} /* Tricky bug: onClick={navigate("/dashboard")}*/
    >
      <FontAwesomeIcon icon={faHouse} />
    </Link>  
  }
  if (pathname !== "/settings") { // route will be implemented later. 
    settingsButton = <Link
      to="/profile"
      className="border-2 rounded-md p-2 mx-1 px-3"
      title="Home"
    >
      <FontAwesomeIcon icon={faGear}/>
    </Link>
  }
  return (
    <header>
      <div className="flex justify-between h-full">
        <div className="text-2xl font-bold flex h-fit my-auto mx-5">
          User's Dashboard
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