import { Link } from "react-router-dom"

export default function Welcome() {
  const date = new Date(); 
  const formatted_date = new Intl.DateTimeFormat('en-US').format(date); 
  return (
    <div>
      <h1 className="text-3xl">Welcome.jsx! Public view.</h1>
      <h2>Today is {formatted_date}.</h2> 
      <br/> 
      <Link to="sources">Public stuff with sources</Link>
      <br/>
      <Link to="users">List all users</Link>
    </div>
  )
}