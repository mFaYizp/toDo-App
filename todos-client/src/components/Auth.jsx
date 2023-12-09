import React, { useState } from "react";
import { useCookies } from "react-cookie";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const [cookie, setCookie, removeCookie] = useCookies(null);

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setError("Make sure your passwords match!");
      return;
    }
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (data.detail) {
        setError(data.detail);
        return;
      } else {
        setCookie("Email", data.email);
        setCookie("AuthToken", data.token);
        window.location.reload();
      }
  };
  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form action="post">
          <h2>{isLogin ? "Please log in" : "Please sign up!"}</h2>
          <input
            type="email"
            placeholder="Email"
            name=""
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name=""
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm password"
              name=""
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input
            type="submit"
            className="create"
            onClick={(e) => handleSubmit(e, isLogin ? "login" : "signup")}
          />
          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}
        </form>
        <div className="auth-options">
          <button
            onClick={() => setIsLogin(false)}
            style={{
              backgroundColor: !isLogin
                ? "rgb(255,255,255)"
                : "rgb(188,188,188)",
            }}
          >
            Sign Up
          </button>
          <button
            onClick={() => setIsLogin(true)}
            style={{
              backgroundColor: isLogin
                ? "rgb(255,255,255)"
                : "rgb(188,188,188)",
            }}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
