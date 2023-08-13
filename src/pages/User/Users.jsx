import { useUserContext } from "../../context/usercontext";
import { useAuth } from "../../context/authcontext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import {useEffect} from "react-router-dom"
import "./User.css";
const Users = () => {
  const { token, isLoggedIn, userInfo } = useAuth();
  const {
    state: { users },
    FollowUser,
    UnFollowUser,
    isFollowing,
    getAllUSers,
  } = useUserContext();
  const [input, setInput] = useState("");
  let userTobeShown = users.filter(
    (user) => user?.username !== userInfo?.username
  );
  const navigate = useNavigate();

  //const [showusers,setUsers] = useState(userTobeShown)
  const FollowingHandler = (id, follow) => {
    console.log("id follow is", id);
    if (follow) {
      token && FollowUser(id);
    } else {
      console.log("unfollow id is", id, follow);
      UnFollowUser(id);
    }
  };
  const inputChangeHandler = (e) => {
    setInput(e.target.value);
  };

  //  useEffect(()=>{
  if (input.length > 0) {
    userTobeShown = userTobeShown?.filter((user) =>
      user?.firstName?.toLowerCase().includes(input.toLowerCase())
    );
  }

  // setUsers(filteredUsers)
  //  },[input])
  useEffect(() => {
    token && getAllUSers();
  }, []);
  return (
    <>
      <div className="users-container-div">
        <div>
          <input
            type="text"
            placeholder="search user"
            onChange={inputChangeHandler}
          />
          <h3>Whom to Follow?</h3>
        </div>
        <div className="users-container-wrapper">
          {userTobeShown?.map((user) => (
            <div className="user-individual-container">
              <div
                className="image"
                onClick={() => navigate(`/posts/user/${user?.username}`)}
              >
                <img src={user.avatarUrl} alt="avatar" />
              </div>
              <div
                className="user-info"
                onClick={() => navigate(`/posts/user/${user?.username}`)}
              >
                <p className="name">
                  {user.firstName} {user.lastName}
                </p>
                <small>{user.username}</small>
              </div>
              <div className="follow-btn">
                <button
                  onClick={() =>
                    isFollowing(user)
                      ? FollowingHandler(user._id, false)
                      : FollowingHandler(user._id, true)
                  }
                >
                  <span>{isFollowing(user) ? "Following" : "Follow"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Users;
