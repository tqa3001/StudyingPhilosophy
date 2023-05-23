import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import inputIsValid from "../../helpers/inputIsValid";
import newMessage from "../../app/messageQueue/newMessage";
import { store } from "../../app/store";
import { loginIsSuccessful } from "../../app/session/sessionSlice";

export default function Login() {
  const navigate = useNavigate(); 
  const [login, _] = useLoginMutation(); 
  const submitLoginData = async () => {
    const loginForm = document.getElementById("loginForm");
    let isValid = inputIsValid(loginForm);
    if (isValid) {
      const rawFormData = new FormData(loginForm);
      const data = Object.fromEntries(rawFormData.entries());
      /* Refactor: Put this try-catch block in a functon and reuse? */
      try {
        const response = await login(data).unwrap();
        newMessage({
          type: "success",
          message: response.msg
        }); 
        store.dispatch(loginIsSuccessful({
          sessionID: response.sessionID,
          userID: response.userID,
          errorMessage: null
        }));
        navigate('/dashboard');
      } catch(error) {
        console.log("bruh", error);
        newMessage({
          type: "error",
          message: error.data.msg
        })
      }
    }
  }
  const redirectToSignUp = () => navigate("/signup"); 
  return (
    <form id="loginForm" 
      className="mx-auto my-16 p-10 border-2 border-blue-500 bg-blue-300 w-1/2 rounded-lg">
      <div className="flex justify-between flex-col">
        <div>
          <div className="text-3xl font-bold mb-10 text-center">Login</div>
          <div className="font-bold">Username</div>
          <input type="text" name="username" placeholder="e.g. coffee" required
            className="border-black border-2 my-1 w-full"/>
          <div className="font-bold">Password</div>
          <input type="password" name="password" required
            className="border-black border-2 my-1 w-full"/>
          <br />
        </div>
      
        <div className="flex justify-between py-1"> 
          <button type="button" onClick={submitLoginData}
            className="rounded-full bg-blue-500 border-blue-700 hover:bg-blue-700 
              border-b-4 my-1 py-1 px-5 w-fit">
              Login</button>
          <div className="h-1/2 my-auto"> Or&nbsp;
            <span className="font-bold text-blue-500 hover:text-blue-700" onClick={redirectToSignUp}>
              create a new account
            </span>
          </div>
        </div>

      </div>
    </form>
  )
}