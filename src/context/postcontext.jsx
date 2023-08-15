// 1.get all the posts -

// 2. * This handler gets post by postId in the db.
// * send GET Request at /api/posts/:postId

import { useState, createContext, useContext, useReducer } from "react";
// import ProductsReducer,{initialState} from "../reducer/postreducer"
import { useEffect } from "react";
import PostReducer, { initialState } from "../reducer/postreducer";
import UserProfile from "../";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./authcontext";
export const PostsProviderkey = createContext();
export const usePostsContext = () => useContext(PostsProviderkey);

const PostsProvider = ({ children }) => {
  const navigate = useNavigate();
  const { token, userInfo, updateProfile } = useAuth();
  // console.log(token)
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [displayposts, setPosts] = useState([]);
  const [posts, setPost] = useState([]);
  const [state, dispatch] = useReducer(PostReducer, initialState);

  // 1.get all posts  from db
  const getPosts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/posts`);
      if (response.status === 200) {
        const { posts } = await response.json();
        setPost(posts);
        dispatch({ type: "DISPLAY-POSTS", payload: posts });
      }
    } catch (e) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);
  //Unlike a post logic -/api/posts/dislike/:postId#

  const UnlikePostHandler = async (UnLikedPostId) => {
    console.log("unlike id", UnLikedPostId);

    try {
      const resp = await fetch(`/api/posts/dislike/${UnLikedPostId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      if (resp.status === 201) {
        const UnLikedPosts = await resp.json();

        console.log("dislike", UnLikedPosts, UnLikedPostId);

        // const {UnLikedPosts, UnLikedPostId} =  action.payload
        dispatch({
          type: "UNLIKE-A-POST",
          payload: UnLikedPosts.posts,
        });
        toast.success("Post UnLiked");
      }
    } catch (e) {}
  };
  // 3.Liked Posts
  /**
   * This handler handles liking a post in the db.
   * send POST Request at /api/posts/like/:postId
   * */
  const likePostHandler = async (likedPostId) => {
    console.log("received is", likedPostId);

    try {
      const response = await fetch(`/api/posts/like/${likedPostId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: token,
        },
      });

      if (response.status === 201) {
        const { posts } = await response.json();

        dispatch({ type: "LIKED-A-POST", payload: posts });
        toast.success("Post Liked");
      } else if (response.status === 400) {
        UnlikePostHandler(likedPostId);
      }
    } catch (e) {}
  };
  const isLiked = (postID) => {
    return state?.posts
      ?.find((post) => post._id === postID)
      ?.likes?.likedBy.some((user) => user.username === userInfo.username);
  };

  //4.crate and add the post
  const createPostHandler = async (input) => {
    try {
      const passObj = { postData: input };

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify(passObj),
      });

      if (response.status === 201) {
        const { posts } = await response.json();
        console.log("post is", posts);
        dispatch({ type: "CREATE-A-POST", payload: posts });
        dispatch({ type: " SORT-BY-LATEST" });

        toast.success("Post created successfully !");
      }
    } catch (e) {}
  };

  const getSortedPosts = (posts, sortBy) => {
    console.log(sortBy, posts);
    switch (sortBy) {
      case "Latest":
        return [...posts].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "Oldest":
        return [...posts].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      case "Trending":
        return [...posts].sort((a, b) => b.likes.likeCount - a.likes.likeCount);
      default:
        return [...posts];
    }
  };
  //get bookmarked posts
  const isBookMarked = (post) => {
    return state?.bookMark?.some((bookMark) => bookMark._id === post._id);
  };
  const bookMarkPostHandler = (post) => {
    console.log("post received for bookmark", post);
    const isBookMarked = state.bookMark.some(
      (bookMarkPost) => bookMarkPost._id === post._id
    );
    // console.log(resp)
    if (isBookMarked) {
      dispatch({ type: "REMOVE-BOOMARK-POST", payload: post });
      toast.success("Removed from BookMarked Successfully");
    } else {
      dispatch({ type: "ADD-BOOMARK-POST", payload: post });
      toast.success("Post BookMarked Successfully ");
    }
  };

  //get all feed
  const getFeeds = () => {
    const posts = state.posts?.filter(
      ({ username }) =>
        username === userInfo?.username ||
        userInfo?.following?.find((item) => item?.username === username)
    );

    dispatch({ type: "GET-FEEDS", payload: posts });
  };

  ///api/user/posts/--/api/posts/:postI
  const deletePostHandler = async (postId) => {
    console.log(postId);
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      if (response.status === 400) {
        toast("You cannot delete this post");
      }
      if (response.status === 201 || response.status === 200) {
        const { posts } = await response.json();
        console.log("post is", posts);
        dispatch({ type: "DELETE-POST", payload: posts });
        toast.success("Post deleted successfully");
      }
    } catch (e) {}
  };

  /**
   * This handler handles updating a post in the db.
   * send POST Request at /api/posts/edit/:postId
   * body contains { postData }
   **/
  const editPostHandler = async (postId, updatedPost) => {
    const passObj = { postData: updatedPost };
    console.log("id n post is", passObj);
    try {
      const request = await fetch(`/api/posts/edit/${postId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify(passObj),
      });
      console.log(request);
      if (request.status === 201) {
        const { posts } = await request.json();
        // console.log("from edit",response)

        dispatch({ type: "EDIT-POST", payload: posts });
        toast.success("Post updated successfully !");
      }
      if (request.status === 400) {
        toast("Cannot edit a Post doesn't belong to the logged in User.");
      }
    } catch (e) {
      console.log("something went wrong while edititng");
    }
  };

  return (
    <PostsProviderkey.Provider
      value={{
        state,

        getSortedPosts,
        dispatch,
        getPosts,
        deletePostHandler,
        bookMarkPostHandler,
        isBookMarked,
        editPostHandler,
        isLiked,
        likePostHandler,
        createPostHandler,
        getFeeds,
      }}
    >
      {children}
    </PostsProviderkey.Provider>
  );
};

export default PostsProvider;
export const usePostsConext = () => useContext(PostsProviderkey);
