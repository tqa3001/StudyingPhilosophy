import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetUsersQuery, selectUserById } from "../../../features/users/usersApiSlice";
import { useGetSourcesQuery } from "../../../features/sources/sourcesApiSlice";
import { Link, useNavigate } from "react-router-dom";
import ProfileDetails from "./ProfileDetails";
import { danger, primary } from "../../../styles/componentStyle";
import { logoutIsSent } from "../../../app/session/sessionSlice";
import store from "../../../app/store";
import { useLogoutMutation } from "../../../features/auth/authApiSlice";
import newMessage from "../../../app/messageQueue/newMessage";

export default function User() {
  const userID = useSelector(state => state.session.userID);
  console.log(userID);
  const {
    data: users, error, isUninitialized, isLoading, isSuccess, isError
  } = useGetUsersQuery(); 
  let fetchStatus = isLoading ? "Loading" : (isError ? "Failure" : "Success"); 
  const user = useSelector((state) => selectUserById(state, userID));  // idk why this isn't working
  const sourcesQuery = useGetSourcesQuery(userID); 
  const filtered_sources = sourcesQuery.data; 
  const [isEditting, setIsEditting] = useState(0);
  let toggleEdit = () => { setIsEditting(isEditting ^ 1); }
  /** 
   * Why do we need a hook to use selectors? what are hooks for smh why not just functions is hook just a fancy
   * way to write a function smh
   * Anyways, I found the reason why user is not found. You see, userID is preserved by location.state, 
   * but the program's state itself (save in the store) is NOT preserved. What useSelector does is simply mapping
   * state to props, so no state means no props. 
   * 
   * So the solution is to fetch the data once first? (kinda ugly but efficiency-wise it doesn't hurt
   * because of memoization (if not memoized then uhh useMemo? idk)
  */
  let display = null; 
  if (!userID || !user || !filtered_sources) {
    display = (isError ? <div>Invalid User</div> : <div>Loading user...</div>)
  } else {
    display = (
      <div>
        <h1 className="text-3xl font-bold">User: {user.username}</h1>
        <ProfileDetails editMode={isEditting}/>
        <button onClick={toggleEdit}>Edit</button>
        <h2 className="font-bold">All sources </h2>
        <div>
          {
          filtered_sources.ids.map((sourceID) => {
            return (
              <Link 
                to={`../../sources/${sourceID}`} 
                state={{ sourceID: sourceID }}
                relative="path"
              ><div>{sourceID}</div></Link>
            )
          })}
        </div>
        <br />
        <h2 className="font-bold">Add new source with redux form</h2> 
      </div>
    )
  }
  
  const navigate = useNavigate();
  const [triggerLogout, _] = useLogoutMutation();
  const logout = async () => {
    store.dispatch(logoutIsSent());
    try {
      const response = await triggerLogout().unwrap();
      newMessage({ type: "success", message: response.msg });
      navigate('/');
    } catch (err) {
      newMessage({ type: "error", message: err.data.msg });
    }
  }

  return (
    <div className="p-10">
      User fetch status: {fetchStatus} 
      {display}
      <button className={danger} onClick={logout}>Log out</button>
    </div>
  )
}