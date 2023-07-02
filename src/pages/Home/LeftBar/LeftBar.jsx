import "./LeftBar.css";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineRocket } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import {AiOutlineLike} from "react-icons/ai"
import {AiOutlinePlusCircle} from "react-icons/ai"
import CreatePost from "../Modal";
import Users from "../Users"

import Header from "../Header/Header"
import {AiFillGithub} from "react-icons/ai"
const routes =[
  {name:"Feed",path:"/feed" ,icon:<AiOutlineHome/> },
  {name:"Explore",path:"/explore",icon:<AiOutlineRocket/> },
  { name:"Liked Post",path:"/liked" ,icon:<AiOutlineLike/> },


  {name:"BookMark",path:"/bookmark",icon:<BsBookmark/> },
  
  {name:"Profile",path:"/profile",icon:<CgProfile/> },



]
// {name:"New Post",path:"/",icon:<AiOutlinePlusCircle/> },

export const LeftBar = ({children}) =>{
  const [modal,setModal] = useState(false)
const showClose = () =>{
  setModal(false);
  console.log("closed",modal)
} 
const showOpen = () => setModal(true)
  return (
 
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