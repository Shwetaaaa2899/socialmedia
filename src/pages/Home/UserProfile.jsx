import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { usePostsConext} from "../../context/postcontext"
import Post from "../Post"
const UserProfile = () =>{
    const { username } = useParams()
    
    const {state:{userprofile},getAllUserPostsHandler} = usePostsConext()


  
   
    
useEffect(()=>{
    getAllUserPostsHandler(username)
},[])

return <>
    {
        userprofile?.map((post)=> <Post post = {post} />)

    }
</>

}
export default UserProfile;