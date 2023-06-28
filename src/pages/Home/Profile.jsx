import {useUserContext } from "../../context/usercontext";
import {useAuth} from "../../context/authcontext"
import { useState,useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { RxAvatar} from "react-icons/rx"
import ProfileForm from "./ProfileForm"
// import ProfileForm from "./ProfileForm"

const Profile = () =>{
   
        const {token,userInfo} = useAuth()
       const [profile,setProfile] = useState()
       const [modal,setModal] = useState(false)
      //  const { state:{profile}} = useUserContext()
       console.log(profile)
const navigate = useNavigate()
        useEffect(()=>{
         if(userInfo){

      
          const {firstName,lastName,following,followers,username,avatarUrl} =userInfo;
          setProfile({firstName,lastName,following,followers,username,avatarUrl})
         }
         else{
          navigate("/login")
         }
         
        },[userInfo])
        
   
    return <>
 
  {
    profile &&
    <div>
    <h1>Profile:-</h1>
    <div>
                 <span>
                  {/* My image:<input type="image/png" label = "Upload your image here"  /> */}
                 </span>   
                  
                </div>
               
                {/* <button >
                        Upload!
                    </button> */} 

                      {profile.avatarUrl?     <img src = {profile.avatarUrl} />
                      :
                      <RxAvatar/>
                      }
                
              
               
 <p><label>Name:</label>{profile.firstName} {profile.lastName}</p>
   <p><label>UserName:</label>{profile.username}</p>
   <p><label>Following:</label>{profile.following.length }</p>
    <p><label>Follower:</label>{profile.followers.length }</p> 
       <button onClick = {() => setModal(!modal)}  >Edit Profile</button> 



    </div>

  }
     
  {
   
    modal &&  < ProfileForm setModal = {setModal } profile = {profile} setProfile = {setProfile} />

  }

</>
}
export default Profile;