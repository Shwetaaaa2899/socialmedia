import "./Modal.css"
import {useState, useRef} from "react";
import {MdOutlinePhotoCamera} from "react-icons/md"
import {BsEmojiSmile} from "react-icons/bs"
import { v4 as uuid } from "uuid";
import {usePostsContext } from "../../../context/postcontext"
import EmojiPicker from 'emoji-picker-react';
import {TbLetterX} from "react-icons/tb"
import {useUserContext } from "../../../context/usercontext"
import { toast } from "react-toastify";
const  EditProfile = ({showClose,profile,setProfile}) =>{
   
    const inputRef = useRef()
const {updateProfile} =useUserContext()
  
   const [updatedAvatarImage, setUpdatedAvatarImage] = useState(profile?.avatarUrl);
    const [edittedUserProfile, setEdittedUserProfile] = useState(profile);

   //  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputChangeHandler = (e) =>{
    console.log("new v is",e.target.value)
    
    setEdittedUserProfile({...edittedUserProfile,[e.target.name] :e.target.value})
  }

        ///post.likes.likedby.find(({id})=> userInfo._id ) --> "red" --> liek ka logic
    const modalHandler = (e) =>{

        
        if(e.target.className === "modal-container" || e.target.className === "close-modal"){
            showClose()
        }
    }
    const EditProfileEventHandler = (e) =>{
        e.preventDefault()
     

        updateProfile(edittedUserProfile)
        toast.success("Profile updated successfully")
       showClose()
    }
    const ImageClickHandler = () =>{
        inputRef.current.click()
    
    }
    const ImageInputHandler = (e) =>{
        // console.log("Img changes ",e.target.files[0])
        updatedAvatarImage(URL.createObjectURL(e.target.files[0]))

   setEdittedUserProfile({...edittedUserProfile,[e.target.name] :e.target.value})
  

    }

return <>


    <div className = "modal-container" onClick = {modalHandler}>
    <div className = "modal">
    <form  onSubmit = {EditProfileEventHandler}>
   
    <h4>Edit Profile</h4>
    <div className = "form-group">
       <input type = "text" value = {edittedUserProfile.firstName}  name = "firstName" 
       onChange = {inputChangeHandler}/>
        <input type = "text" value ={edittedUserProfile.lastName}  name = "lastName" 
       onChange = {inputChangeHandler}/>
         <input type = "text" value = {edittedUserProfile.username}   name = "username" 
       onChange = {inputChangeHandler}/>
           <input type = "text" value = {edittedUserProfile.bio}  name = "bio" 
       onChange = {inputChangeHandler}/>
        </div>
        <div>
      
        {
            edittedUserProfile?.avatarUrl?
            <div className = "profile-image">
            <span className = "cancel-img">
     <TbLetterX  onClick ={() => setUpdatedAvatarImage("")} />
</span>
            <img  name = "avatarUrl" className = "post-image-create-modal"  
            style = {{height:"100px"
     , width:"100px", marginLeft:"20px"}}  src = {  edittedUserProfile?.avatarUrl} />
    

   
      </div>
     :
            <div >

            <MdOutlinePhotoCamera  onClick = {ImageClickHandler}  /> 
      
      <input  type="file" name = "mediaURL"   onChange = {ImageInputHandler}    ref= {inputRef}  style={{display:"none"}} />
   
     
            </div>
        }
        </div>
        <button  type = "submit"  >Edit Profile</button>

    </form>
  
    </div>
    </div>

 </>
}
export default EditProfile;
