const PostReducer = (state, action) => {
  switch (action.type) {
    case "DISPLAY-POSTS":
      return {
        ...state,
        posts: action.payload,
        explore: action.payload,
      };

    case "CREATE-A-POST":
      return {
        ...state,
        posts: action.payload,
      };
    case "DELETE-POST":
      return { ...state, posts: action.payload };
    case "EDIT-POST":
      return {
        ...state,
        posts: action.payload,
      };

    case "LIKED-A-POST":
      return {
        ...state,
        posts: action.payload,
      };

    case "UNLIKE-A-POST":
      return {
        ...state,
        posts: action.payload,
      };
    case "GET-FEEDS":
      return {
        ...state,
        feed: action.payload,
      };
    case "ADD-BOOMARK-POST":
      console.log("called in reducer", action.payload);
      return {
        ...state,
        bookMark: [...state.bookMark, action.payload],
      };
    case "REMOVE-BOOMARK-POST":
      const filteredBookMarkPosts = state.bookMark.filter(
        (post) => post._id !== action.payload._id
      );
      return {
        ...state,
        bookMark: filteredBookMarkPosts,
      };

    case "SORT-POSTS":
      return {
        ...state,
        feed: action.payload,
      };

    default:
      return state;
  }
};

export const initialState = {
  isloading: true,
  posts: [],

  // explore: [],
  editPost: {},
  feed: [],
  sorting: "",
  likedPosts: [],
  bookMark: [],
};
export default PostReducer;
