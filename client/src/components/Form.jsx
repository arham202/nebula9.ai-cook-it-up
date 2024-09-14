import * as Components from "../components/Components";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Form.css";
import { Context } from "../context/Context";

const Form = () => {
  const [signIn, toggle] = useState(true);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userName, setUserName } = useContext(Context);
  //   const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://nebula9-ai-cook-it-up.onrender.com/api/auth/signin",
        {
          username: userName,
          password,
        }
      );

      console.log(response);

      const token = response.data.token;

      // Store the JWT token in cookies (you can set an expiry if needed)
      Cookies.set("token", token, { expires: 7 }); // Expires in 7 days
      console.log("Logged in successfully, Token:", token);
      setUserName(userName);
      navigate("/dashboard");
    } catch (err) {
      //   setError(err.response?.data?.message || "Login failed");
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://nebula9-ai-cook-it-up.onrender.com/api/auth/signup",
        {
          username: userName,
          email,
          password,
        }
      );

      const token = response.data.token;

      // Store the JWT token in cookies (you can set an expiry if needed)
      Cookies.set("token", token, { expires: 7 });
      console.log("Signed up successfully, Token:", token);
      alert("Signed up successfully");

      setUserName("");
      setEmail("");
      setPassword("");
      toggle(true);
    } catch (err) {
      //   setError(err.response?.data?.message || "Signup failed");
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="form">
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
            <Components.Button>Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={signIn}>
          {/* {error && <p style={{ color: "black" }}>{error}</p>} MAKE IT A TOAST NOTIFICATION  */}
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
            <Components.Anchor href="#">
              Forgot your password?
            </Components.Anchor>
            <Components.Button>Sigin In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel signinIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter Your personal details and start journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sigin Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
};

export default Form;
