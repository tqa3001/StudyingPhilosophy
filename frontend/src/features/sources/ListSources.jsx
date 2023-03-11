import { selectSourceById, useGetSourcesQuery } from "./sourcesApiSlice";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ListSources() {
  const { data, isLoading, isError } = useGetSourcesQuery();  
  let table = null; 
  if (isLoading) 
    table = <div>Loading sources... <FontAwesomeIcon icon={faRotate}/></div> 
  else if (isError) 
    table = <div>Error loading sources :\</div> 
  else {
    const { ids: sourceIDs, entities: sources } = data; 
    table = (
      <table className="table-auto"> 
        <thead>
          <tr className="font-bold">
            <td>Title</td>
            <td>Origin</td>
            <td>Description</td>
            <td>UserID</td>
          </tr>
        </thead>
        <tbody>
          {sourceIDs.map(sourceID => {
            console.log("BRUH", sourceID); 
            const source = sources[sourceID]; 
            return (
              <Link 
                to={sourceID}
                state={{sourceID: sourceID}}
              >
                <tr>
                  <td>{source.title}</td>
                  <td>{source.origin}</td>
                  <td>{source.description}</td>
                  <td>{source.parentUserID}</td>
                </tr>
              </Link>
            )
          }
          )}
        </tbody>
      </table>
    ); 
  } 
  return (
    <div>
      <h1 className="font-bold">All sources</h1>
      {table}
    </div>
  )
}