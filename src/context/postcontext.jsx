// 1.get all the posts -



// 2. * This handler gets post by postId in the db.
// * send GET Request at /api/posts/:postId

import { useState , createContext, useContext,useReducer } from "react"
// import ProductsReducer,{initialState} from "../reducer/postreducer"
import { useEffect } from "react"
import PostReducer ,{initialState} from "../reducer/postreducer";
import UserProfile from "../"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./authcontext";
export const PostsProviderkey = createContext()
export const usePostsContext = () => useContext(PostsProviderkey);

 const PostsProvider = ({children}) =>{
const navigate = useNavigate()
  const {token,userInfo,updateProfile} = useAuth()
  // console.log(token)
const[isloading,setIsLoading] = useState(false)
const[error,setError] = useState(false)
const[displayposts,setPosts] = useState([])
const[posts,setPost] = useState([])
const [state,dispatch] = useReducer(PostReducer,initialState)
// const[]
// const [state, dispatch] = useReducer(ProductsReducer, initialState);
   
// 1.get all posts  from db
   const getPosts = async()=>{
    try{
      setIsLoading(true)
       const response = await fetch(`/api/posts`)
         if(response.status === 200){
          const {posts} = await response.json();
          setPost(posts)
          dispatch({type:"DISPLAY-POSTS",payload:posts})

         }
         
    }
		
    
      catch(e){
        setError(true);

      }  
      finally{
        setIsLoading(false)
      }
    }
   

    //2.quest at  /api/posts/user/:username
  const getAllUserPostsHandler = async(username) =>{
  try{
    const response = await fetch(`/api/posts/user/${username}`)
    console.log("post id is",response)
    if(response.status === 200){
      console.log(200)
      const {posts} = await response.json()
  
      dispatch({type:"USER-SPECIFIC-POSTS",payload:posts})

    }

  }
  catch(e){}

  }
    // useEffect(()=>{  
    //   getPosts();
    //    },[])
    //Unlike a post logic -/api/posts/dislike/:postId#


 const  UnlikePostHandler= async(UnLikedPostId) =>{
  console.log("unlike id",UnLikedPostId)

  try{
    const resp = await fetch(`/api/posts/dislike/${UnLikedPostId}`,{
      method:"POST",
      headers:{'Accept':'application/json',
  'Content-Type':'application/json',
  authorization:token
  }})
  if(resp.status === 201){
    const UnLikedPosts = await resp.json()

      
    console.log("dislike",UnLikedPosts,UnLikedPostId)
         
    // const {UnLikedPosts, UnLikedPostId} =  action.payload
    dispatch({type:"UNLIKE-A-POST",payload:{UnLikedPosts, UnLikedPostId}})
    toast.success("Post UnLiked")


  }

  }
  catch(e){

  }
 }
    // 3.Liked Posts
    /**
 * This handler handles liking a post in the db.
 * send POST Request at /api/posts/like/:postId
 * */
    const likePostHandler = async(likedPostId) =>{
      console.log("received is",likedPostId)

      try{
  const response   =await fetch(`/api/posts/like/${likedPostId}`,{
          method:"POST",
          headers:{'Accept':'application/json',
      'Content-Type':'application/json',
      authorization:token
      }})

        if(response.status === 201){
          const LikedPosts= await response.json()
          // const {LikedPosts, likedPostId} =  action.payload

         
          dispatch({type:"LIKED-A-POST",payload:{LikedPosts, likedPostId}})
          toast.success("Post Liked")
        }
        else if(response.status === 400){
          
        //  toast("Cannot like a post that is already liked. ")
        UnlikePostHandler(likedPostId)
        
        }
      }
      catch(e){

      }

    }
        
    
      // console.log(state.posts[state.posts.indexOf(state.posts.likes)])
    
// const LikedPosts = () => {
//   const [postsLikedByUser, setPostsLikedByUser] = useState([]);

  // const { allPosts } = useSelector((state) => state.post);
  // const { user } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   const likedPosts = allPosts.filter((currPost) =>
  //     currPost.likes.likedBy.find(
  //       (currUser) => currUser.username === user?.username
  //     )
  //   );
  //   setPostsLikedByUser(likedPosts);
  // }, [allPosts, user]);


    
           //4.crate and add the post
           const createPostHandler = async(input) =>{
          
           try{
              const passObj = {postData:input}
            

              const response = await fetch("/api/posts",{
             method:"POST",
          headers:{'Accept':'application/json',
      'Content-Type':'application/json',
      authorization:token},
      body:JSON.stringify(passObj)
      })

              if(response.status === 201){
                const {posts} = await response.json()
                // console.log("post is",posts)
                dispatch({type:"CREATE-A-POST",payload:posts})
              }
            }
            catch(e){

            }
           }


const getSortedPosts = (posts, sortBy) => {
  console.log(sortBy,posts)
    switch (sortBy) {
      case "Latest":
        return [...posts].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "Oldest":
        return [...posts].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      case "Trending":
        return [...posts].sort((a, b) => b.likes.likeCount - a.likes.likeCount);
      default:
        return [...posts];
    }
  };
  //get bookmarked posts
  const isBookMarked = (post) =>{
  return   state?.bookMark?.some((bookMark) => bookMark._id === post._id )

   
  }
  const bookMarkPostHandler = (post) =>{
    console.log("post received for bookmark",post)
    const isBookMarked = state.bookMark.some((bookMarkPost) => bookMarkPost._id === post._id)
    // console.log(resp)
 if(isBookMarked){
dispatch({type:"REMOVE-BOOMARK-POST",payload:post}) 
  toast.success(" Post BookMarked")
 }  
    else{

      
    dispatch({type:"ADD-BOOMARK-POST",payload:post}) 
 toast.success("Post UnBookMarked ")
    }
    
  
  }

//get all feed
const getFeeds = ()=>{
  getPosts()
 
 
  const feed = state && state.posts && state?.posts.filter((post) => post.username === userInfo?.username ||   userInfo?.following?.some((user) =>user.username === post.username))

  dispatch({type:"GET-FEEDS",payload:feed})
 
  }


        //
        const deletePostHandler = async(deletePost) =>{
          // console.log("receieved input",deletePost)
          try{
            const passObj = {data:deletePost}
            

            const response = await fetch(`/api/posts/${deletePost._id}`
            ,{
           method:"POST",
        headers:{'Accept':'application/json',
    'Content-Type':'application/json',
    authorization:token}
    })
    console.log("resp input",response)
            if(response.status === 201){
              const {posts} = await response.json()
              console.log("post is",posts)
              dispatch({type:"DELETE-POST",payload:posts})
            }
          

          }
          catch(e){
            
          }
        }










/**
 * This handler handles updating a post in the db.
 * send POST Request at /api/posts/edit/:postId
 * body contains { postData }
 **/
 const editPostHandler = async(postId,updatedPost) =>{
  
  const passObj = {postData:updatedPost}
  console.log("id n post is",passObj)
  try{
    const request = await fetch(`/api/posts/edit/${postId}`,
   {
      method:"POST",
   headers:{'Accept':'application/json',
'Content-Type':'application/json',
authorization:token},
body:JSON.stringify(passObj)
});
console.log(request)
if(request.status === 201){
  const {posts} = await request.json()
  // console.log("from edit",response)

   dispatch({type:"EDIT-POST",payload:posts})
            
}
if(request.status === 400){
  toast("Cannot edit a Post doesn't belong to the logged in User.")
}

    

  }
  catch(e){

    console.log("something went wrong while edititng")
  }
 }




   return <PostsProviderkey.Provider value = {{state,
   
   getSortedPosts,dispatch,getPosts,
   deletePostHandler,
   bookMarkPostHandler,
   isBookMarked,
   editPostHandler,
   getAllUserPostsHandler,likePostHandler,createPostHandler,getFeeds}}>{children}</PostsProviderkey.Provider>
}


export default PostsProvider;
export const usePostsConext = () => useContext(PostsProviderkey)

// import {
//   addComment,
//   addPost,
//   deleteComment,
//   deletePost,
//   editComment,
//   editPost,
//   getAllPostsFromServer,
//   likePost,
//   dislikePost,
//   bookmarkPost,
//   unBookmarkPost,
//   getBookmarks,
//   getPostsByUserName,
// } from "services";

