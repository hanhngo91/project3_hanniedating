import React, { useState } from "react";
import "./AuthModal.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { notification } from "antd";
import Loading from "./Loading";

function AuthModal({ setShowModal, isSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [error, setError] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [isEmail, setIsEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const handleClick = () => {
    setShowModal(false);
  };
  //Validate inputs:
  const validateInputs = () => {
    if (email === "" || email === null || email === undefined) {
      return false;
    }
    if (password === "" || password === null || password === undefined) {
      return false;
    }
    return true;
  };

  //Check if email & password are valid:
  const checkValidEmail = () => {
    let emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    if (!emailPattern.test(email)) {
      return false;
    }
    return true;
  };

  const checkValidPassword = () => {
    let passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordPattern.test(password)) {
      return false;
    }
    return true;
  };

  //Check existing email:
  const checkExistingEmail = async () => {
    try {
      const response = await axios.get("http://localhost:8000/database/users", {
        params: { email },
      });
      const data = response.data;
      //find email:
      console.log("data-->>", data);
      const foundEmail = data.find((user) => user.email === email);
      if (foundEmail) {
        return setIsEmail(true);
      }
      return setIsEmail(false);
    } catch (err) {
      console.log(err);
    }
  };
  checkExistingEmail();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp && password !== confirmPassword) {
        notification.error({
          message: "Password needs to match!",
        });
        return;
      } else if (!validateInputs()) {
        notification.error({
          message: "Please fill in all the fields!",
        });
        return;
      } else if (!checkValidEmail()) {
        console.log("checkValidEmail", checkValidEmail());

        notification.error({
          message: "Please enter valid email!",
        });
        return;
      } else if (isSignUp && !checkValidPassword()) {
        console.log("checkValidPassword", checkValidPassword());
        notification.error({
          message:
            "Password must be at least 8 characters long and contain at least one letter and one number!",
        });
        return;
      } else if (isSignUp && isEmail === true) {
        notification.error({
          message: "Email already exists!",
        });
        return;
      }
      console.log("new user info is here----->", email, password);

      setLoading(true);
      const response = await axios.post(
        `http://localhost:8000/${isSignUp ? "signup" : "login"}`,
        {
          email,
          password,
        }
      );
      console.log("response", response.data);
      setCookie("Email", response.data.email);
      setCookie("AuthToken", response.data.token);
      setCookie("UserId", response.data.userId);

      const success = response.status === 201;

      if (!isSignUp && !isEmail) {
        notification.error({
          message: "Email haven't been registered!",
        });
        return;
      }
      if (success && isSignUp) {
        notification.success({
          message: "Sign up successfully!",
        });
        navigate("/onboarding");
      }
      if (success && !isSignUp) {
        setLoading(false);
        notification.success({
          message: "Log in successfully!",
        });
        navigate("/dashboard");
      }
      window.location.reload();
    } catch (error) {
      if (error.response.data.status === 400) {
        setLoading(false);
        notification.error({
          message: "Password or email is not right!",
        });
      }
    }
  };

  return (
    <>
      {loading ? <Loading /> : <> </>}
      <div className="auth-modal">
        <div className="close-icon" onClick={handleClick}>
          X
        </div>
        <h2>{isSignUp ? "Create Account" : "Log in"}</h2>
        <p className="terms">
          By clicking Submit, you agree to all of ours terms and conditions.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <input
              type="text"
              id="email"
              name="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="inputGroup">
            <input
              type="text"
              id="password"
              name="password"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
          </div>

          {isSignUp && (
            <div className="inputGroup">
              <input
                type="text"
                id="password-check"
                name="password-check"
                autoComplete="off"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label htmlFor="password-check">Confirm password</label>
            </div>
          )}

          <input className="secondary-button" type="submit" />
          <div className="custom-shape-divider-bottom-1686035699">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                opacity=".25"
                className="shape-fill"
              ></path>
              <path
                d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                opacity=".5"
                className="shape-fill"
              ></path>
              <path
                d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                className="shape-fill"
              ></path>
            </svg>
          </div>
        </form>
      </div>
    </>
  );
}

export default AuthModal;
