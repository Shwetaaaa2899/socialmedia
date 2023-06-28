import "./Modal.css"
import {useState} from "react";
import {MdOutlinePhotoCamera} from "react-icons/md"
import {BsEmojiSmile} from "react-icons/bs"
import { v4 as uuid } from "uuid";
import {usePostsContext }from "../../context/postcontext"
import EmojiPicker from 'emoji-picker-react';
const  CreatePost = () =>{
    const {dispatch,state:{editPost},createPostHandler} =usePostsContext()
    // console.log("posts from modal call",editPost)

    const[editRow,setEditRow] = useState((editPost) !== "{}" ?true:false)
    const [modal,setModal] = useState(false)
    const[input,setInput] = useState(
        JSON.stringify(editPost) !== "{}" ?editPost:
            {_id:uuid(),content:"",mediaURL:"",
    likes: {
        likeCount: 0,
        likedBy: [],
        dislikedBy: [],
      },

      comments:[]}
    )
        ///post.likes.likedby.find(({id})=> userInfo._id ) --> "red" --> liek ka logic
    const modalHandler = (e) =>{
        if(e.target.className === "modal-container"){
            setModal(false)
        }
    }
    const createPost = (e) =>{
        e.preventDefault()
      console.log("input is",input)

      createPostHandler({input})
            // dispatch({type:"CREATE-A-POST",payload:input})
            setModal(false)
       
    }
    const inputChangeHandler = (e) =>{

        setInput({...input,[e.target.name] :e.target.value});
    }
return <>

{
 modal  && 
    <div className = "modal-container" onClick = {modalHandler}>
    <div className = "modal">
    <form >
   
    <h4>Create Post</h4>
    <div className = "form-group">
       <textarea value = {input.content} placeholder = "Write down your taughts" name = "content" onChange = {inputChangeHandler}/>
        </div>
        <div>
      
      
       <input value = {input.mediaURL}  type="image" id="image" alt="submit" src="#" name = "mediaURL"  onChange = {inputChangeHandler}/>
     {/* <MdOutlinePhotoCamera /> */}
       
     
     {/* <EmojiPicker  /> */}
        </div>
  
        <button onClick = {createPost}  className = "btn">Create</button>
    </form>
  
    </div>
    </div>
}
    <button onClick = {()=>setModal(true)} >Create a Post</button>
</>
}
export default CreatePost
// _id: "d7c8e1b5-8f91-4d10-a68e-1683c8755cc3",
// content: "Adventures await! 🌄✨",
// mediaURL:
//   "https://res.cloudinary.com/dptfwcnro/image/upload/v1685937473/SocialBuzz/istockphoto-1133850671-170667a_g9e3kl.webp",
// likes: {
//   likeCount: 7,
//   likedBy: [],
//   dislikedBy: [],