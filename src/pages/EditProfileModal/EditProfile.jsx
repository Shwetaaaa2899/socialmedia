import "./Modal.css";
import { useState, useRef } from "react";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { v4 as uuid } from "uuid";
import { usePostsContext } from "../../context/postcontext";
import EmojiPicker from "emoji-picker-react";
import { TbLetterX } from "react-icons/tb";
import { useUserContext } from "../../context/usercontext";
import { toast } from "react-toastify";
import AvatarModal from "../AvatarModal/AvatarModal";
const EditProfile = ({ showClose, profile }) => {
  const inputRef = useRef();
  const { updateProfile } = useUserContext();

  const [updatedAvatarImage, setUpdatedAvatarImage] = useState(
    profile?.avatarUrl
  );
  const [edittedUserProfile, setEdittedUserProfile] = useState(profile);

  //  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputChangeHandler = (e) => {
    console.log("new v is", e.target.value);

    setEdittedUserProfile({
      ...edittedUserProfile,
      [e.target.name]: e.target.value,
    });
  };

  ///post.likes.likedby.find(({id})=> userInfo._id ) --> "red" --> liek ka logic
  const modalHandler = (e) => {
    if (
      e.target.className === "modal-container" ||
      e.target.className === "close-modal"
    ) {
      showClose();
    }
  };
  const EditProfileEventHandler = (e) => {
    e.preventDefault();

    updateProfile(edittedUserProfile);
    toast.success("Profile updated successfully");
    showClose();
  };
  const ImageClickHandler = () => {
    inputRef.current.click();
  };
  const ImageInputHandler = (e) => {
    // console.log("Img changes ",e.target.files[0])
    updatedAvatarImage(URL.createObjectURL(e.target.files[0]));

    setEdittedUserProfile({
      ...edittedUserProfile,
      [e.target.name]: e.target.value,
    });
  };
  const [avatar, setAvatar] = useState(false);
  const openAvatarModal = (e) => {
    e.preventDefault();
    setAvatar(true);
  };

  // console.log(avatar);

  const closeAvatarModal = () => setAvatar(false);
  return (
    <>
      <div className="modal-wrapper" onClick={modalHandler}></div>
      <div className="modal-container" onClick={modalHandler}>
        <div className="modal">
          <form>
            <h4>Edit Profile</h4>
            <div className="form-group">
              <div>
                {edittedUserProfile?.avatarUrl ? (
                  <div className="profile-image">
                    <img
                      name="avatarUrl"
                      className="post-image-create-modal"
                      style={{
                        height: "100px",
                        width: "100px",
                        marginLeft: "20px",
                      }}
                      src={edittedUserProfile?.avatarUrl}
                    />
                    {/* <span className="cancel-img-btn">
                    <TbLetterX
                      onClick={() => {
                        setEdittedUserProfile({ ...profile, avatarUrl: null });
                      }}
                    />
                  </span> */}
                    <div>
                      {" "}
                      <button
                        className="btn-modal avatar"
                        onClick={openAvatarModal}
                      >
                        Add Avatar
                      </button>
                    </div>
                  </div>
                ) : (
                  {
                    /* <div>
                  <MdOutlinePhotoCamera />

                  <input
                    type="file"
                    name="mediaURL"
                    onChange={ImageInputHandler}
                    ref={inputRef}
                    style={{ display: "none" }}
                  />
                </div> */
                  }
                )}
              </div>

              {avatar && (
                <AvatarModal
                  profile={profile}
                  closeAvatarModal={closeAvatarModal}
                  setEdittedUserProfile={setEdittedUserProfile}
                />
              )}

              <label>
                <small>FirstName: </small>
                <input
                  className="input"
                  type="text"
                  value={edittedUserProfile.firstName}
                  name="firstName"
                  onChange={inputChangeHandler}
                />
              </label>
              <label>
                <small>LastName: </small>
                <input
                  type="text"
                  value={edittedUserProfile.lastName}
                  name="lastName"
                  onChange={inputChangeHandler}
                />
              </label>
              <label>
                <small>Username: </small>
                <input
                  type="text"
                  value={edittedUserProfile.username}
                  name="username"
                  onChange={inputChangeHandler}
                />
              </label>
              <label>
                <small>Bio: </small>
                <input
                  type="text"
                  value={edittedUserProfile.bio}
                  name="bio"
                  onChange={inputChangeHandler}
                />
              </label>
              <label>
                <small>Webiste: </small>
                <input
                  type="text"
                  value={edittedUserProfile.website}
                  name="website"
                  placeholder="Enter your website"
                  onChange={inputChangeHandler}
                />
              </label>
            </div>

            <div>
              <button
                className="btn-modal"
                type="submit"
                onClick={EditProfileEventHandler}
              >
                Edit Profile
              </button>
              <button className="btn-modal" onClick={showClose}>
                Cancel
              </button>
            </div>
          </form>

          {/* <button  onClick={openAvatarModal}>Add Avatar</button>
          {avatar && (
            <AvatarModal
              profile={profile}
              closeAvatarModal={closeAvatarModal}
              setEdittedUserProfile={setEdittedUserProfile}
            />
          )} */}
        </div>
      </div>
    </>
  );
};
export default EditProfile;
