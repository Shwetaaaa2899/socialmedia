import { useState ,useEffect, createContext, useContext,useReducer } from "react"
import { useLocation ,useNavigate} from "react-router-dom"
import { toast } from 'react-toastify'
import {initialState,UserReducer} from  "../reducer/userReducer"
// import { useState } from "react"
import {useUserContext } from "./usercontext";
 const AuthProviderkey = createContext()



 const AuthProvider = ({children}) =>{
   

    const receivedToken = JSON.parse(localStorage.getItem("loginDetails"))
    // //console.log(receivedToken)
    // //console.log(JSON.parse(receivedToken))

 
    const location = useLocation();

   //to store token data 
    const[token,setToken] = useState(receivedToken?.token||null);
  
    
    
    const [isLoggedIn,setisLoggedIn] = useState(receivedToken?.token?true:false)
   
  const[error,setAuthError]  = useState(null)
   
  //to store signed up/logined user's data on succesfful login
    const[userInfo,setUserInfo] = useState(receivedToken?.user||null);//data current user-profile
    const navigate = useNavigate()
    const [state,dispatch] = useReducer(UserReducer,initialState)
// //console.log("Initial data",isLoggedIn,token,userInfo)

//   body - {firstName, lastName, username, password}
const signUpHandler = async({
    username,
    email,
    password,
    confirmPassword,
    firstName,
    lastName
  }) =>{
   if(password ===confirmPassword)
   {
try{
        const passobj = {  username,
            password,
            email,
            firstName,
            lastName}

    const sendreq =await fetch("/api/auth/signup",{
        method:"POST",
        headers:{'Accept':'application/json',
    'Content-Type':'application/json',
    },
        body:JSON.stringify(passobj)
    })
    // const response = await sendreq.json();
    const response = await sendreq.json()
    
  //console.log("response for sign up ",sendreq)
   if(sendreq.status === 422){
    toast("Username already exists")
  }
    if(sendreq.status  === 201){

      
        //console.log("received token from server fr signup",response.encodedToken)
       
            localStorage.setItem(
              "loginDetails",
              JSON.stringify({ user: response.cretatedUser, token: response.encodedToken })
            );
            
            setToken(response.encodedToken);
            setUserInfo(response.cretatedUser);
            setisLoggedIn(true)
            // dispatch({type:"FILL-USER-DETAILS",payload:response.cretatedUser})
            // dispatch({type:"DISPLAY-ALL-USERS",payload:final.users}) 
        
       
            if(response.encodedToken){
               toast("Signed Up succesfully.Please login to continue")
              navigate("/login");
    
            }
         
    }
    // if(sendreq.status === 422){
    //     toast("Username Already Exists.")
    // }
    // if(sendreq.status  ===404){
    //     toast("The username you entered is not Registered. Not Found error")
    // }

   


    } catch(e){
        const 
            response
           = e;
        if (response.status === 422) {
            toast.error(
              "User email already exists! Please try signing up with another email!"
            );
          } else {
            //console.error(e);
            toast.error("Unable to sign up!");
          }
       
        //console.log(e)
        setAuthError(e)
    }

   
       

    }


else{
    toast("Your password is not matching ")
}

   }
  
   

//function call  to set token while login
 const loginHandler = async({username, password}) =>{
        
    ////console.log("from logi in form - email is ",username,"pass is",password)
 
    try{
        const passobj = {username,password}
    //console.log("username and pass is ",username)
    const sendreq =await fetch("/api/auth/login",{
        method:"POST",
        headers:{'Accept':'application/json',
    'Content-Type':'application/json'},
        body:JSON.stringify(passobj)
    })
    const response = await sendreq.json();
       
  //console.log("response for log in ",response)
    
   if(sendreq.status === 200){


        localStorage.setItem(
          "loginDetails",
          JSON.stringify({ user: response.foundUser, token: response.encodedToken })
        );
        // to get the data from localstorage
        
        // const localStorageResponse = localStorage.getItem("loginDetails") //shows data in string format
        // const localstorgaedataparsed = JSON.parse(localStorageResponse)
        // //console.log("Parsed ls val is",localstorgaedataparsed)// got data back in object form
        // const {user, token } = JSON.parse(localStorageResponse)
        // //console.log("data received token on login is",token,"from context")
        setToken(response.encodedToken)
        setUserInfo(response.foundUser)
        // setUserInfo(user)
        setisLoggedIn(true)

        dispatch({type:"FILL-USER-DETAILS",payload:response.foundUser})
      
        toast.success(`Logged In succesfully ${response.foundUser.firstName}`)
        navigate(location?.state?.from?.pathname ?? "/");
    //    token && navigate(location?.state?.from?.pathname || "/feed")
       
   }
}
    catch(e){
        //console.log(e)
    } 

}
// // //console.log("User's info is",user)
const logoutHandler = () =>{
    setToken(null)
    localStorage.removeItem("loginDetails");
    setisLoggedIn(false)
    toast("Logged out successfully!")
    navigate("/")

}

//function to update the details of users
  /**

 * */
const EditUserInfoHandler = async(userInfo) =>{
//console.log("body received post following ",userInfo)
      try{
    const passobj = {userInfo}
// //console.log("username and pass is ",username)
const sendreq =await fetch("/api/users/edit",{
    method:"POST",
    headers:{'Accept':'application/json',
'Content-Type':'application/json',
authorization:token},
    body:JSON.stringify(passobj)
})
const response = await sendreq.json();
   
//console.log("response for log in ",response.user,sendreq.status)

if(sendreq.status === 201){

  //console.log("inside status of 201 ",response,response,sendreq.status)
    setUserInfo(response.user)
  
}
}
catch(e){
    //console.log(e)
} 

}

// //console.log("inside status of 201 ",userInfo)

const ValuesToBePassed = {isLoggedIn,setisLoggedIn,signUpHandler,loginHandler,token,userInfo,setUserInfo,logoutHandler,EditUserInfoHandler}
   return <AuthProviderkey.Provider value = {ValuesToBePassed} >{children}</AuthProviderkey.Provider>

 }
export default AuthProvider;
export const useAuth = () =>  useContext(AuthProviderkey)