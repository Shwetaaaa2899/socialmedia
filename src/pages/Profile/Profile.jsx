import { useUserContext } from "../../context/usercontext";
// import {useUserContext} from "../../context/usercontext"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import EditProfile from "./EditProfileModal/EditProfile";

const Profile = () => {
  const {
    state: { profile },
  } = useUserContext();
  console.log(profile);
  const [userProfile, setUserProfile] = useState(profile.user);
  // console.log(profile.user,"uyg",userProfile)
  const [modal, setModal] = useState(false);
  const showOpen = () => setModal(true);
  const showClose = () => setModal(false);
  console.log(profile);
  const navigate = useNavigate();
  useEffect(() => {
    setUserProfile(profile.user);
  }, []);

  return (
    <>
      <div>
        <h1>Profile:-</h1>

        <div className="">
          {profile?.avatarUrl ? (
            <img
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              src={userProfile?.avatarUrl}
            />
          ) : (
            <RxAvatar />
          )}
        </div>

        <p>
          <label>Name:</label>
          {userProfile?.firstName} {userProfile?.lastName}
        </p>
        <p>
          <label>Website:</label>
          {userProfile?.website}
        </p>
        <p>
          <label>UserName:</label>
          {userProfile?.username}
        </p>
        <p>
          <label>Following:</label>
          {userProfile?.following?.length}
        </p>
        <p>
          <label>Follower:</label>
          {userProfile?.followers?.length}
        </p>
        <button onClick={showOpen}>Edit Profile</button>
      </div>

      {modal && (
        <EditProfile
          showClose={showClose}
          profile={userProfile}
          setProfile={setUserProfile}
        />
      )}
    </>
  );
};
export default Profile;
