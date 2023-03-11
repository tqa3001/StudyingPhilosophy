import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader"
import DashboardFooter from "./DashboardFooter"

export default function DashboardLayout() {
  return (
    <>
      <DashboardHeader /> 
      <main className="p-2">
        <Outlet />
      </main>
      <DashboardFooter />
    </>
  )
}