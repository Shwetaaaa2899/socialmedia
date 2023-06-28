import logo from './logo.svg';
import './App.css';
import { Routes,Route ,Router, NavLink} from "react-router-dom"
import Mockman from "mockman-js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Home/Login"
import SignUp from "./pages/Home/SignUp"
import MainContainer from "./pages/Home/MainContainer"
import Users from "./pages/Home/Users"
import  Profile from "./pages/Home/Profile"
import  Explore from "./pages/Home/Explore"
import UserProfile from "./pages/Home/UserProfile"
import BookMark from './pages/Home/BookMark';
import  Feed from "./pages/Home/Feed"
import  LikedPost from "./pages/Home/LikedPost"
import Header from "./pages/Home/Header"
import LeftBar from './pages/Home/LeftBar';

function App() {

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        reverseOrder={false}
        containerStyle={{ top: "10%" }}
        toastOptions={{ style: { maxWidth: 500 } }}
      />

 <Header /> 
   {/* <LeftBar /> */} 
      <Routes>
      

<Route path = "/mock" element={<Mockman />} />


<Route path = "/login" element={<Login />} />

<Route path = "/signup" element={<SignUp />} />
<Route path = "/logout"  />

<Route path = "/profile" element={<Profile />} />

{/* <Route path = "/" element={<MainContainer />} > */}
{/* <Route path = "/"   element={<MainContainer />} > */}
{/* left side componenet */}
{/* <Route path = "feed" element={<Feed />} />

{/* 1.home */}
{/* <Route path = "explore" element={<Explore />} /> */}
{/* 2.explore */}
{/* <Route path = "/bookmark" element={<BookMark />} /> */}
{/* 3.bookamrk */}
{/* <Route path = "/liked" element={<LikedPost />} /> */}
{/* 4.likedpost */}
{/* <Route path = "users" element={<Users />} />
</Route> */} 
<Route path = "/" element={<Feed />} />
<Route path = "/feed" element={<Feed />} />
<Route path = "/users" element={<Users />} />
<Route path = "/liked" element={<LikedPost />} />
<Route path = "/bookmark" element={<BookMark />} /> 
<Route path = "/api/posts/user/:username" element = {<UserProfile />} />

</Routes>

   
    </div>
  );
}

export default App;
