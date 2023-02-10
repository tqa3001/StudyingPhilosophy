import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader"
import DashboardFooter from "./DashboardFooter"

export default function DashboardLayout() {
  return (
    <>
      <DashboardHeader /> 
      <main>
        <h1 className="text-3xl">Dashboard Layout</h1>
        <Outlet />
      </main>
      <DashboardFooter />
    </>
  )
}