import { Link } from "react-router-dom"

export default function Welcome() {
  const date = new Date(); 
  const formatted_date = new Intl.DateTimeFormat('en-US').format(date); 
  return (
    <div>
      <h1 className="text-3xl">Welcome.jsx!</h1>
      <h2>Today is {formatted_date}.</h2> 
      <br/> 
      <Link to="sources">My Sources</Link>
      <Link to="userProfile">My Profile</Link>
    </div>
  )
}