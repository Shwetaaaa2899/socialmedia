//It will show posts of people being followed only - else no post
//it can show varios people 's to gfollow and see
import { useState } from "react";
import { usePostsConext } from "../../context/postcontext";
import Post from "../Posts/Post";
import { useAuth } from "../../context/authcontext";
import { useEffect } from "react";
const Explore = () => {
  // const {displayposts} = usePostsContext()
  const { userInfo } = useAuth();
  const [liked, setLiked] = useState();
  const {
    state: { posts, userprofile },
    getAllUserPostsHandler,
    getPosts,
    likePostHandler,
  } = usePostsConext();
  // const [postsToBeShown,setpostsToBeShown] = useState(posts)
  // console.log(posts)
  useEffect(() => {
    if (liked) {
      console.log("called-1");
      likePostHandler();
    }
  }, [liked]);
  useEffect(() => {
    getPosts();
    // setpostsToBeShown(posts)
  }, [userInfo, posts]);

  return (
    <div className="explore-container">
      <h2 style={{ marginBottom: "2rem" }}>Explore</h2>

      {posts?.map((post) => (
        <Post
          key={post._id}
          post={post}
          setLiked={setLiked}
          getAllUserPostsHandler={getAllUserPostsHandler}
          likePostHandler={likePostHandler}
        />
      ))}
    </div>
  );
};
export default Explore;
