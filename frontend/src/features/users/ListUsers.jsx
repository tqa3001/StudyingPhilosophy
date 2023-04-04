import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from "./usersApiSlice";
import "./tableStyle.css" 

export default function ListUsers() {
  /**
   * Automatically triggers fetches of data from an endpoint, 'subscribes' the component to the cached data, 
   * and reads the request status and cached data from the Redux store.
   * https://redux-toolkit.js.org/rtk-query/usage/queries
   */
  const {
    data: users, error, isUninitialized, isLoading, isSuccess, isError, refetch
  } = useGetUsersQuery(); 

  let content = null; 
  if (isLoading) 
    content = <div>Loading users... <FontAwesomeIcon icon={faRotate}/></div>; 
  else if (isError) 
    content = <div>Error loading users: {error.message}</div>; 
  else {
    const { ids, entities } = users; 
    content = (
      <div>
        <table>
          <thead>
            <tr className="font-bold">
              {["ID", "Username", "Name", "Sources"].map(column => <td>{column}</td>)}
            </tr>  
          </thead>
          <tbody>
            { ids.map((userID) => (
              <tr>
                <td>{userID}</td>
                <td className="text-blue-700">
                  <Link 
                    to={`${userID}`}
                    state={{userID: userID}}
                  >{entities[userID].username}</Link>
                </td>
                <td>{entities[userID].name}</td>
                <td>{entities[userID].sources.map(source => <div>{source}</div>)}</td>
              </tr>
            )) }
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div> 
      <h1 className="text-3xl font-bold"> Public view </h1>
      <h2 className="font-bold">All users </h2>
      {content}
      <h2>Frontend server port: {FRONTEND_PORT}</h2>
      <h2>Backend server port: {BACKEND_PORT}</h2>
    </div>
  )
}