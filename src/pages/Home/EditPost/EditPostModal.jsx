import "./Modal.css"
import {useState, useRef} from "react";
import {MdOutlinePhotoCamera} from "react-icons/md"
import {BsEmojiSmile} from "react-icons/bs"
import { v4 as uuid } from "uuid";
import {usePostsContext } from "../../../context/postcontext"
import EmojiPicker from 'emoji-picker-react';

import {TbLetterX} from "react-icons/tb"
const  EditPost = ({updatedPost,setModal}) =>{
    const {editPostHandler} =usePostsContext()
    const inputRef = useRef()

  
     const [updatedPostContent, setUpdatedPostContent] = useState(updatedPost.content);
    const [updatedPostImage, setUpdatedPostImage] = useState(updatedPost.mediaURL);
    const [postToBePassed, setpostToBePassed] = useState(updatedPost);

   //  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const updatePostEventHandler = (e) =>{
    console.log("new v is",e.target.value)
    setUpdatedPostContent(e.target.value)
    setpostToBePassed({...postToBePassed,[e.target.name] :e.target.value})
  }

        ///post.likes.likedby.find(({id})=> userInfo._id ) --> "red" --> liek ka logic
    const modalHandler = (e) =>{

        
        if(e.target.className === "modal-container"){
            setModal(false)
        }
    }
    const EditPostEventHandler = (e) =>{
        e.preventDefault()
     

      editPostHandler(updatedPost._id,postToBePassed)
            // dispatch({type:"CREATE-A-POST",payload:input})
            setModal(false)
       
    }
    const ImageClickHandler = () =>{
        inputRef.current.click()
    
    }
    const ImageInputHandler = (e) =>{
        console.log("Img changes ",e.target.files[0])
        setUpdatedPostImage(URL.createObjectURL(e.target.files[0]))


    }

return <>


    <div className = "modal-container" onClick = {modalHandler}>
    <div className = "modal">
    <form >
   
    <h4>Edit Post</h4>
    <div className = "form-group">
       <textarea rows = "3"  columns = "50" value = {updatedPostContent} placeholder = "Write down your taughts" name = "content" 
       onChange = {updatePostEventHandler}/>
        </div>
        <div>
      
        {
            updatedPostImage?
            <div className = "post-image-create-modal" >
            
   <span className = "cancel">
   <TbLetterX size = {10}  onClick ={() => setUpdatedPostImage("")} />

   
   </span>
            <img      src = { updatedPostImage} />
            {/* <button className = "cancel"  onClick ={() => setUpdatedPostImage("")}>&times;</button> */}
    
  
      </div>
     :
            <div>
            <MdOutlinePhotoCamera  onClick = {ImageClickHandler}  /> 
      
      <input  type="file" name = "mediaURL"   onChange = {ImageInputHandler}    ref= {inputRef}  style={{display:"none"}} />
   
     
            </div>
        }
        </div>
        <button onClick = {EditPostEventHandler} >Update</button>

    </form>
  
    </div>
    </div>

 </>
}
export default EditPost
