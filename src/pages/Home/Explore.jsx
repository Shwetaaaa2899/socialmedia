//It will show posts of people being followed only - else no post 
//it can show varios people 's to gfollow and see
import { useState } from "react"
import { usePostsConext} from "../../context/postcontext"
import Post from "../Post"
import { useAuth } from "../../context/authcontext"
import { useEffect } from "react"
const Explore = () =>{

      // const {displayposts} = usePostsContext()
  const { userInfo}   = useAuth()
  const[liked,setLiked] = useState()
    const {state:{posts,userprofile},getAllUserPostsHandler,getPosts,likePostHandler} = usePostsConext()
    // const [postsToBeShown,setpostsToBeShown] = useState(posts)
    console.log(posts)
    useEffect(()=>{
if(liked){
  console.log("called-1")
  likePostHandler()
}
  
 },[liked])
 useEffect(()=>{

    getPosts()
    // setpostsToBeShown(posts)
    
   },[posts])
 
   
    return <>

         
          {
            posts?.map((post) => <Post key = {post._id}  post = {post} setLiked= {setLiked} getAllUserPostsHandler = {getAllUserPostsHandler} likePostHandler= {likePostHandler} />)
          }
          
    </>

}
export default Explore;