import { useState, useEffect } from "react"
import {usePostsConext} from "../../context/postcontext";
import Post from "../Posts/Post"
import { useAuth } from "../../context/authcontext";
const LikedPost = () =>{
    const {state:{posts},getPosts}= usePostsConext()
    const { userInfo} = useAuth()
   
    // const[liked,setLiked] = useState(likedPosts)
    useEffect(()=>{

        getPosts()

    },[posts,userInfo])
    const likedPostsByUser = posts?.filter((post) => post.likes.likedBy.find((user)=>  user.username === userInfo.username ) )
    // 
    return <div>

{
    likedPostsByUser?.length>0 ? likedPostsByUser?.map((post)=> <Post key={post._id} post = {post}/> )
    :<div>
    <h3>No Liked Posts by you </h3>
    </div>

}

    </div>
}
export default LikedPost;