import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useGetUsersQuery, selectUserById } from "../../../features/users/usersApiSlice";
import { useGetSourcesQuery } from "../../../features/sources/sourcesApiSlice";
import { Link } from "react-router-dom";

export default function User() {
  const location = useLocation();
  const { userID } = location.state; 
  // const usersQuery = useGetUsersQuery();  
  // const { isError, isLoading } = usersQuery.data; 
  const {
    data: users, error, isUninitialized, isLoading, isSuccess, isError
  } = useGetUsersQuery(); 
  let fetchStatus = isLoading ? "Loading" : (isError ? "Failure" : "Success"); 
  const user = useSelector((state) => selectUserById(state, userID));  // idk why this isn't working
  const sourcesQuery = useGetSourcesQuery(userID); 
  const filtered_sources = sourcesQuery.data; 
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
  console.log("bruh: ", isLoading); 
  return (
    <div>
      User fetch status: {fetchStatus} 
      {display}
    </div>
  )
}