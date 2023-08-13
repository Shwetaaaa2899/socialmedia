//it can show varios people 's to gfollow and see
import { useAuth } from "../../context/authcontext";
import { useUserContext } from "../../context/usercontext";
import { usePostsContext } from "../../context/postcontext";
// import { SortContainer } from "";
import "./Feed.css";

import { useState, useEffect } from "react";
import Post from "../Posts/Post";
const Feed = () => {
  const {
    dispatch,
    state: { feed, posts },
    getPosts,
    getFeeds,
  } = usePostsContext();

  const [feedState, setFeedState] = useState(false);
  // const [feeds, setFeeds] = useState(feed);
  let feeds = feed;
  const {
    state: { profile },
    state,
  } = useUserContext();

  const userInfo = JSON.parse(localStorage.getItem("loginDetails"));
  const [type, setType] = useState("Trending");
  useEffect(() => {
    getFeeds();
  }, [state, posts]);

  if (type === "Trending") {
    feeds = feeds?.sort((a, b) => b.likes.likeCount - a.likes.likeCount);
  }

  if (type === "Latest") {
    feeds = feeds?.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  //   setFeeds([..filteredFeedsForLatest);

  return (
    <div className="feed">
      <div className="filter">
        <div
          className={type === "Trending" ? "child-active" : "child"}
          onClick={() => setType("Trending")}
        >
          Trending
        </div>
        <div
          className={type === "Latest" ? "child-active" : "child"}
          onClick={() => setType("Latest")}
        >
          Latest
        </div>
      </div>
      {feeds?.length > 0 ? (
        <div>
          <h3>{type} Posts</h3>
          {feeds?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <h1>No Posts yet to be shown</h1>
      )}
    </div>
  );
};

export default Feed;
