import { useContext, useState, useEffect } from "react";
import { PiChefHat } from "react-icons/pi";
import * as Components from "../components/Components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Form.css";
import { Context } from "../context/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Dashboard.css";
import { io } from "socket.io-client";

const socket = io("https://nebula9-ai-cook-it-up.onrender.com");

const Form = () => {
  const [signIn, setSignIn] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userName, setUserName } = useContext(Context);

  useEffect(() => {
    setEmail("");
    setPassword("");
    setUserName("");
  }, [signIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    Cookies.remove("token");
    Cookies.remove("userName");
    try {
      const response = await axios.post(
        "https://nebula9-ai-cook-it-up.onrender.com/api/auth/signin",
        { username: userName, password }
      );
      const token = response.data.token;
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("userName", userName);
      setUserName(userName);
      toast.success("Logged in successfully");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://nebula9-ai-cook-it-up.onrender.com/api/auth/signup",
        { username: userName, email, password }
      );
      const token = response.data.token;
      Cookies.set("token", token, { expires: 7 });
      toast.success("Signed up successfully");
      setUserName(userName);

      await axios.post(
        "https://nebula9-ai-cook-it-up.onrender.com/send-notification",
        {
          username: userName,
          notificationText: "Welcome to Cook It Up !",
        }
      );

      setSignIn(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="form">
      <ToastContainer />
      <div
        style={{
          textAlign: "center",
        }}
      >
        {Components.ChefIcon ? (
          <Components.ChefIcon style={{ fontSize: "50px" }} />
        ) : (
          <PiChefHat style={{ fontSize: "40px" }} />
        )}
        {Components.ChefTitle ? (
          <Components.ChefTitle>Cook It Up!</Components.ChefTitle>
        ) : (
          <h1 style={{ fontSize: "36px", color: "#4285f4", marginTop: "10px" }}>
            Cook It Up!
          </h1>
        )}
      </div>
      <Components.Container>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form onSubmit={handleSignup}>
            <Components.Title>Create Account</Components.Title>
            <Components.Input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              placeholder="Name"
            />
            <Components.Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
            <Components.Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
            <Components.Button type="submit">Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={signIn}>
          <Components.Form onSubmit={handleLogin}>
            <Components.Title>Sign in</Components.Title>
            <Components.Input
              value={userName}
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              required
              placeholder="Username"
            />
            <Components.Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
            <Components.Anchor href="#"></Components.Anchor>
            <Components.Button type="submit">Sign In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel signinIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => setSignIn(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter Your personal details and start journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => setSignIn(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
};

export default Form;
