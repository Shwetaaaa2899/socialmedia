 
 
 import { NavLink, Outlet } from "react-router-dom"
 import { useState } from "react"
 // import { Outlet } from "react-router-dom"
 import {useAuth} from "../../context/authcontext"
import CreatePost from "./Modal"
 const Header = () =>{
    
  const {token,isLoggedIn,logoutHandler} = useAuth()
  const[modal,setModal] = useState(false)
 {/* --header logic */}
 return <>
 <NavLink to ="/mock" >mock</NavLink> 
 <NavLink to ="/login">Login</NavLink>
 <NavLink to ="/signup">SignUp</NavLink>
 <NavLink to ="/liked">Liked Post</NavLink>
 <NavLink to ="/users">Users</NavLink>
 <NavLink to ="/feed">Feed</NavLink>
 <NavLink to ="/bookmark">BookMark</NavLink>
 <button onClick = {()=>setModal(true)}>New Post</button>

 {/* "/feed" element={<Feed />} />
<Route path = "/users" element={<Users />} />
<Route path = "/lik */}

 {/* <NavLink to ="/users" >Users</NavLink> */}

 {
   isLoggedIn && token &&  <NavLink to ="/profile" >Profile</NavLink>
 }
<div onClick = {logoutHandler}>
{
isLoggedIn && token && <NavLink to ="/" >Logout</NavLink>
}  
</div> 
{modal && 
< CreatePost  setModal={setModal} />
}
</>
 }
 export default Header;