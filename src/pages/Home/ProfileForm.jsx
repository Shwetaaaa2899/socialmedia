import { useState} from "react"
const ProfileForm = ({setModal,profile,setProfile}) =>{
    const [ editprofile,setEditProfile] = useState({})
    const setProfileDataOnSubmit= (e)  =>{
        e.preventdefault()
        setProfile(editprofile)
    }
    const inputHandler = (e) =>{
        setEditProfile({...editprofile,[e.target.name] : e.target.value})

    }
    return <>
     
<input type = "text" onChange = {inputHandler}  name = "username"  placeholder = "username"/>

<div className="form-box">
  <h5 className="form-step">Login</h5>
  <form onSubmit={setProfileDataOnSubmit}>
  <div className="field1">   <input  required  type  = "text" name = "firstName"  onChange = {inputHandler}   placeholder="Name"/>
    
      <input required  type = "text"   name = "bio"   onChange = {inputHandler}  placeholder="bio" />
    
    </div>

    <button onClick = {() => setModal(false)} type="submit" id="submitBtn" className="submitBtn">Submit</button>
  
    </form>
    </div>
   
    </>

}
export default ProfileForm