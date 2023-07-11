import {useUserContext } from "../../../context/usercontext";
import {useAuth} from "../../../context/authcontext";
import {useState , useEffect} from "react"
// import {useEffect} from "react-router-dom"
import "./User.css"
const Users = () =>{
    const {token,isLoggedIn,userInfo} = useAuth()
    const {state :{users},FollowUser,UnFollowUser,isFollowing,getAllUSers} = useUserContext()
    const [input,setInput] = useState("")
    let userTobeShown = users.filter((user) => user?.username !== userInfo?.username)
   
    //const [showusers,setUsers] = useState(userTobeShown)
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
const inputChangeHandler = (e) =>{
    setInput(e.target.value)
  
}


//  useEffect(()=>{
    if(input.length>0){
          userTobeShown = userTobeShown?.filter((user)=> user?.firstName?.toLowerCase().includes(input.toLowerCase()))
  

    }
   

   // setUsers(filteredUsers)
//  },[input])
    return <>

<div className = "user-container">
<div>
<input type  =  "text" placeholder = "search user" onChange = {inputChangeHandler}/>
<h3>
Whom to Follow?
</h3>
</div>
   <div className = "users-list"></div>
{

  
    userTobeShown?.map((user) =>
    <div className = "user" key = {user._id}> 
    <div className = "image">

    <img src = {user?.avatarUrl} />
    </div>
    <h4>{user.firstName}-{user.lastName}</h4>
   
            <button  className = "btn" onClick = {() => isFollowing(user)?FollowingHandler(user._id,false):
            FollowingHandler(user._id,true)
            }>
            <span>
            {isFollowing(user)?
        "Following":"Follow"}
            </span>
           
            </button>
          
            </div>
            )
        } 
</div>

      
    </>
}
export default Users;