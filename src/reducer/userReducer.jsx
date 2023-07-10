
export const UserReducer = (state,action) =>{


    switch(action.type){
       case  "DISPLAY-ALL-USERS":
        // console.log(state.user)
   const filteredUsers = action.payload?.filter((user) => user?.username !== state?.profile?.username)
     return {...state,users:filteredUsers}
        case "GET-POSTS":
           
            return { ...state,ProfileToBeShown:action.payload}
            case "FOLLOW-A-USER":
          // console.log("follow - user is",action.payload)
            return { ...state,user:action.payload,following:action.payload.following}
            case "FILL-USER-DETAILS":
                console.log("data reeceved from signup n login in reduer is",action.payload)
                return {...state,user:action.payload,following:action.payload.following}
        case "SET-UPDATED-USER":
            // console.log("updated users are",action.payload  )  
        const updatedUsers = state?.users?.map((user) => user._id === action.payload?._id?{...action.payload}:user)
     // console.log("updated users are",updatedUsers  )             
      return {...state,users:updatedUsers}

            case "UNFOLLOW-A-USER":
                // console.log("unfoolow - user ius",action.payload)
                 return { ...state,profile:action.payload,following:action.payload.following}
                  case "GET-PROFILE-BASED-POSTS":
                            // console.log("profile vbased posts", action.payload)
                            return {
                                ...state,
                                profileBasedPosts: action.payload
                            }

                            case "GET-PROFILE-INFO":
                                return {...state, profile:action.payload}
                 default:
                    return state
    
    }
   
    
    
    }

    // const {firstName,lastName,following,followers,username,avatarUrl} = JSON.parse(localStorage.getItem("loginDetails")).user
    export const initialState = {
        users :[],
       //logged in user ka
      //  profile:JSON.parse(localStorage.getItem('loginDetails')),
        specificUser:[],
        following:[],
        // ProfileToBeShown:{allgeneralprofile/loggedn},
        usersToBeShown:[],
        feed:[],
        profileBasedPosts:[],
        explore:[],
        profile:{}
    
    }
