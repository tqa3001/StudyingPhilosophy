import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAddUserMutation } from "../users/usersApiSlice"
import { useNavigate } from "react-router-dom";
import { faEye } from "@fortawesome/free-solid-svg-icons";

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
    let inputs = [...document.getElementsByTagName("input")]; // live htmldocuments -> normal array
    inputs.reverse();
    let isValid = true;
    for (let input of inputs) {  // in != of
      isValid &= input.reportValidity(); 
    }
    if (isValid) {
      let password = document.getElementById("password").value;
      let retype = document.getElementById("password-retype").value;
      return password == retype; 
    }
    return isValid;
  }

  const signup = () => {
    const formData = new FormData(document.getElementById("loginForm"));
    const formDataObject = Object.fromEntries(formData.entries()); 
    delete formDataObject.passwordRetype;
    console.log("form data: ", formDataObject); 
    if (checkInputValidity()) {
      // addUser()
    }
  }

  return (
    <form id="loginForm" className="mx-auto my-5 p-5 border-2 border-green-600 bg-green-200 w-fit rounded-lg">
      <div className="text-3xl font-bold">Register</div>
      
      {/* Username */}
      <div className="font-bold">Username</div>
      <input type="text" name="username" placeholder="e.g. coffee" required
        className="border-black border-2 my-1"/>
      
      {/* Email */}
      <div className="font-bold">Email</div>
      <div>This email will be used for account recovery.</div>
      <input type="email" name="email" required
        className="border-black border-2 my-1"/>
      
      {/* Password */}
      <div className="font-bold">Password</div>
      <input id="password" type="password" name="password" required
        className="border-black border-2 my-1"/>
      <button onClick={TogglePasswordVisibility}
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