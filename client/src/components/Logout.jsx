import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the token from cookies
    Cookies.remove("token");

    // Optionally clear any other user-related data

    // Redirect to login page after logout
    navigate("/login");
  }, [navigate]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
