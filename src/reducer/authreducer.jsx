export const authInitialState = {
  token:
    localStorage.getItem("loginDetails")?.length > 0
      ? JSON.parse(localStorage.getItem("loginDetails")).token
      : null,
  profile:
    localStorage.getItem("loginDetails")?.length > 0
      ? JSON.parse(localStorage.getItem("loginDetails")).user
      : null,
  isloggedIn: localStorage.getItem("loginDetails")?.length > 0 ? true : false,
  address:
    localStorage.getItem("address")?.length > 0
      ? JSON.parse(localStorage.getItem("address"))
      : [],
  isLoggedIn: false,
};
const dummy = [
  {
    Name: "Adarsh Balika",
    type: "Work",
    line1: "400,A wing",
    area: "Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400010",
    phone: "0999099900",
  },
];
localStorage.setItem("address", JSON.stringify(dummy));
export const authInfoReducer = (state, action) => {
  switch (action.type) {
    case "SET-TOKEN":
      console.log("token call", action.payload);
      return { ...state, token: action.payload, isLoggedIn: true };

    case "LOGOUT":
      console.log("called out");
      return {
        token: null,

        isloggedIn: false,

        loggedIn: false,
      };

    //         return {... dummy}
    default:
      return {
        token: null,

        isloggedIn: false,

        loggedIn: false,
      };
  }
};
