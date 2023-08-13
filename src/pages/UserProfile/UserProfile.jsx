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
import { ClipLoader } from "react-spinners";
import avatarLogo from "../../dummy-avatar.png";
// import { usePostsConext } from "../../context/postcontext";
const UserProfile = () => {
  const { username } = useParams();
  console.log(username);
  const [modal, setModal] = useState(false);
  const { userInfo } = useAuth();
  const {
    state: { profile, users, profileBasedPosts },
    getUserHandler,
    getAllUserPostsHandler,
    dispatch,
  } = useUserContext();
  const {
    state: { posts },
  } = usePostsConext();

  const [userData, setUserData] = useState({});
  const [loading, setUsersLoading] = useState(false);

  const getUserDetails = async () => {
    try {
      // console.log("Called", username, userData);
      // setUsersLoading(true);
      // const { data, status } = await fetch({
      //   method: "GET",
      //   url: `/api/users/${username}`,
      // });
      // if (status === 200 || status === 201) {
      //   setUserData(data?.user);
      //   getAllUserPostsHandler(username);
      //   setUsersLoading(false);
      //   console.log("Called 2", userData);

      setUsersLoading(true);

      const request = await fetch(`/api/users/${username}`);
      // console.log(r);

      const response = await request.json();
      console.log(response, response.user);
      if (request.status === 200 || request.status === 201) {
        setUserData(response.user);

        // setUserData(response.user);
        getAllUserPostsHandler(username);
        setUsersLoading(false);
        // console.log("called", userData);
        // dispatch({ type: "GET-PROFILE-INFO", payload: response.users });
      }
      // .then((resp) =>
      //   resp
      //     .json()
      //     .then((final) =>
      //       dispatch({ type: "GET-PROFILE-INFO", payload: final.users })
      //     )
      // );
      // }
    } catch (e) {
      console.log(e);
    }
  };

  const showOpen = () => setModal(true);

  const showClose = () => setModal(false);
  useEffect(() => {
    getUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, userInfo, posts]);

  // useEffect(() => {
  //   username !== userData.username && setUserData({});
  // }, username);
  // const tempProfile = users.find((user) => user._id === parseInt(username));
  // const profileToBeShown = tempProfile ? tempProfile : getUserHandler(username);

  // const tempPosts = profileBasedPosts
  //   ? profileBasedPosts
  //   : getAllUserPostsHandler(profileToBeShown.username);

  // const [loading, setLoading] = useState(false);

  // const showOpen = () => setModal(true);

  // const showClose = () => setModal(false);

  //  console.log(profile)
  return (
    <>
      {loading ? (
        <h1>
          {" "}
          Loadingg the data........
          <ClipLoader />
        </h1>
      ) : (
        <>
          <div className="profile-container">
            <div className="profile-image">
              {userData?.avatarUrl ? (
                <img src={userData?.avatarUrl} alt="avatar" />
              ) : (
                <img src={avatarLogo} alt="avatar" />
              )}
              {/* <small>@{userData?.username}</small> */}

              <div className="profile-info">
                <div>
                  <h4>
                    {userData?.firstName} {userData?.lastName}
                  </h4>
                </div>
                <div>
                  <small>@{userData?.username}</small>
                </div>
              </div>
            </div>

            <div className="profile-description">
              {/* <p>{userData?.username}-new username</p> */}
              <h4>{profile?.bio}</h4>
              <small className="url">
                {userData?.website ? (
                  <div>
                    <BiLinkAlt size={15} />
                    <Link target="_blank" to={userData?.website}>
                      {userData?.website}{" "}
                    </Link>
                  </div>
                ) : (
                  "No Link Provided"
                )}
              </small>
            </div>
            {/* tempPosts */}
            <div className="lower-profile-section">
              <div className="item">{userData?.posts || 0} Posts</div>
              <div className="item">
                {userData?.followers?.length || 0} Followers
              </div>
              <div className="item">
                {userData?.following?.length || 0} Following
              </div>
            </div>
            {/* {console.log(profileToBeShown?.username)} */}
            {userData?.username === userInfo.username && (
              <button onClick={showOpen}>
                {" "}
                <AiFillEdit /> Edit
              </button>
            )}
          </div>

          <div className="profile-posts">
            {profileBasedPosts.length > 0 &&
              profileBasedPosts?.map((post) => (
                <Post post={post} key={post._id} />
              ))}
          </div>
        </>
      )}

      {modal && (
        <EditProfile
          showClose={showClose}
          userData={userData}
          setUserData={setUserData}
        />
      )}
    </>
  );
};
export default UserProfile;
