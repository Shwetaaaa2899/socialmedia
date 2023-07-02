import logo from './logo.svg';
import './App.css';
import { Routes,Route ,Router, NavLink} from "react-router-dom"
import Mockman from "mockman-js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login/Login"
import SignUp from "./pages/Home/SignUp"
import MainContainer from "./pages/Home/MainContainer"
import Users from "./pages/Home/Users"
import  Profile from "./pages/Home/Profile"
import  Explore from "./pages/Home/Explore"
import UserProfile from "./pages/Home/UserProfile"
import BookMark from './pages/Home/BookMark';
import  Feed from "./pages/Home/Feed"
import  LikedPost from "./pages/Home/LikedPost"
import Header from "./pages/Home/Header/Header"
import {LeftBar} from './pages/Home/LeftBar/LeftBar';

function App() {

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        reverseOrder={false}
        containerStyle={{ top: "10%" }}
        toastOptions={{ style: { maxWidth: 500 } }}
      />


  <Routes>
    <Route path = "/mock" element={<Mockman />} />


<Route path = "/login" element={<Login />} />

<Route path = "/signup" element={<SignUp />} />
<Route path = "/logout"  />


</Routes>

  <Routes>
  <Route  element={<LeftBar />} >
  <Route path = "/" element={<Feed />} />
<Route path = "/feed" element={<Feed />} />
<Route path = "/users" element={<Users />} />
<Route path = "/liked" element={<LikedPost />} />
<Route path = "/bookmark" element={<BookMark />} /> 
{/* <Route path = "/api/posts/user/:username" element = {<UserProfile />} /> */}
<Route path = "explore" element={<Explore />} />
<Route path = "/profile" element={<Profile />} />
</Route>
  </Routes>





   
    </div>
  );
}

export default App;
