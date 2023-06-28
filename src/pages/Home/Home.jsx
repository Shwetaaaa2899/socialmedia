//it has three componenets 
//left side all options, in between fees , right side people to follow or unfollow to see their feeds
//left side contains -> Home , Eplore,BookMarks,Liked Post, add post 
// On adding post if should show a toast for post created , and new posts should show in ypur profile and timeline as well 
// in feed --> if no folloing , then ur own post
// if no your own post show no feeds
// import { usePostsContext } from "../../context/usercontext"
import { useState } from "react"
import { usePostsConext} from "../../context/postcontext"
import Post from "../Post"
import { useAuth } from "../../context/authcontext"
import { useEffect } from "react"
const Home = () =>{
    // const {displayposts} = usePostsContext()
  const { userInfo}   = useAuth()
  const[liked,setLiked] = useState()
    const {state:{posts,userprofile},getAllUserPostsHandler,getPosts,likePostHandler} = usePostsConext()
    const [postsToBeShown,setpostsToBeShown] = useState(posts)
    console.log(posts)
    useEffect(()=>{
if(liked){
  console.log("called-1")
  likePostHandler()
}
  
 },[liked])
 useEffect(()=>{

    getPosts()
    setpostsToBeShown(posts)
    
   },[])
 
   
    return <>

    
          {
            posts?.map((post) => <Post post = {post} setLiked= {setLiked} getAllUserPostsHandler = {getAllUserPostsHandler} likePostHandler= {likePostHandler} />)
          }
          
    
    </>
}
export default Home;