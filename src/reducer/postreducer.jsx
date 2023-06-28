
const PostReducer  = (state,action) =>{
   

    switch(action.type){
       case  "DISPLAY-POSTS":
        
        return {...state,posts:action.payload,explore:action.payload}
        case  "USER-SPECIFIC-POSTS":
    
        return {...state,userprofile:action.payload}
    
    //     const max = action?.payload.reduce((acc,prod) => prod.price>acc?acc = prod.price:acc,0)
    //  const min = action?.payload.reduce((acc,prod) => prod.price<acc?acc = prod.price:acc,0)
    //  console.log("max and min is",max,min)
    
     
  
        case "CREATE-A-POST":
          console.log("post added",action.payload)

           
            return { ...state,posts: [...state.posts, action.payload]}
            case "DELETE-POST":
              // return {...state,search:action.payload}
              case "EDIT-POST":
                // console.log("post is red",action.payload)
                return {...state,editPost:action.payload}
    
                case "LIKED-A-POST":
                  const {LikedPosts, likedPostId} =  action.payload

           const likedPostByUser = state?.posts?.find((post) => post._id === likedPostId)
           console.log("got posts from context",likedPostId,LikedPosts,"post found to be added in liked",likedPostByUser)
                return  {...state, posts:LikedPosts.posts, likedPosts:[...state.likedPosts,likedPostByUser]}
               
                case "UNLIKE-A-POST":
                  const {UnLikedPosts, UnLikedPostId} =  action.payload
                  const likedPostsFiltered = state?.likedPosts?.filter((post) => post._id !== UnLikedPostId)
                  console.log("got posts from context",UnLikedPostId,UnLikedPosts,"post found to be added in liked",likedPostsFiltered)
                 
               return  {...state, posts:action.payload.posts,UnLikedPosts,likedPosts:likedPostsFiltered}
               case "GET-FEEDS":

                
                  return {...state,feed:action.payload}
                  case "ADD-BOOMARK-POST":
                    console.log("called in reducer",action.payload)
                    return {...state,bookMark:[...state.bookMark,action.payload]}
                    case "REMOVE-BOOMARK-POST":
                      const filteredBookMarkPosts = state.bookMark.filter((post) => post._id !== action.payload._id)
                      return {...state,bookMark:filteredBookMarkPosts}

                      // --    dispatch({type:"ADD-BOOMARK-POST",payload:post})
                      // :
                      // dispatch({type:"REMOVE-BOOMARK-POST",payload:post})
                case "SORT-POSTS":
                  // console.log("sprt value",action.payload)
                  return {...state,feed:action.payload}

     
          
         default:
                    return state
    
    }
    // console.log("data received from conextx",data)
    
    
    }
    
    export const initialState = {islaoding:true,
        posts :[],
        userprofile:[],
        explore:[],
        editPost:{},
        feed:[],
        sorting:"",
        likedPosts:[],
        bookMark:[]
    
     
     
       
        }
    export default PostReducer;