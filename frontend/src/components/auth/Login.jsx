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
      className="mx-auto my-5 p-10 border-2 border-green-600 bg-green-200 w-1/3 rounded-lg">
      <div>
        <div className="text-3xl font-bold">Login</div>
        <div className="font-bold">Username</div>
        <input type="text" name="username" placeholder="e.g. coffee" required
          className="border-black border-2 my-1 w-full"/>
        <div className="font-bold">Password</div>
        <input type="password" name="password" required
          className="border-black border-2 my-1 w-full"/>
        <br />
        <button type="button" onClick={submitLoginData}
          className="rounded-full bg-green-500 my-1 py-1 px-5 w-full">Login</button>
      </div>
      
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