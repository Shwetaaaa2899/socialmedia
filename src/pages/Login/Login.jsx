import { useAuth } from "../../context/authcontext"
import { useNavigate ,NavLink,useLocation} from "react-router-dom"
import { toast } from "react-toastify"
import { useState} from "react"
import "./Login.css"
// import "./css/Form.css"
const Login =  () => {
   const location = useLocation()
   const navigate = useNavigate()

    const { loginHandler,token,userInfo } = useAuth()
    const [authInfo,setAuthInfo] = useState({username:"",password:""})
    const setUserInfoHandler = (e) =>{
      setAuthInfo({...authInfo,[e.target.name] :e.target.value})
      }
  const  GuestModeData = {
username: "adarshbalika",
password: "adarshBalika123"}
    // console.log("location in auth page is",location)
   
    
    const loginClickHandler = (e) =>{
      e.preventDefault()
     loginHandler(authInfo)
        // navigate("/products")

}

const loginAsGuestHandler = () =>{


// toast("Logged in as Guest")
loginHandler(GuestModeData)
// navigate("/profile")

}
    console.log(userInfo)
    return <>

<div className="form-box">
  <h5 className="form-step">Login</h5>
  <form>
  <div className="field1"> 
    <input   required  type  = "text" name = "username"  onChange = {setUserInfoHandler} placeholder="Your UserName"/>
    
      <input   required  type = "password"   name = "password"  onChange = {setUserInfoHandler}  placeholder="Password" />
    
    </div>

    <button onClick = {loginClickHandler} type="submit" id="submitBtn" className="submitBtn">Submit</button>
  
    </form>
    <button onClick = {loginAsGuestHandler}   className="submitBtn" type="submit">Login As Guest?</button>
    { !token  &&   <button className="submitBtn" type="submit">   <NavLink to = "/signup"style = {{textDecoration:"none" , color:"white" ,border:"none"}} className="submitBtn">Create a New Account?Sign Up</NavLink> </button>}
  </div>

 
    </>
}
export default Login;