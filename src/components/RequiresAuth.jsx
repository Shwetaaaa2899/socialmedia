import { Navigate } from "react-router-dom"
import { useAuth} from "../context/authcontext"
import { useLocation } from "react-router-dom"

export const RequiresAuth = ({children}) =>{
    const {token} = useAuth()
    const location = useLocation()

return token?children:

<Navigate to = "/signup"  state = {{from:location}}/>


}

