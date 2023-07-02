import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {RxAvatar} from "react-icons/rx"
import {useUserContext} from "../../context/usercontext"
import { usePostsConext} from "../../context/postcontext"
import Post from "../Post"
import{dum} from "../../../src/instagram.png"
const UserProfile = () =>{
    const { username } = useParams()
    
    const {state:{posts,userprofile},getAllUserPostsHandler} = usePostsConext()
   const {getUserInfoByUserName }= useUserContext()
  


  
   
    
useEffect(()=>{
    getAllUserPostsHandler(username)
},[posts])
const profile =  getUserInfoByUserName(username)
console.log("profile data is",profile,username)
 
return <>
 <div>
    <h1>Profile:-</h1>
    <div>
                 <span>
                  {/* My image:<input type="image/png" label = "Upload your image here"  /> */}
                 </span>   
                  
                </div>
               
              <div className ="data:image/webp;base64,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" >

                      {profile?.avatarUrl?  
                         <img style ={{width:"50px",height:"50px",borderRadius:"50%" ,objectFit:"cover"}} src = {profile?.avatarUrl} />
                      :
                      <RxAvatar/>
                      }
                      </div>
              
               
 <div><h4>{profile?.firstName} {profile?.lastName}</h4></div>
   <span>@{profile?.username}</span>
  <div>
  <div>  <p>{profile?.following.length }-Following</p></div>
  <div>
    <p>{profile?.followers.length } -Follower</p> </div>
  <div>    <p>{userprofile?.length } -Posts</p> </div>


  </div> 
       {/* <button onClick = {() => setModal(!modal)}  >Edit Profile</button>  */}



    </div>


    {
        userprofile?.map((post)=> <Post post = {post} />)

    }
</>

}
export default UserProfile;