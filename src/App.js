import logo from './logo.svg';
import './App.css';
import { Routes,Route ,Router, NavLink} from "react-router-dom"
import Mockman from "mockman-js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login/Login"
import SignUp from "./pages/Home/SignUp/SignUp"
import MainContainer from "./pages/Home/MainContainer"
import Users from "./pages/Home/User/Users"
import  Profile from "./pages/Home/Profile"
import  Explore from "./pages/Home/Explore"
//import UserProfile from "./pages/UserProfile/UserProfile"
import UserProfile from './pages/UserProfile/UserProfile';
import BookMark from './pages/Home/BookMark';
import  Feed from "./pages/Home/Feed/Feed"
import  LikedPost from "./pages/Home/LikedPost"
import Header from "./pages/Home/Header/Header"
import {LeftBar} from './pages/Home/LeftBar/LeftBar';
import  {RequiresAuth } from "./components/RequiresAuth"

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

{/* 
</Routes>

  <Routes> */}
  <Route  element={<RequiresAuth><LeftBar /> </RequiresAuth>} >
  <Route path = "/" element={<RequiresAuth><Feed /></RequiresAuth>} />
{/* <Route path = "/feed" element={<Feed />} /> */}
<Route path = "/users" element={<RequiresAuth><Users /></RequiresAuth>} />
<Route path = "/liked" element={<RequiresAuth><LikedPost /></RequiresAuth>} />
<Route path = "/bookmark" element={<RequiresAuth><BookMark /></RequiresAuth>} /> 
<Route path = "/posts/user/:username" element = {<RequiresAuth><UserProfile /></RequiresAuth>} />

<Route path = "/explore" element={<RequiresAuth><Explore /></RequiresAuth>} />
{/* <Route path = "/profile" element={<UserProfile />} /> */}
</Route>


  </Routes>





   
    </div>
  );
}

export default App;
