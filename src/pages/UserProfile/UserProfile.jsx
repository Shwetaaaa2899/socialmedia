import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { useUserContext } from "../../context/usercontext";
import { usePostsConext } from "../../context/postcontext";
import Post from "../Posts/Post";
import { BiLinkAlt } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import "./UserProfile.css";
// import{dum} from "../../../src/instagram.png";
import EditProfile from "../EditProfileModal/EditProfile";
import { useAuth } from "../../context/authcontext";
// import { usePostsConext } from "../../context/postcontext";
const UserProfile = () => {
  const { username } = useParams();
  console.log("hey user", username);
  const [modal, setModal] = useState(false);
  const { userInfo } = useAuth();
  const {
    state: { profile, users },
  } = useUserContext();
  const {
    state: { posts },
  } = usePostsConext();

  const tempProfile = users.find((user) => user._id === parseInt(username));
  const tempPosts = posts.filter(
    (post) => post.username === tempProfile.username
  );
  // console.log("temp profile is", tempPosts, tempProfile, users, username);
  const [loading, setLoading] = useState(false);

  const showOpen = () => setModal(true);

  const showClose = () => setModal(false);

  //  console.log(profile)
  return (
    <>
      {loading ? (
        <h1> Loadingg the data........</h1>
      ) : (
        <>
          <div className="profile-container">
            <div className="profile-image">
              {tempProfile?.avatarUrl ? (
                <img src={tempProfile?.avatarUrl} />
              ) : (
                <img src="https://www.wrkbemanning.no/wp-content/uploads/2017/04/profile-pic-dummy.jpg" />
              )}

              <div className="profile-info">
                <h4>
                  {tempProfile?.firstName} {tempProfile?.lastName}
                </h4>
                <small>@{tempProfile?.username}</small>
              </div>
            </div>

            <div className="profile-description">
              <h4>{profile.bio}</h4>
              <small className="url">
                {tempProfile?.website ? (
                  <div>
                    <BiLinkAlt size={15} />
                    <Link target="_blank" to={tempProfile?.website}>
                      {tempProfile?.website}{" "}
                    </Link>
                  </div>
                ) : (
                  "No Website Available"
                )}
              </small>
            </div>
            {/* tempPosts */}
            <div className="lower-profile-section">
              <div className="item">{tempProfile?.posts || 0} Posts</div>
              <div className="item">
                {tempProfile?.followers?.length || 0} Followers
              </div>
              <div className="item">
                {tempProfile?.following?.length || 0} Following
              </div>
            </div>
            {console.log(tempProfile?.username)}
            {tempProfile?.username === userInfo.username && (
              <button onClick={showOpen}>
                {" "}
                <AiFillEdit /> Edit
              </button>
            )}
          </div>

          <div className="profile-posts">
            {tempPosts.length > 0 &&
              tempPosts?.map((post) => <Post post={post} key={post._id} />)}
          </div>
        </>
      )}

      {modal && <EditProfile showClose={showClose} profile={tempProfile} />}
    </>
  );
};
export default UserProfile;
