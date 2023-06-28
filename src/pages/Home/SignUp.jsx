import { useAuth } from "../../context/authcontext"
import { useState} from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function SignUp() {
    const { signUpHandler} = useAuth()
   
    const navigate = useNavigate();
   
    const [userSignUpDetails, setUserSignUpDetails] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
      });
      const setInputHandler = (e) => {
     
        setUserSignUpDetails({...userSignUpDetails,
            [e.target.name]:e.target.value
        } 
            )
      }
   
      const submitHandler = (e) =>{
        e.preventDefault()
        const {email,  password,   confirmPassword,firstName,lastName} = userSignUpDetails
        
if(email.length > 0 && password.length>0  && confirmPassword.length>0 &&   firstName.length>0 &&  lastName.length>0 ){

      signUpHandler({...userSignUpDetails,username:firstName+lastName.charAt(0)})
    }else{
      toast("please fill all the fields")
    }
  
      }

return <>

<div className="form-box">
  <h5 className="form-step">Sign Up</h5>
  <form>
    <div className="field1">
      {/* <label> customer info </label> */}
      <input  required placeholder=" First Name"  type  = "text" name = "firstName"   onChange = {setInputHandler}/>
      <input  required placeholder="Last Name"  type  = "text" name = "lastName"  onChange = { setInputHandler} />
      <input  required placeholder="E-mail" type = "text" name = "email" onChange = {setInputHandler}  />
      
      <input required placeholder="Password" type = "password" name = "password" onChange = {setInputHandler}/>
      <input  required placeholder="Confirm Password" type = "password" name = "confirmPassword" onChange = {setInputHandler}  />
    </div>

    <button type="submit" id="submitBtn" className="submitBtn" onClick = {submitHandler}>submit</button>
  </form>

</div>

</>
}
    
