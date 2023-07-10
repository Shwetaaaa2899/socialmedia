import { useParams,Link } from "react-router-dom";
import { useEffect,useState } from "react";
import {RxAvatar} from "react-icons/rx"
import {useUserContext} from "../../context/usercontext"
import { usePostsConext} from "../../context/postcontext"
import Post from "../Posts/Post"
import {AiFillEdit} from "react-icons/ai"
import "./UserProfile.css"
// import{dum} from "../../../src/instagram.png";
import EditProfile from "../Home/EditProfileModal/EditProfile"
import { useAuth } from "../../context/authcontext";
const UserProfile = () =>{
    const { username } = useParams()
// console.log("hey user",username)
    const [modal,setModal] = useState(false)
 const {userInfo} = useAuth()
   const {state:{profileBasedPosts,profile,users} ,
   state
   , getUserHandler 
   ,
   editUserHandler
   ,getAllUserPostsHandler}= useUserContext()
   const[loading,setLoading] = useState(true)

   const showOpen = () => setModal(true)

   const showClose  = () => setModal(false)

 const getUserSpecificdata = (username) =>{
   
const user = users?.find((user)=>user.username === username)


   user && getUserHandler(user)
    getAllUserPostsHandler(username)
 }

   useEffect(() =>{
    setLoading(true)  
    if(username === userInfo.username){
        editUserHandler(userInfo)
    }
    username &&  getUserSpecificdata(username)
    setLoading(false)
    
   },[username,state])
//  console.log(profile)
   return <>
{
    loading ?(<h1> Loadingg the data........</h1>)
:(
    <>
    <div className = "profile-container">

<div  className = "profile-image">
{
    profile?.avatarUrl?
    <img  src = {profile?.avatarUrl} />
    :
    <img src = "https://www.wrkbemanning.no/wp-content/uploads/2017/04/profile-pic-dummy.jpg" />

}

<div  className = "profile-info">
<h4>{profile?.firstName}  {profile?.lastName}</h4>
<small>@{profile?.username}</small>
</div>

</div>

<div className = "profile-description" >
<h4>
    {profile.bio}
</h4>
<small className = "url">
<Link target="_blank" to = {profile?.website}>
{profile?.website}
</Link></small>

</div>

<div className = "lower-profile-section">
    <div className = "item">
        {profile?.posts || 0} Posts
    </div>
    <div className = "item">
    {profile?.followers?.length || 0} Followers
    </div>
    <div className = "item">
    {profile?.following?.length || 0} Following
    </div>

    
</div>

{username === userInfo.username &&  
<button onClick = {showOpen}> <AiFillEdit /> Edit</button>

}
</div>

<div className = "profile-posts">

    {

        profileBasedPosts.length> 0  && 
        profileBasedPosts?.map((post) => <Post post = {post}  key = {post._id}/>)
    }
    </div>
    </>
)
}
   


   {
    modal && <EditProfile  showClose = { showClose } profile = { profile} />
   }

   
    
   </>   
}
export default UserProfile;