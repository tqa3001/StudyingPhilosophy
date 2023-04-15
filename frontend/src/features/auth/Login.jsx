import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "./authApiSlice";

export default function Login() {
  const navigate = useNavigate(); 
  const [login, _] = useLoginMutation(); 
  const submitLoginData = () => console.log("log in submit"); 
  const redirectToSignUp = () => navigate("/signup"); 
  return (
    <form id="loginForm" className="mx-auto my-5 p-5 border-2 border-green-600 bg-green-200 w-1/3 rounded-lg">
      <div className="text-3xl font-bold">Login</div>
      <div className="font-bold">Username</div>
      <input type="text" name="username" placeholder="e.g. coffee"
        className="border-black border-2 my-1"/>
      <div className="font-bold">Password</div>
      <input type="password" name="password"
        className="border-black border-2 my-1"/>
      <br />
      <button onClick={submitLoginData}
        className="rounded-full bg-green-500 my-1 py-1 px-5">Login</button>
      <div className="flex flex-row-reverse">
        <div>
          Or&nbsp;
          <span className="font-bold text-green-600" onClick={redirectToSignUp}>
            create a new account
          </span>
        </div>
      </div>
    </form>
  )
}