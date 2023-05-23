import { selectSourceById, useGetSourcesQuery } from "../../../features/sources/sourcesApiSlice";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom"; 
// hmm.. some how without this line nodejs will still take the import in ListUsers.jsx and apply it to this file
import "../../../styles/tableStyle.css" 

export default function ListAllSources() {
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
              <tr>
                <td className="text-blue-700">
                  <Link 
                    to={sourceID}
                    state={{sourceID: sourceID}}
                  >{source.title}
                  </Link>
                </td>
                <td>{source.origin}</td>
                <td>{source.description}</td>
                <td>{source.parentUserID}</td>
              </tr>
            )
          }
          )}
        </tbody>
      </table>
    ); 
  } 
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold my-3">Public sources</h1>
      {table}
    </div>
  )
}