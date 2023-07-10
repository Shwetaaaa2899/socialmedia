import "./LeftBar.css";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineRocket } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import {AiOutlineLike} from "react-icons/ai"
import {AiOutlinePlusCircle} from "react-icons/ai"
import CreatePost from "../CreatePostModal/Modal";
import Users from "../User/Users"
// import Header from "./"
import Header from "../Header/Header"
import {AiFillGithub} from "react-icons/ai"
import { useAuth } from "../../../context/authcontext";

// {name:"New Post",path:"/",icon:<AiOutlinePlusCircle/> },

export const LeftBar = ({children}) =>{
  const [modal,setModal] = useState(false)
  const {userInfo} = useAuth()
  //consolelog("userinfo from leftbar ",userInfo)
  const routes =[
    {name:"Feed",path:"/" ,icon:<AiOutlineHome/> },
    {name:"Explore",path:"/explore",icon:<AiOutlineRocket/> },
    { name:"Liked Post",path:"/liked" ,icon:<AiOutlineLike/> },
  
  
    {name:"BookMark",path:"/bookmark",icon:<BsBookmark/> },
    
    {name:"Profile",path:`/posts/user/${userInfo?.username}`,icon:<CgProfile/> },
  
  

  
  ]
  //consolelog("usernme is ",userInfo)
const showClose = () =>{
  setModal(false);
  //consolelog("closed",modal)
} 
const showOpen = () => setModal(true)
  return (

  // <Header />
  
    <div className = "main-container">

<div className = "sidebar">

  
<section className = "routes">

{
routes.map((route) => {
return   <NavLink  activeClassName = "active"
className = "link" to = {route.path} key = {route.name}>

<div className = "icon"  >{route.icon}
</div>
<div className = "text" >{route.name}
</div>

</NavLink>
})

}

<div  className = "link" >
<div className = "icon" ><AiOutlinePlusCircle/>
</div>
<div className = "text"  onClick ={showOpen} >New Post</div>
{
modal && < CreatePost showClose = {showClose} showOpen = {showOpen} />
}
</div>

 </section>

</div>
 
 <div className="outlet-component">
               <Outlet/>
            </div>

            <div className = "right-bar">
              <Users/>
            </div>

   
    </div>

    
  )
}