import { createContext,useContext,useState } from "react";
import {initialState,UserReducer} from  "../reducer/userReducer"
import { useReducer } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {useAuth} from "../context/authcontext"
 const UserProviderKey = createContext();

export const UserProvider = ({children}) =>{
const [state,dispatch] = useReducer(UserReducer,initialState)
const {token,isLoggedIn,userInfo,EditUserInfoHandler} = useAuth()
// console.log("got token from context",token)
const[users,setUsers] = useState([])
// logic to update exting localstorage

const updateProfile = (updatedData) => {
    const profile = {
        ...JSON.parse(localStorage.getItem('loginDetails')),
        user:updatedData
    };
    console.log("data came for updating is",updatedData)
    localStorage.setItem('loginDetails', JSON.stringify(profile));
    dispatch({type:"SET-PROFILE",payload:profile})
}
//get all users 
const getAllUSers = async() =>{
    try{

        fetch(`/api/users`).then((resp) => resp.json().then((final) => dispatch({type:"DISPLAY-ALL-USERS",payload:final.users}) ))
        // dispatch({type:"DISPLAY-ALL-USERS",type:final.users})  
    }
    catch(e){

        console.log(e)
    }
}
useEffect(()=>{  
    getAllUSers();
   },[])


   //to follow the specific user -  /api/users/follow/:followUserId
   const FollowUser = async(id) =>{
  try{
       const sendreq =await fetch(`/api/users/follow/${id}`,{
            method:"POST",
            headers:{'Accept':'application/json',
        'Content-Type':'application/json',
    authorization:token  
}
        })
      
        if(sendreq.status === 200){
            const{ user,followUser:{firstName,lastName}} = await sendreq.json();
            EditUserInfoHandler(user)
            // console.log(" flowing user",response.user,response.followUser)
            // response.followUser -- contains currently followed user info
            toast(`You started follwing  ${firstName} ${lastName}`) 
            updateProfile(user)
                    dispatch({type:"FOLLOW-A-USER",payload:user})   
             
           
        }
        else if(sendreq.status !== 200){
            console.log("follow status is",sendreq)
toast("User Already following") //400 case
        }
        
    
    }
        catch(e){
            console.log("error",e.status)
        } 
    
    

   }
//    2. To Unfollow a specific user - /api/users/unfollow/:followUserI
/**
 * This handler handles unfollow action.
 * send POST Request at /api/users/unfollow/:followUserId/
 * */  
const UnFollowUser = async(id) =>{

    
        
        console.log("from user context id",id)
     
        try{
            
            // console.log("username and pass is ",token,id)
            const sendreq =await fetch(`/api/users/unfollow/${id}/`,{
                method:"POST",
                headers:{'Accept':'application/json',
            'Content-Type':'application/json',
        authorization:token
    }
            })

    //         const sendreq =await fetch(`/api/users/follow/${id}`,{
    //             method:"POST",
    //             headers:{'Accept':'application/json',
    //         'Content-Type':'application/json',
    //     authorization:token  
    // }
    //         })

            console.log("unollow status is",sendreq)
            if(sendreq.status === 200){
                // const response = await sendreq.json();
                const{ user,followUser:{firstName,lastName}} = await sendreq.json();
                EditUserInfoHandler(user)
                console.log(" flowing user",user)
                // response.followUser -- contains currently followed user info
                toast(`You have unfollowed  ${firstName} ${lastName}`) 
                updateProfile(user)
                // UNFOLLOW-A-USER
                        dispatch({type:"UNFOLLOW-A-USER",payload:user})     
                        
               
            }
            else if(sendreq.status !== 200){
                console.log("follow status is",sendreq)
    toast("User already not following") //400 case
            }
            
        
        
        }
            catch(e){
                console.log(e)
            } 
        

   }

/**
 *3 This handler handles get a user from userId in the db.
 * send GET Request at /api/users/:userId
 * */

 const getUserHandler =  async(userId)  => {
    try{
        const response = await fetch(`api/users/${userId}`)
        if(response.status === 200){
            const finalResponse = await response.json()
            console.log("for calling based on id",finalResponse)
        }
    }
    catch(e){

    }
 }


 const getUserInfoByUserName = (username) => {

    return  state.users.find((user) => user.username === username)
  
     }
const isFollowing =(followedUser)=> { 
  const resp =  userInfo?.following?.some((user) => Number(user._id ) === Number(followedUser._id))
//   console.log(userInfo?.following,followedUser,resp)
  return resp
//     return state?.profile.following.some(
//     (currUser) => currUser._id ===id
//   );


 }

    const ValuesToBePassed = {state,FollowUser,getUserInfoByUserName,UnFollowUser,updateProfile,dispatch,getUserHandler,isFollowing}
    return <UserProviderKey.Provider value = {ValuesToBePassed}>{children}</UserProviderKey.Provider>
}
// export default UserProvider;

// export const usePostsContext = () => useContext(PostsProviderkey);

export const useUserContext = () => useContext(UserProviderKey)
