import { AuthContext } from "../context/authcontext"
import { useNavigate ,NavLink,useLocation} from "react-router-dom"
// import { toast } from "react-toastify"
import { useState} from "react"
import "./css/Form.css"
export default function Login() {
   const location = useLocation()
   const navigate = useNavigate()

    const { loginHandler,token } = useAuth()
    const [userData,setUserData] = useState({username:"",password:""})
  const  GuestuserData = {username : "adarshBalika",
password:"adarshBalika123"} 

    const loginClickHandler = () =>{
    loginHandler(userData)
        // navigate("/products")

}

const loginAsGuestHandler = () =>{


// toast("Logged in as Guest")
loginHandler(GuestuserData)

// navigate("/profile")

}
const InputHandler = (e) =>{
  setUserData({...userData,[e.target.name]:e.target.value})
}
    
    return <>

<div className="form-box">
  <h5 className="form-step">Login</h5>
  <form>
  <div className="field1">   <input  required value = {email} type  = "text" name = "username"  onChange = {InputHandler} placeholder="USer name"/>
    
      <input required  value = {password} type = "password" onChange = {InputHandler}  placeholder="Password" />
    
    </div>
    <button onClick = {loginClickHandler} type="submit" id="submitBtn" className="submitBtn">submit</button>
  
    </form>
    <button onClick = {loginAsGuestHandler}   className="submitBtn" type="submit">Login As Guest?</button>
    { !token  &&   <button className="submitBtn" type="submit">   <NavLink to = "/signup"style = {{textDecoration:"none" , color:"white" ,border:"none"}} className="submitBtn">Create a New Account?Sign Up</NavLink> </button>}
  </div>

 
    </>
}
