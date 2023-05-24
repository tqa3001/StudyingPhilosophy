import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetUsersQuery, selectUserById } from "../../../features/users/usersApiSlice";
import { useNavigate } from "react-router-dom";
import ProfileDetails from "./ProfileDetails";
import { danger } from "../../../styles/componentStyle";
import { logoutIsSent } from "../../../app/session/sessionSlice";
import { store } from "../../../app/store";
import { useLogoutMutation } from "../../../features/auth/authApiSlice";
import newMessage from "../../../app/messageQueue/newMessage";

export default function User() {
  const userID = useSelector(state => state.session.userID);
  const {
    data: users, error, isUninitialized, isLoading, isSuccess, isError
  } = useGetUsersQuery(); 
  let fetchStatus = isLoading ? "Loading" : (isError ? "Failure" : "Success"); 
  const user = useSelector((state) => selectUserById(state, userID));  // idk why this isn't working

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

  /* For editting user details */
  let showEditButton = <div className="flex flex-row-reverse font-bold" onClick={toggleEdit}>Cancel</div>
  if (!isEditting) {
    showEditButton = <div className="flex flex-row-reverse font-bold" onClick={toggleEdit}>Edit</div>;
  }

  /* Main display */
  let display = null; 
  if (!userID || !user) {
    display = (isError ? <div>Invalid User</div> : <div>Loading user...</div>)
  } else {
    display = (
      <div>
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold my-5">User: {user.username}</h1>
          {showEditButton}
        </div>
        <ProfileDetails editMode={isEditting} user={user} />
      </div>
    )
  }
  
  /* Logout */
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
      <button className={danger + "mt-10 px-8"} onClick={logout}>Log out</button>
    </div>
  )
}