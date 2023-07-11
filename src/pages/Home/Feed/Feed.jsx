//it can show varios people 's to gfollow and see
import {useAuth} from "../../../context/authcontext";
import {useUserContext} from "../../../context/usercontext";
import {usePostsContext} from "../../../context/postcontext";
import {SortContainer} from "../SortContainer";
import "./Feed.css";

import {useState, useEffect} from "react";
import Post from "../../Posts/Post";
const Feed = () => {
    const {
        dispatch,
        state: {
            feed,
            posts
        },
        getPosts,
        getFeeds
    } = usePostsContext();

    const [feedState,
        setFeedState] = useState(false);
      // let [feeds, setFeeds] = useState(feed);
      let feeds = feed;
    const {state: {
            profile
        }, state} = useUserContext();
    const userInfo = JSON.parse(localStorage.getItem("loginDetails"));

    //  const[feed,setFeed] = useState(state.posts)  const { userInfo }= useAuth()
    useEffect(() => {
        getFeeds();
      //   console.log(profile)
      // setTimeout(()=> setFeedState(!feedState),1000)
    }, [state]);

    const updateFeed = (type) => {
        const filteredFeedsForTrending = type === "trending"
            ? feeds.sort((a, b) => b.likes.likeCount - a.likes.likeCount)
            : feeds;

        const filteredFeedsForLatest = type === "latest"
            ? feeds.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            : feeds;
      //   setFeeds([..filteredFeedsForLatest);
    };
    return  <div className = "feed"> 
     <div className = "filter" >
     <div className="filter-item-1" onClick={() => updateFeed("trending")}>
        Trending
    </div> 
     <div className="filter-item-2" onClick={() => updateFeed("latest")}>
        Latest
    </div> 
    </div>
        {feeds?.length > 0 ? (
          feeds?.map((post) => <Post key={post._id} post={post} />)) : (
        <h1>No Posts yet to be shown</h1>
    )
        }


</div>

   }
 
export default Feed;