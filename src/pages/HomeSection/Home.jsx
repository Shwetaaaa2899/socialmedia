import { useState } from "react";
import { usePostsConext } from "../../context/postcontext";
import Post from "../Posts/Post";
import { useAuth } from "../../context/authcontext";
import { useEffect } from "react";
const Home = () => {
  // const {displayposts} = usePostsContext()
  const { userInfo } = useAuth();
  const [liked, setLiked] = useState();
  const {
    state: { posts, userprofile },
    getAllUserPostsHandler,
    getPosts,
    likePostHandler,
  } = usePostsConext();
  const [postsToBeShown, setpostsToBeShown] = useState(posts);
  console.log(posts);
  useEffect(() => {
    if (liked) {
      console.log("called-1");
      likePostHandler();
    }
  }, [liked]);
  useEffect(() => {
    getPosts();
    setpostsToBeShown(posts);
  }, []);

  return (
    <>
      {posts?.map((post) => (
        <Post
          post={post}
          setLiked={setLiked}
          getAllUserPostsHandler={getAllUserPostsHandler}
          likePostHandler={likePostHandler}
        />
      ))}
    </>
  );
};
export default Home;
