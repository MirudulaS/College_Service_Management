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

      if (!email.trim() || !password.trim() || (isSignup && !name.trim())) {
        alert("Please fill all fields");
        return;
      }

      /* ================= SIGNUP ================= */
      if (isSignup) {

        await api.post("/auth/register", {
          name,
          email,
          password,
          role: "USER"
        });

        alert("Signup successful. Please login.");

        setIsSignup(false);
        setName("");
        setEmail("");
        setPassword("");
      }

      /* ================= LOGIN ================= */
      else {

        const res = await api.post("/auth/login", {
          email,
          password
        });

        const token = res.data.token;

        // Save token
        localStorage.setItem("token", token);

        // Get logged in user
        const me = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const user = me.data;

        // Save user
        localStorage.setItem("user", JSON.stringify(user));

        const role = user.role;

        if (role === "ADMIN") {
          navigate("/admin");
        } 
        else if (role === "SERVICE_PROVIDER") {
          navigate("/provider");
        } 
        else {
          navigate("/user");
        }
      }

    } catch (error) {

      const message =
        error.response?.data?.message ||
        error.response?.data?.msg ||
        "Something went wrong. Please try again.";

      alert(message);
    }
  };

  return (
    <div className="login-wrapper">

      <video autoPlay muted loop className="background-video">
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      <div className="login-content">

        <div className="left-hero">
          <h1>College Service Portal</h1>
          <p>
            Simplifying campus maintenance and service tracking.
            Raise requests, track progress, and manage tasks efficiently.
          </p>
        </div>

        <div className="login-container">

          <div className="login-card">

            <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>

            {isSignup && (
              <input
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <input
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
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