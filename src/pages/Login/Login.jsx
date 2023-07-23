import { useAuth } from "../../context/authcontext";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../Header/Header";
import { useState } from "react";
import "./Login.css";
// import "./css/Form.css"
const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { loginHandler, token, userInfo } = useAuth();
  const [authInfo, setAuthInfo] = useState({ username: null, password: null });
  const setUserInfoHandler = (e) => {
    setAuthInfo({ ...authInfo, [e.target.name]: e.target.value });
  };
  const GuestModeData = {
    username: "adarshbalika",
    password: "adarshBalika123",
  };
  // console.log("location in auth page is",location)

  const loginClickHandler = (e) => {
    e.preventDefault();
    loginHandler(authInfo);
    // navigate("/products")
  };

  const loginAsGuestHandler = () => {
    // toast("Logged in as Guest")
    setAuthInfo(GuestModeData);
    // loginHandler(GuestModeData);
    // navigate("/profile")
  };
  // console.log(userInfo);
  return (
    <div>
      <Header />

      <div className="login-container">
        <div className="left">
          <div className="form-box">
            <div className="header-login">
              <h3>Welcome to the Social Adda</h3>
            </div>

            <form className="form-login" onSubmit={loginClickHandler}>
              <div className="left-side">
                <label>
                  <p>
                    <h3>Username:</h3>

                    <input
                      required
                      value={authInfo?.username}
                      type="text"
                      name="username"
                      onChange={setUserInfoHandler}
                      placeholder="Your UserName"
                    />
                  </p>
                </label>

                <label>
                  <p>
                    <h3>Password:</h3>

                    <input
                      required
                      value={authInfo?.password}
                      type="password"
                      name="password"
                      onChange={setUserInfoHandler}
                      placeholder="Password"
                    />
                  </p>
                </label>

                <div className="btn-login-container">
                  <button type="submit" className="submitBtn">
                    Submit
                  </button>
                  <button onClick={loginAsGuestHandler} className="submitBtn">
                    Login As Guest?
                  </button>
                </div>
              </div>
            </form>
            <div clasName="login-confirmation">
              {!token && (
                <NavLink to="/signup" className="submitBtn">
                  Create a New Account?
                  <span>Sign Up</span>
                </NavLink>
              )}
            </div>
          </div>
        </div>
        <div className="right">
          <img src="https://files.realpython.com/media/Discover-Flask-Part-2-Creating-a-Login-Page_Watermarked.bb23a84a8760.jpg" />
        </div>
      </div>
    </div>
  );
};
export default Login;
