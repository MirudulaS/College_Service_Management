import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    try {
      if (isSignup) {
        await api.post("/auth/register", {
          name,
          email,
          password,
          role: "USER"
        });
        alert("Signup successful. Please login.");
        setIsSignup(false);
      } else {
        const res = await api.post("/auth/login", { email, password });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/dashboard");
      }
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-wrapper">

      {/* Background Video */}
      <video autoPlay muted loop className="background-video">
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      <div className="login-content">

        {/* LEFT SIDE TEXT */}
        <div className="left-hero">
          <h1>College Service Portal</h1>
          <p>
            Simplifying campus maintenance and service tracking.
            Raise requests, track progress, and manage tasks efficiently.
          </p>
        </div>

        {/* RIGHT SIDE LOGIN CARD */}
        <div className="login-container">
          <div className="login-card">
            <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>

            {isSignup && (
              <input
                placeholder="Full Name"
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <input
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={submit}>
              {isSignup ? "Sign Up" : "Login"}
            </button>

            <p
              className="switch-text"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup
                ? "Already have an account? Login"
                : "New user? Signup"}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}