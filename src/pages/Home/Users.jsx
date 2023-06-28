import {useUserContext } from "../../context/usercontext";
import {useAuth} from "../../context/authcontext"
const Users = () =>{
    const {token,isLoggedIn,userInfo} = useAuth()
    const {state :{users},FollowUser,UnFollowUser,isFollowing} = useUserContext()
    const userTobeShown = users.filter((user) => user?.username !== userInfo?.username)
    
    const FollowingHandler = (id,follow) =>{
      console.log("click")
        if(follow){
            token &&  FollowUser(id)
    }
    else{
        console.log("unfollow id is",id,follow)
        UnFollowUser(id)
    }
      
    }

 
    return <>



        {
            userTobeShown?.map((user) =><> <h1>{user.firstName}</h1>
   
            <button onClick = {() => isFollowing(user)?FollowingHandler(user._id,false):
            FollowingHandler(user._id,true)
            }>
            {isFollowing(user)?"UnFollow":"Follow"}
            </button>
          
            </>
            )
        } 
    </>
}
export default Users;