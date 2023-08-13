import { useState, useEffect } from "react";
import { usePostsConext } from "../../context/postcontext";
import Post from "../Posts/Post";
import { useAuth } from "../../context/authcontext";
const BookMark = () => {
  const {
    state: { bookMark, posts },
    getPosts,
  } = usePostsConext();
  const { userInfo } = useAuth();
  // const[liked,setLiked] = useState(likedPosts)
  useEffect(() => {
    getPosts();
  }, [posts, userInfo]);
  return (
    <>
      {bookMark?.length > 0 ? (
        <div>
          <h2 style={{ marginBottom: "2rem" }}>BookMarks</h2>
          {bookMark?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <h3>No BookMarked Posts by you </h3>
      )}
    </>
  );
};
export default BookMark;
