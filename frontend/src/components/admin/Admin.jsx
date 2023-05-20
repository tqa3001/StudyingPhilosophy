import { Link } from "react-router-dom"

export default function Admin() {
  return (
    <div className="p-5">
      <div className="font-bold text-3xl">Admin Dashboard</div>
      <div className="font-bold">
        <Link to="users">List all users</Link>
      </div>
      <div className="font-bold">Analytics</div>
    </div>
  )
}