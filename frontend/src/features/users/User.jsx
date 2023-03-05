import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { selectUserById } from "./usersApiSlice";

export default function User() {
  const { id } = useParams();  
  const user = selectUserById(id); 
  console.log("slay queen", id); 
  let display = null; 
  if (!id || !user) {
    display = <div>Invalid User (cringe)</div>
  } else {
    display = (
      <div>
        <h1 className="text-3xl font-bold">temporary shit</h1>
      </div>
    )
  }
  return display;
}