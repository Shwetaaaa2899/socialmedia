import { useAuth } from "../../context/authcontext"
import { useNavigate ,NavLink,useLocation} from "react-router-dom"
import { toast } from "react-toastify"
import { useState} from "react"

// import "./css/Form.css"
export default function Login() {
   const location = useLocation()
   const navigate = useNavigate()

    const { loginHandler,token } = useAuth()
    const [userInfo,setUserInfo] = useState({username:"",password:""})
    const setUserInfoHandler = (e) =>{
      setUserInfo({...userInfo,[e.target.name] :e.target.value})
      }
  const  GuestModeData = {
username: "adarshbalika",
password: "adarshBalika123"}
    // console.log("location in auth page is",location)
   
    
    const loginClickHandler = (e) =>{
      e.preventDefault()
     loginHandler(userInfo)
        // navigate("/products")

}

const loginAsGuestHandler = () =>{


// toast("Logged in as Guest")
loginHandler(GuestModeData)
// navigate("/profile")

}
    
    return <>

<div className="form-box">
  <h5 className="form-step">Login</h5>
  <form>
  <div className="field1">   <input  required  type  = "text" name = "username"  onChange = {setUserInfoHandler} placeholder="Name"/>
    
      <input required  type = "password"   name = "password"  onChange = {setUserInfoHandler}  placeholder="Password" />
    
    </div>

    <button onClick = {loginClickHandler} type="submit" id="submitBtn" className="submitBtn">Submit</button>
  
    </form>
    <button onClick = {loginAsGuestHandler}   className="submitBtn" type="submit">Login As Guest?</button>
    { !token  &&   <button className="submitBtn" type="submit">   <NavLink to = "/signup"style = {{textDecoration:"none" , color:"white" ,border:"none"}} className="submitBtn">Create a New Account?Sign Up</NavLink> </button>}
  </div>

 
    </>
}
