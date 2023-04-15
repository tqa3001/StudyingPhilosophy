import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAddUserMutation } from "../users/usersApiSlice"
import { useNavigate } from "react-router-dom";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import newMessage from "../../app/messageQueue/newMessage";
import inputIsValid from "./inputIsValid";

export default function Signup() {
  const [addUser, queryResult] = useAddUserMutation();
  const navigate = useNavigate();

  const TogglePasswordVisibility = () => {
    // Note: You won't be able to console.log() passwords in webview.
    let passwordEl = document.getElementById("password"); 
    let passwordRetypeEl = document.getElementById("password-retype"); 
    const newType = passwordEl.type == "text" ? "password" : "text"; 
    passwordEl.type = newType; 
    passwordRetypeEl.type = newType; 
  }

  const checkInputValidity = () => {
  // https://www.aleksandrhovhannisyan.com/blog/html-input-validation-without-a-form/
    let isValid = inputIsValid(document.getElementById("signupForm"));
    if (isValid) {
      let password = document.getElementById("password");
      let retype = document.getElementById("password-retype");
      if (password.value != retype.value) {
        isValid = false; 
        newMessage({ type: "error", message: "Passwords did not match" }); 
        retype.style.borderColor = "red";
        setTimeout(() => { retype.style.borderColor = "black"; }, 3000);  // cringe
      }
    }
    return isValid;
  }

  const signup = async () => {
    const formData = new FormData(document.getElementById("signupForm"));
    const formDataObject = Object.fromEntries(formData.entries()); 
    delete formDataObject.passwordRetype;
    console.log("form data: ", formDataObject); 
    if (checkInputValidity()) {
      try {
        const response = await addUser(formDataObject).unwrap();
        console.log("slay new user", response); 
        newMessage({type: "success", message: response.msg });
        navigate('/dashboard');
      } catch(error) {
        console.log("bruh error nice!", error);
        /* Refactor? */
        let username = document.getElementById("username"); 
        username.style.borderColor = "red";
        setTimeout(() => { username.style.borderColor = "black"; }, 3000);
        newMessage({
          type: "error", 
          message: error.data.msg
        })
      } 
    }
  }

  return (
    <form id="signupForm" className="mx-auto my-5 p-5 border-2 border-green-600 bg-green-200 w-fit rounded-lg">
      <div className="text-3xl font-bold">Register</div>
      
      {/* Username */}
      <div className="font-bold">Username</div>
      <input id="username" type="text" name="username" placeholder="e.g. coffee" required
        className="border-black border-2 my-1"/>
      
      {/* Email */}
      <div className="font-bold">Email</div>
      <div>This email will be used for account recovery.</div>
      <input id="email" type="email" name="email" required
        className="border-black border-2 my-1"/>
      
      {/* Password */}
      <div className="font-bold">Password</div>
      <input id="password" type="password" name="password" required
        className="border-black border-2 my-1"/>
      <button type="button" onClick={TogglePasswordVisibility}
        className="ml-2"
      ><FontAwesomeIcon icon={faEye} /></button> 
      <div className="font-bold">Re-enter password</div>
      <input id="password-retype" type="password" name="passwordRetype" required
        className="border-black border-2 my-1"/>     
      <br />
      <button type="button" onClick={signup}
        className="rounded-full bg-green-500 my-1 py-1 px-5">Submit</button>
    </form>
  )
}

/* maybe implement: 
  - prevent too many signups. 
  - strong password algorithn  
*/