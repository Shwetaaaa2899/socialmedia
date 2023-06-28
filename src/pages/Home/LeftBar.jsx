import { NavLink, Outlet } from "react-router-dom"
// import { Outlet } from "react-router-dom"
import {useAuth} from "../../context/authcontext"
const LeftBar = () =>{
    const {token,isLoggedIn,logoutHandler} = useAuth()
    return <>
<div  >
<div>
<NavLink to ="/" >Home</NavLink>
</div>
<div>
<NavLink to ="/explore">Explore</NavLink>
</div>
<div>
    
<NavLink to ="/feed">Feed</NavLink>
</div>
<div>
<NavLink to ="/users" >Users</NavLink>
</div>




 
    <Outlet />
    </div>
    

    </>
}
export default LeftBar;