import { Link } from "react-router-dom"

export default function Welcome() {
  const date = new Date(); 
  const formatted_date = new Intl.DateTimeFormat('en-US').format(date); 
  return (
    <div className="px-5">
      <h2>Today is {formatted_date}.</h2> 
      <br/> 
      <div className="font-bold">
        <Link to="../sources">View all sources</Link>
      </div>
      <div className="flex">
        <div className="font-bold w-1/2 text-center">Unanswered questions</div>
        <div className="font-bold w-1/2 text-center">Review</div>
      </div>
    </div>
  )
}