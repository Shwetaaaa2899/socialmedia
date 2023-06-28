
export const UserReducer = (state,action) =>{


    switch(action.type){
       case  "DISPLAY-ALL-USERS":
        console.log(state.user)
   const filteredUsers = action.payload?.filter((user) => user.username !== state.profile.username)
     return {...state,users:filteredUsers}
        case "SPECIFIC-USER":
           
            return { ...state,ProfileToBeShown:action.payload}
            case "FOLLOW-A-USER":
           console.log("follow - user is",action.payload)
            return { ...state,user:action.payload,following:action.payload.following}
            case "FILL-USER-DETAILS":
                console.log("data reeceved from signup n login in reduer is",action.payload)
                return {...state,user:action.payload,following:action.payload.following}
                case "SET-PROFILE":
        const {firstName,lastName,following,followers,username} =action.payload;
      
                   return {...state,profile:{firstName,lastName,following,followers,username}}

            case "UNFOLLOW-A-USER":
                // console.log("unfoolow - user ius",action.payload)
                 return { ...state,profile:action.payload,following:action.payload.following}
                 case "GET-FEED":
                    return {...state,feed:action.payload}  
                    case "EXPLORE":
                        console.log(action.payload)

                        // action.explore.filter((post) => post.
                        // return {...state,explore:)}  
                 default:
                    return state
    
    }
   
    
    
    }

    // const {firstName,lastName,following,followers,username,avatarUrl} = JSON.parse(localStorage.getItem("loginDetails")).user
    export const initialState = {
        users :[],
        profile:[],
        specificUser:[],
        following:[],
        ProfileToBeShown:{},
        usersToBeShown:[],
        feed:[],
        explore:[]
    
    }
