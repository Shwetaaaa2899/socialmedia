 
 
 import { NavLink, Outlet } from "react-router-dom"
 // import { Outlet } from "react-router-dom"
 import {useAuth} from "../../context/authcontext"

 const Header = () =>{
    
  const {token,isLoggedIn,logoutHandler} = useAuth()
 {/* --header logic */}
 return <>
 <NavLink to ="/mock" >mock</NavLink> 
 <NavLink to ="/login">Login</NavLink>
 <NavLink to ="/signup">SignUp</NavLink>
 <NavLink to ="/liked">Liked Post</NavLink>
 <NavLink to ="/users">Users</NavLink>
 <NavLink to ="/feed">Feed</NavLink>
 <NavLink to ="/bookmark">BookMark</NavLink>
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

</>
 }
 export default Header;