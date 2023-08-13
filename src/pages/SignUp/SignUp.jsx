import { useAuth } from "../../context/authcontext";
import { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import "./signup.css";
import Header from "../Header/Header";
// import { NavLink } from "react-router-dom";
export default function SignUp() {
  const { signUpHandler } = useAuth();

  // const navigate = useNavigate();

  const [userSignUpDetails, setUserSignUpDetails] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const ValidateEmail = (inputText) => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.value.match(mailformat)) {
      return true;
    } else {
      return false;
    }
  };
  const setInputHandler = (e) => {
    setUserSignUpDetails({
      ...userSignUpDetails,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword, firstName, lastName, username } =
      userSignUpDetails;

    if (
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      firstName.length > 0 &&
      lastName.length > 0 &&
      username.length > 0
    ) {
      console.log(userSignUpDetails);

      signUpHandler({ ...userSignUpDetails });
    } else {
      toast("please fill all the fields");
    }
  };
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordType, setConfirmPasswordType] = useState(false);

  return (
    <div>
      <Header />
      <div className="login-container">
        <div className="left">
          <div className="form-box">
            <div className="header-login">
              <h2>Sign Up</h2>
            </div>
            <form onSubmit={submitHandler}>
              <div className="field1">
                <label>
                  <p>
                    {/* <h3>FirstName:</h3> */}
                    <input
                      required
                      placeholder=" First Name"
                      type="text"
                      name="firstName"
                      onChange={setInputHandler}
                    />
                  </p>
                </label>
                <label>
                  <p>
                    {/* <h3>LastName:</h3> */}
                    <input
                      required
                      placeholder="Last-Name"
                      type="text"
                      name="lastName"
                      onChange={setInputHandler}
                    />
                  </p>
                </label>
                <label>
                  <p>
                    {/* <h3>Username:</h3> */}
                    <input
                      required
                      placeholder="username"
                      type="text"
                      name="username"
                      onChange={setInputHandler}
                    />
                  </p>
                </label>
                <label>
                  <p>
                    {/* <h3>E-mail:</h3> */}
                    <input
                      required
                      placeholder="E-mail"
                      type="email"
                      name="email"
                      onChange={setInputHandler}
                    />
                  </p>
                </label>

                <label>
                  {/* <h3>Password:</h3> */}

                  <div className="password-input">
                    <input
                      required
                      placeholder="Password"
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      onChange={setInputHandler}
                    />
                    <span onClick={() => setPasswordVisible(!passwordVisible)}>
                      {passwordVisible ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </span>
                  </div>
                </label>
                <label>
                  {/* <h3>Confirm Password:</h3> */}
                  <div className="password-input">
                    <input
                      required
                      placeholder="Confirm Password"
                      type={confirmPasswordType ? "text" : "password"}
                      name="confirmPassword"
                      onChange={setInputHandler}
                    />
                    <span
                      onClick={() =>
                        setConfirmPasswordType(!confirmPasswordType)
                      }
                    >
                      {confirmPasswordType ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </span>
                  </div>
                </label>
              </div>

              <button type="submit" className="submitBtn">
                Submit
              </button>
              {/* <button className="submitBtn" onClick={() => navigate("/login")}> */}

              <div clasName="login-confirmation">
                <NavLink to="/login" className="submitBtn">
                  Already have an account? &nbsp;
                  <span>Login</span>
                  &nbsp; here
                </NavLink>
              </div>
            </form>
          </div>
        </div>
        <div className="right">
          <img src="https://files.realpython.com/media/Discover-Flask-Part-2-Creating-a-Login-Page_Watermarked.bb23a84a8760.jpg" />
        </div>
      </div>
    </div>
  );
}
