//It will show posts of people being followed only - else no post 
//it can show varios people 's to gfollow and see
import { NavLink} from  "react-router-dom"
import { useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { usePostsContext } from "../context/postcontext";
import { useAuth } from "../context/authcontext";
import {BsFillBookmarkFill} from "react-icons/bs";
import EditPost from "./Home/EditPostModal";
import { toast } from "react-toastify";
import {useState} from "react";
import {useUserContext} from "../context/usercontext"
import "./Post.css"
const Post = ({post}) =>{

    const{state,likePostHandler,dispatch,
      deletePostHandler,
      isLiked,
      
      isBookMarked,bookMarkPostHandler,editPostHandler} = usePostsContext()
   const {userInfo} =  useAuth()
   const {getUserInfoByUserName }= useUserContext()
   const[modal,setModal] = useState(false)

 
   
   const editPost = (e, post)=>{
    e.preventDefault()
  //  if(userInfo.username !== post.username) {
  //   toast("U cant edit this")
  //  }

  //  else if( userInfo.username === post.username){
  //   setModal(true)
  //  }
  
  setModal(true)

    
   }
 const userDetails =  getUserInfoByUserName(post.username)
 

    return <div className = "container"> 


    

    

    <div className = "User-profile"  >

   <img   className = "User-profile-picture" src = {userDetails?.avatarUrl} />
   <div className = "User-profile-name">
   {userDetails.firstName}  {userDetails.lastName}
   </div>
   <div className = "User-profile-username">
  <NavLink to  = {`/api/posts/user/${post.username}`} >
     
     
     {post.username}</NavLink>
  </div>
   
   <div className = "User-profile-createdDate">
{userDetails.createdAt}
  </div>

  
 


      
     
        <span><h4>{post?.content}</h4></span>
        <span>Liked: <h4>{isLiked(post._id)?"yes":"no"}</h4></span>
        

        <img src =  {post?.mediaURL} />
       
        <div  style = {{color:isLiked(post._id)?"red":"black"}}
           onClick={ 
            () => {
               
            likePostHandler(post._id)
            }
            } > 
<AiFillHeart   />

     </div>
     <div style = {{color: isBookMarked(post)?"orange":"grey"}} onClick ={()=>bookMarkPostHandler(post)}><BsFillBookmarkFill /></div>
     <button onClick ={(e)=>editPost(e,post)}>Edit</button>
     <button onClick ={()=>deletePostHandler(post._id)}>Delete</button>
  
 
    </div>


{
  modal && <EditPost updatedPost = {post}  setModal = {setModal}/>
}
    </div>

}
export default Post;

