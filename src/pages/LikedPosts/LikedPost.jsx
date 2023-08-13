import { useState, useEffect } from "react";
import { usePostsConext } from "../../context/postcontext";
import Post from "../Posts/Post";
import { useAuth } from "../../context/authcontext";
const LikedPost = () => {
  const {
    state: { posts },
    getPosts,
  } = usePostsConext();
  const { userInfo } = useAuth();

  // const[liked,setLiked] = useState(likedPosts)
  useEffect(() => {
    getPosts();
  }, [posts, userInfo]);
  const likedPostsByUser = posts?.filter((post) =>
    post.likes.likedBy.find((user) => user.username === userInfo.username)
  );
  //
  return (
    <>
      {likedPostsByUser?.length > 0 ? (
        <div>
          <h2 style={{ marginBottom: "2rem" }}>Liked Posts</h2>
          {likedPostsByUser?.map((post) => (
            <Post key={post._id} post={post} />
          ))}{" "}
        </div>
      ) : (
        <div>
          <h3>No Liked Posts by you </h3>
        </div>
      )}
    </>
  );
};
export default LikedPost;
