//It will show posts of people being followed only - else no post 
//it can show varios people 's to gfollow and see
import { NavLink} from  "react-router-dom"
import { useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { usePostsContext } from "../context/postcontext";
import { useAuth } from "../context/authcontext";
import {BsFillBookmarkFill} from "react-icons/bs";
const Post = ({post,isLiked}) =>{
    const{state,likePostHandler,dispatch,
      deletePostHandler,
      isBookMarked,bookMarkPostHandler} = usePostsContext()
   const {userInfo } =  useAuth()
  
   const editPost = (e, post)=>{
    
    e.preventDefault();
    console.log(post)
    dispatch({type:"EDIT-POST",payload:post})
    
   }
 

    return <> 

    <div className = "user-container" style = {{dispaly :"flex",flex:2,border : "2px solid black",textAlign:"center"}} >
  
  <div>
{post.createdAt}
  </div>
        <NavLink to  = {`/api/posts/user/${post.username}`}>
     
     
        {post.username}</NavLink>
        <img  src = {post?.avatarUrl} />
        <span><h4>{post?.content}</h4></span>
        <span>Liked: <h4>{isLiked(post._id)?"yes":"no"}</h4></span>
        

        <img src =  {post.mediaURL} />
        {/* style = {{color: handlewishlistCheck(product)?"red":"black"}} */}
      {/* {  console.log(post?.liked)} */}
        <div    style = {{color : isLiked(post._id)?"red":"grey"}} onClick={ 
            () => {
               
            likePostHandler(post._id)
            }
            } > 
<AiFillHeart   />

     </div>
     <div style = {{color: isBookMarked(post)?"orange":"grey"}} onClick ={()=>bookMarkPostHandler(post)}><BsFillBookmarkFill /></div>
     <button onClick ={(e)=>editPost(e,post)}>Edit</button>
     <button onClick ={()=>deletePostHandler(post)}>Delete</button>
  
 
    </div>

    </>

}
export default Post;