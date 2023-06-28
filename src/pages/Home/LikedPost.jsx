import { useState, useEffect } from "react"
import {usePostsConext} from "../../context/postcontext";
import Post from "../Post"
import { useAuth } from "../../context/authcontext";
const LikedPost = () =>{
    const {state:{likedPosts,posts},getPosts}= usePostsConext()
    const { userInfo} = useAuth()
   
    // const[liked,setLiked] = useState(likedPosts)
    useEffect(()=>{

        getPosts()

    },[posts,userInfo])
    return <>

{
    likedPosts?.length>0 ? likedPosts?.map((post)=> <Post key={post._id} post = {post}/> )
    :<h3>No Liked Posts by you </h3>

}

    </>
}
export default LikedPost;