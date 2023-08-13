import "./LeftBar.css";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineRocket } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlinePlusCircle } from "react-icons/ai";
import CreatePost from "../CreatePostModal/Modal";
import Users from "../User/Users";
// import Header from "./"
import Header from "../Header/Header";
import { AiFillGithub } from "react-icons/ai";
import { useAuth } from "../../context/authcontext";

export const LeftBar = ({ children }) => {
  const [modal, setModal] = useState(false);
  const { userInfo } = useAuth();
  // consolelog("userinfo from leftbar ",userInfo)
  const routes = [
    { name: "User Feed", path: "/", icon: <AiOutlineHome /> },
    ,
    { name: "Explore", path: "/explore", icon: <AiOutlineRocket /> },

    { name: "Liked Post", path: "/liked", icon: <AiOutlineLike /> },

    { name: "BookMark", path: "/bookmark", icon: <BsBookmark /> },

    {
      name: "Profile",
      path: `/posts/user/${userInfo?.username}`,
      icon: <CgProfile />,
    },
  ];
  //consolelog("usernme is ",userInfo)
  const showClose = () => {
    setModal(false);
    //consolelog("closed",modal)
  };
  const showOpen = () => {
    setModal(true);
    // console.log("clicked");
  };

  const [activeId, setActiveId] = useState("Feed");
  return (
    <div>
      <Header />

      <div className="container">
        <div className="left-sidebar">
          <ul>
            {routes.map((route) => {
              return (
                <li
                  key={route.name}
                  onClick={() => setActiveId(route.name)}
                  className={activeId === route.name ? "active-link" : "link"}
                >
                  <NavLink
                    activeClassName="active"
                    className="link"
                    to={route.path}
                    key={route.name}
                  >
                    <div className="icon">{route.icon}</div>
                    <div className="text">{route.name}</div>
                  </NavLink>
                </li>
              );
            })}
            <li
              className={activeId === "new post" ? "active-link" : "link"}
              onClick={() => {
                setActiveId("new post");
                showOpen();
              }}
            >
              <div
                style={{ marginLeft: "3rem" }}
                className="icon"
                onClick={showOpen}
              >
                <AiOutlinePlusCircle />
              </div>
              <div className="text">New Post</div>
            </li>
          </ul>
        </div>

        <div className="main-content">
          <h3></h3>
          <Outlet />
        </div>
        {modal && <CreatePost showClose={showClose} showOpen={showOpen} />}

        <div className="right-sidebar">
          <div className="right-section">
            <Users />
          </div>
        </div>
      </div>
    </div>
  );
};
