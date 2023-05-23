import { Link } from "react-router-dom"
import ListSources from "../sources/ListSources";

export default function Welcome() {

  /* Data about current date */
  const date = new Date(); 
  const formatted_date = new Intl.DateTimeFormat('en-US').format(date); 
  return (
    <div className="px-5">
      <h2>Today is {formatted_date}.</h2> 
      <br/> 
      <div className="font-bold text-blue-500 hover:text-blue-700">
        <Link to="../sources">View all sources</Link>
      </div>

      <div className="flex">
        <div className="font-bold w-1/2 text-center">Unanswered questions</div>
        <div className="font-bold w-1/2 text-center">Review</div>
      </div>
    </div>
  )
}