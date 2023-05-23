import { useState } from "react";
import { useGetSourcesQuery } from "../../../features/sources/sourcesApiSlice";
import CreateNewSource from "../sources/CreateNewSource";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { primary } from "../../../styles/componentStyle";

export default function ListSources() {
  /* Querying the sources */
  const userID = useSelector(state => state.session.userID);
  const sourcesQuery = useGetSourcesQuery(userID); 
  const filtered_sources = sourcesQuery.data; 

  console.log("unreal", userID, sourcesQuery);

  /* Objects for creating a new source */

  const [showCreateSource, setCreateSource] = useState(0);
  let toggleCreateSource = () => {
    setCreateSource(showCreateSource ^ 1);
  }
  
  let createSourceButton = 
    <button id="createSourceButton" className="font-bold"
      onClick={toggleCreateSource}>Create source
    </button>

  let createSourceComponent = null;
  if (showCreateSource) {
    createSourceButton = <button id="createSourceButton" className="font-bold"
      onClick={toggleCreateSource}>Hide create window
    </button>
    createSourceComponent = <div className="mb-5"><CreateNewSource/></div>;
  }
  
  return <div className="p-10">
    <div className="flex justify-between">
      <div className="font-bold text-2xl">User(replace)'s sources</div>
      {createSourceButton}
    </div>
    {createSourceComponent}
    <div className={primary}>
    {
    filtered_sources.ids.map((sourceID) => {
      return (
        <Link 
          to={`../../sources/${sourceID}`} 
          state={{ sourceID: sourceID }}
          relative="path"
        ><div className="flex justify-between px-5">
          <div className="font-bold">{filtered_sources.entities[sourceID].title}</div>
          <div>{sourceID}</div>
        </div></Link>
      )
    })}
    </div> 
  </div>
}