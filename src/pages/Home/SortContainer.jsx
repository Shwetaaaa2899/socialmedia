import { useState } from "react";
import {usePostsConext} from "../../context/postcontext"
export const SortContainer = () =>{
const { state:{feed},dispatch,getSortedPosts} =  usePostsConext()
    const [sort, setSort] = useState("Latest");
 
    const SelectEvent = (e) => {
        console.log(e.target.value)
        setSort(e.target.value);
        const sortedPostsFOund = getSortedPosts(feed, sort);
        dispatch({type:"SORT-POSTS",payload:sortedPostsFOund})
    }
  
    return <div>
    <form>
   
   <span>{sort}&nbsp;Posts </span> &nbsp;&nbsp;&nbsp;
    <select value={sort} onChange={SelectEvent}>
            <option value="Latest">Latest</option>
            <option value="Oldest">Oldest</option>
            <option value="Trending">Trending</option>
          
          </select>
     
    </form>
  </div>
}