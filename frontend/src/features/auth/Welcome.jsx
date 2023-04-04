import { Link } from "react-router-dom"

export default function Welcome() {
  const date = new Date(); 
  const formatted_date = new Intl.DateTimeFormat('en-US').format(date); 
  return (
    <div>
      <h1 className="text-3xl">Welcome.jsx! Public view.</h1>
      <h2>Today is {formatted_date}.</h2> 
      <br/> 
      <div className="border-black border-2 m-2 p-2 rounded-lg w-fit">
        <Link to="sources">View all sources</Link>
      </div>
      <div className="border-black border-2 m-2 p-2 rounded-lg w-fit">
        <Link to="users">List all users</Link>
      </div>
    </div>
  )
}