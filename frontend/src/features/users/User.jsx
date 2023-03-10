import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectUserById } from "./usersApiSlice";

export default function User() {
  const location = useLocation();
  const { userID } = location.state; 
  const user = useSelector((state) => selectUserById(state, userID));  // idk why this isn't working
  /** 
   * Why do we need a hook to use selectors?
   * also after reload -> params are lost if useParams()
   * Ok so the issue here is that the route u are accessing is dynamic (depends on id)
   * but you already defined the route's content statically in App.jsx 
  */
  console.log("slay queen", userID, user); 
  let display = null; 
  if (!userID || !user) {
    display = <div>Invalid User (cringe)</div>
  } else {
    display = (
      <div>
        <h1 className="text-3xl font-bold">User: {user.username}</h1>
        <h2>All sources (user.sources gives ObjectIds): </h2>
        {user.sources.map((sourceID) => 
          <div>
            {sourceID}
          </div>)}
      </div>
    )
  }
  return display;
}