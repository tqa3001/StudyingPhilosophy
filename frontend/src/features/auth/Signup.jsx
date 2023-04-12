export default function Signup() {
  const signup = () => console.log("sign up"); 
  return (
    <form id="loginForm" className="mx-auto my-5 p-5 border-2 border-green-600 bg-green-200 w-fit rounded-lg">
      <div className="text-3xl font-bold">Register</div>
      <div className="font-bold">Username</div>
      <input type="text" name="username" placeholder="e.g. coffee" required
        className="border-black border-2 my-1"/>
      <div className="font-bold">Email</div>
      <div>This email will be used for account recovery.</div>
      <input type="email" required
        className="border-black border-2 my-1"/>
      <div className="font-bold">Password</div>
      <input type="password" name="password" required
        className="border-black border-2 my-1"/>
      <div className="font-bold">Re-enter password</div>
      <input type="password" name="passwordRetype" required
        className="border-black border-2 my-1"/>
      <br />
      <button onClick={signup}
        className="rounded-full bg-green-500 my-1 py-1 px-5">Submit</button>
    </form>
  )
}

/* maybe implement: 
  - prevent too many signups. 
  - strong password algorithn  
*/