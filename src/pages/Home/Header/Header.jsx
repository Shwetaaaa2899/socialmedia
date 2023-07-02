 import "./Header.css";
 
 import { NavLink, Outlet } from "react-router-dom"
 import { useState } from "react"
 import { AiOutlineHome,AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineRocket } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import {AiOutlineLike} from "react-icons/ai"
 // import { Outlet } from "react-router-dom"
 import {useAuth} from "../../../context/authcontext"
 import {AiFillGithub} from "react-icons/ai"
import CreatePost from "../Modal"
 const Header = () => {
    
  const {token,isLoggedIn,logoutHandler} = useAuth()
  const[modal,setModal] = useState(false)
 {/* --header logic */}


 return (<div className = "container">


 <div className = "items-container">
  <div className = "item"><AiFillGithub/></div>
  <div className = "item"> <NavLink to ="/mock">
  mock</NavLink> </div>
  <div className = "item"> <NavLink to ="/login">Login</NavLink></div>
  <div className = "item"> <NavLink to ="/signup">SignUp</NavLink></div>
  <div className = "item">
  <div onClick = {logoutHandler}>
 {
 isLoggedIn && token && <NavLink to ="/" >Logout</NavLink>
}  
 </div> 
</div>
</div>

</div>
)

 }
 export default Header;

{/*  
 {
   isLoggedIn && token &&  <NavLink to ="/profile" >Profile</NavLink>
 } */}

 
//  <img  style ={{height:"100px",width:"100px",borderRadius:"70%"}}
//  src = "https://img.myloview.com/stickers/black-music-player-icon-isolated-on-white-background-portable-music-device-yellow-speech-bubble-symbol-vector-700-276541448.jpg"/ >
