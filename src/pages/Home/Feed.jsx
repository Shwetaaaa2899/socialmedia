//it can show varios people 's to gfollow and see
import { useAuth } from "../../context/authcontext"
import {useUserContext } from "../../context/usercontext"
import { usePostsContext } from "../../context/postcontext";
import {SortContainer} from "./SortContainer"
// import {useAuth} from "../../context/authcontext"

import { useState,useEffect} from "react"
import Post from "../Post"
const Feed = () =>{
    const {state:{feed,posts},getSortedPosts,getFeeds } = usePostsContext()
 
   
  //  const[feed,setFeed] = useState(state.posts)
     const { userInfo }= useAuth()
     useEffect(()=>{
     getFeeds()

     
     },[posts,userInfo])
       // 4. if liked by user
    // likes.likedBy[0].username === userInfo.username?"red":"grey"}}

   
    const   isLiked = (id) => {
      
   //    const resp = feed && feed?.filter((post) => post._id === id)
   //    // console.log("item found",resp)
   //  const final =  resp?.likes?.likedBy?.find((user) => user.username ===  userInfo.username)
   //    // console.log(resp,state.posts)
   //    console.log(resp,final)
   //    return final;
        }

 //1.posts from users other than the current user and whom the current user is not following.
//  const explorePosts = allPosts?.filter(
//   (post) =>
//     post.username !== user?.username &&
//     !user?.following?.find(
//       (followingUser) => followingUser?.username === post?.username
//     )
// );
// 2. posts from the current user or posts from users whom the current user is following.
// const homePosts = allPosts?.filter(
//   (post) =>
//     post?.username === user?.username ||
//     user?.following?.find(
//       (followingUser) => followingUser?.username === post?.username
//right now this page contains feed ka logic

   return <>

{/* <SortContainer/> */}
 
     {feed?.length>0?
      feed?.map((post) => <Post key = {post._id} post = {post}  isLiked={isLiked} />)
      :
      <h1>No Posts yet to be shown</h1>
     }
     

</>
}
export default Feed;