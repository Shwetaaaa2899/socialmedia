export const UserReducer = (state, action) => {
  switch (action.type) {
    case "SET-PROFILE":
      return { ...state, profile: action.payload, isLoggedIn: true };
    case "EDIT-PROFILE-INFO":
      return { ...state, profile: action.payload };
    case "ADD-ADDRESS":
      const FinalAddress = [...state.address, action.payload];
      localStorage.setItem("address", JSON.stringify(FinalAddress));
      return { ...state, address: FinalAddress };

    case "ADD-SIGNED-UP-USER":
      localStorage.setItem("users", JSON.stringify(action.payload));
      return { ...state, users: [...state.users, action.payload] };
    case "DISPLAY-ALL-USERS":
      const filteredUsers = action.payload?.filter(
        (user) => user?.username !== state?.profile?.username
      );
      return { ...state, users: filteredUsers };
    case "GET-POSTS":
      return { ...state, ProfileToBeShown: action.payload };
    case "FOLLOW-A-USER":
      return { ...state, profile: action.payload };
    case "FILL-USER-DETAILS":
      return {
        ...state,
        user: action.payload,
        following: action.payload.following,
      };
    case "SET-UPDATED-USER":
      const updatedUsers = state?.users?.map((user) =>
        user._id === action.payload?._id ? { ...action.payload } : user
      );

      return { ...state, users: updatedUsers };
    case "FILTER-PROFILE-BASED-POSTS":
      return { ...state, profileBasedPosts: [] };
    case "UNFOLLOW-A-USER":
      console.log("unfollow - user ius", action.payload);
      return { ...state, profile: action.payload };
    case "GET-PROFILE-BASED-POSTS":
      return {
        ...state,
        profileBasedPosts: action.payload,
      };

    case "SET-PROFILE-INFO":
      console.log("called", action.payload);
      return { ...state, profile: action.payload };
    case "CLEAN-FILTER-POST-LOGOUT":
      return {
        users: [],

        specificUser: [],

        usersToBeShown: [],
        feed: [],
        profileBasedPosts: [],
        explore: [],
        profile: {},
        address: [],
      };

    default:
      return state;
  }
};

// const {firstName,lastName,following,followers,username,avatarUrl} = JSON.parse(localStorage.getItem("loginDetails")).user
export const initialState = {
  users:
    localStorage.getItem("users")?.length > 0
      ? JSON.parse(localStorage.getItem("users"))
      : [],
  //logged in user ka
  //  profile:JSON.parse(localStorage.getItem('loginDetails')),
  specificUser: [],
  // following:[],
  // ProfileToBeShown:{allgeneralprofile/loggedn},
  usersToBeShown: [],
  feed: [],
  profileBasedPosts: [],
  explore: [],
  profile: {},
  address: [],
};
