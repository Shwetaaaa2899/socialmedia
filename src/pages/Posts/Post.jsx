//It will show posts of people being followed only - else no post 
//it can show varios people 's to gfollow and see
import {Link} from  "react-router-dom"
import { useNavigate } from "react-router-dom";
import { AiOutlineLike ,AiTwotoneLike} from "react-icons/ai";
import { usePostsContext } from "../../context/postcontext";
import { useAuth } from "../../context/authcontext";
import {BsFillBookmarkFill} from "react-icons/bs";
import EditPost from "../Home/EditPost/EditPostModal";
import { toast } from "react-toastify";
import {useState , useEffect} from "react";
import {useUserContext} from "../../context/usercontext"
import {BsThreeDotsVertical,BsBookmark} from "react-icons/bs"
import {RxAvatar} from "react-icons/rx"
import {BiCommentAdd} from "react-icons/bi"
import "./Post.css"
const Post = ({post}) =>{
  const navigate = useNavigate()

    const{likePostHandler,
      deletePostHandler,
      isLiked,
      
      isBookMarked,bookMarkPostHandler} = usePostsContext()
   const {userInfo} =  useAuth()
   const { state:{users},getUserInfoByUserName }= useUserContext()
   const[modal,setModal] = useState(false)

 const [userprofileData, setUserprofileData]  = useState({})
   
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

const [menu,setMenu] = useState(false)
const openMenu  = () => setMenu(true)
const closeMenu = () => setMenu(false)
const showOptions = () =>{
  console.log()
}


useEffect(()=>{

  const finalResponse = users?.find((user) => user.username === post?.username )
  
  
  setUserprofileData(finalResponse)

},[post.username ])
    return <div className = "post-container"> 

   
     {/* <Link to = {`/posts/user/${post?.username}`}> */}
     <div className = "user-profile-container" >
     {/* <div onClick = {() => navigate(`/posts/user/${post?.username}`)} > */}
     <div className = "User-profile-picture" onClick = {()=>navigate(`/posts/user/${post?.username}`)}>
   {userprofileData?.avatarUrl?

<img  src = {userprofileData?.avatarUrl} />   
:

<RxAvatar />

   }  
  
   </div>
   <div className = "user-name"  onClick = {()=>navigate(`/posts/user/${post?.username}`)}>
   <h4>{userprofileData?.firstName}  {userprofileData?.lastName}</h4>
 
   <small onClick = {()=>navigate(`/posts/user/${post?.username}`)}> {post.username} - {new Date(post.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}</small>

          
        
          
   </div>
 

     {/* </div> */}
    


   {
  modal && <EditPost updatedPost = {post}  setModal = {setModal}/>
}
    

<span onClick = {()=> setMenu(!menu)} className = "drop-down">
          <div>
          <BsThreeDotsVertical />
          </div>    
            </span>
            {menu && 
            <div className = "options">
            <ul>
              <li onClick ={(e)=>editPost(e,post)} >
                Edit
              </li>
              <li onClick ={()=>deletePostHandler(post._id)}>
                Delete
              </li>
            
            </ul>
            </div>
            }
     {/* card's prfoile logic ends */}
 

</div>
   


          
     
       <div className = "message">
   <h4>{post?.content}</h4>
       </div>
      
        
<div  className = "image">
<img   src =  {post?.mediaURL} />
</div>
       
       
        <div  className = "action-btn">
        <span  className = "icon"
           onClick={ 
            () => {
               
            likePostHandler(post._id)
            }
            } > 
            {isLiked(post._id)?
              < AiTwotoneLike  size={20} />
            :

            <AiOutlineLike size={20}   />
            }
          <small style = {{fontSize:"15px"}}>{
              post?.likes.likeCount
            }</small>  


     </span>
     <span  className = "icon"  onClick ={()=>bookMarkPostHandler(post)}> 
     {isBookMarked(post)?
      <BsFillBookmarkFill size={18}  />
      :
     <BsBookmark  size={18}/>
     }
 
     </span>
     <span  className = "icon">
      <BiCommentAdd  size={20} />
     </span>
    
  
    
 </div>
    </div>




}
export default Post;
