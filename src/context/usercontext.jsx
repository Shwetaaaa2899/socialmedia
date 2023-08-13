import { createContext, useContext, useState } from "react";
import { initialState, UserReducer } from "../reducer/userReducer";
import { useReducer } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/authcontext";
const UserProviderKey = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);
  const { token, isLoggedIn, setUserInfo, userInfo, EditUserInfoHandler } =
    useAuth();
  // //console.log("got token from context",token)
  const [users, setUsers] = useState([]);
  // logic to update exting localstorage

  const updateProfile = (updatedData) => {
    console.log("receved profile in 1st ", updatedData);
    const profile = {
      ...JSON.parse(localStorage.getItem("loginDetails")),
      user: updatedData,
    };
    setUserInfo(updatedData);
    console.log("onfo chnged", userInfo.following);
    localStorage.setItem("loginDetails", JSON.stringify(profile));
    //   console.log("data came for updating is",JSON.parse(localStorage.getItem('loginDetails')))
    editUserHandler(updatedData);

    //     dispatch({type:"SET-PROFILE",payload:updatedData})
    //

    // dispatch({type:"GET-PROFILE-BASED-POSTS",payload:posts})
  };
  //edit user info
  const editUserHandler = async (updatedData) => {
    try {
      // console.log("came in 2nd block", updatedData)
      const dataToBePassed = { userData: updatedData };
      const request = await fetch("/api/users/edit", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify(dataToBePassed),
      });

      if (request.status === 201 || request.status === 200) {
        const response = await request.json();
        setUserInfo(response.user);
        // dispatch({ type: "SET-UPDATED-USER", payload: response.user });
        // dispatch({ type: "SET-PROFILE-INFO", payload: response.user });
      }
    } catch (e) {}
  };
  //get all users
  const getAllUSers = async () => {
    try {
      fetch(`/api/users`).then((resp) =>
        resp
          .json()
          .then((final) =>
            dispatch({ type: "DISPLAY-ALL-USERS", payload: final.users })
          )
      );
      // dispatch({type:"DISPLAY-ALL-USERS",type:final.users})
    } catch (e) {
      //console.log(e)
    }
  };

  //to follow the specific user -  /api/users/follow/:followUserId
  const FollowUser = async (id) => {
    try {
      console.log("hey", id);
      const sendreq = await fetch(`/api/users/follow/${id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      console.log(sendreq);
      if (sendreq.status === 200) {
        // const {
        //   user,
        //   followUser: { firstName, lastName },
        // } = await sendreq. json();
        const response = await sendreq.json();
        setUserInfo(response.user);
        toast(
          `You started follwing  ${response.followUser.firstName} ${response.followUser.lastName}`
        );
        dispatch({ type: "SET-UPDATED-USER", payload: response.user });
        dispatch({ type: "FOLLOW-A-USER", payload: response.user });
      } else if (sendreq.status !== 200) {
        //console.log("follow status is",sendreq)
        toast("User Already following"); //400 case
      }
    } catch (e) {
      //console.log("error",e.status)
    }
  };
  //    2. To Unfollow a specific user - /api/users/unfollow/:followUserI
  /**
   * This handler handles unfollow action.
   * send POST Request at /api/users/unfollow/:followUserId/
   * */
  const UnFollowUser = async (id) => {
    //console.log("from user context id",id)

    try {
      // //console.log("username and pass is ",token,id)
      const sendreq = await fetch(`/api/users/unfollow/${id}/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      if (sendreq.status === 200) {
        const response = await sendreq.json();
        setUserInfo(response.user);
        console.log("un  flowing user", response.followUser);
        updateProfile(response.user);
        toast(
          `You have unfollowed  ${response.followUser.firstName} ${response.followUser.lastName}`
        );

        dispatch({ type: "SET-UPDATED-USER", payload: response.user });
        dispatch({ type: "UNFOLLOW-A-USER", payload: response.user });
      } else if (sendreq.status !== 200) {
        toast("User already not following"); //400 case
      }
    } catch (e) {
      console.log(e);
    }
  };

  /**
   *3 This handler handles get a user from userId in the db.
   * send GET Request at /api/users/:userId
   * */

  const getUserHandler = async (user) => {
    console.log(user);
    try {
      // const response = await fetch(`/api/users/${user}`);
      // console.log("user-info resp is", response);
      // if (response.status === 200 || response.status === 201) {
      //   dispatch({ type: "GET-PROFILE-INFO", payload: response.user });
      // }
      fetch(`/api/users/${user}`).then((resp) =>
        resp
          .json()
          .then((final) =>
            dispatch({ type: "GET-PROFILE-INFO", payload: final.users })
          )
      );
    } catch (e) {
      console.log(e);
    }
  };

  //2.quest at  /api/posts/user/:username
  const getAllUserPostsHandler = async (username) => {
    try {
      console.log(username);
      const response = await fetch(`/api/posts/user/${username}`);
      console.log("post id is", response);
      if (response.status === 200 || response.status === 201) {
        // //console.log(200)
        const { posts } = await response.json();
        dispatch({ type: "FILTER-PROFILE-BASED-POSTS" });
        dispatch({ type: "GET-PROFILE-BASED-POSTS", payload: posts });
      }
    } catch (e) {}
  };

  const isFollowing = (followedUser) => {
    const resp = userInfo?.following?.some(
      (user) => Number(user._id) === Number(followedUser._id)
    );
    //   //console.log(userInfo?.following,followedUser,resp)
    return resp;
    //     return state?.profile.following.some(
    //     (currUser) => currUser._id ===id
    //   );
  };

  const ValuesToBePassed = {
    state,
    FollowUser,
    UnFollowUser,
    updateProfile,
    dispatch,
    getUserHandler,
    getAllUserPostsHandler,
    editUserHandler,
    isFollowing,
    getAllUSers,
  };
  return (
    <UserProviderKey.Provider value={ValuesToBePassed}>
      {children}
    </UserProviderKey.Provider>
  );
};
// export default UserProvider;

// export const usePostsContext = () => useContext(PostsProviderkey);

export const useUserContext = () => useContext(UserProviderKey);
