import React, { useRef } from "react";
import { signup, login } from "../../firebase/Firebase";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const Login = ({ setIsAuth }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleSignup= async () => {
    try {
      await signup(emailRef.current.value, passwordRef.current.value);
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    } catch (err) {
      console.log("An error has occurred", err);
    }
  };

  const handleLogin = async () => {
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    } catch (err) {
      console.log("An error has occurred", err);
    }
  };

  return (
    <section className="login__container">
      <div className="login__form">
        <h2 className="login__title">Login</h2>
        <label className="login__form-label" htmlFor="email">
          Email
        </label>
        <input
          className="login__form-body"
          type="email"
          placeholder="Enter your email address"
          id="email"
          name="email"
          ref={emailRef}
        ></input>
        <label className="login__form-label" htmlFor="password">
          Password
        </label>
        <input
          className="login__form-body"
          type="password"
          placeholder="Enter your password"
          id="password"
          name="password"
          ref={passwordRef}
        ></input>
        <div>
          <button onClick={handleLogin} className="login__form-btn">
            LOGIN
          </button>
        </div>
        <div>
          <span className="login__form-text">New User?</span>
          <button onClick={handleSignup} className="login__form-btn--signup">
            SIGNUP
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
