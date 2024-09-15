import { IconContext } from "react-icons";
import "./Main.css";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { LuChefHat } from "react-icons/lu";
import { PiChefHat } from "react-icons/pi";
import { FaBook } from "react-icons/fa";
import { FiTv } from "react-icons/fi";
import { MdSend, MdFastfood } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import logo from "../../src/assets/logo.png";
import NotificationSystem from "./NotificationSystem";
import PopupForm from "./PopUpForm";
import Cookies from "js-cookie";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    userName,
    setUserName,
    fetchPrevPrompts,
    getUser,
  } = useContext(Context);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const username = Cookies.get("userName");
    setUserName(username);
    fetchPrevPrompts();
    getUser();
  }, []);

  const toggleForm = () => {
    setIsFormOpen((prev) => !prev);
    getUser();
  };

  return (
    <div className="main">
      <div className="nav">
        <p className="brand">Cook It Up !</p>
        <IconContext.Provider value={{ className: "notification-icon" }}>
          <NotificationSystem />
        </IconContext.Provider>
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <div className="logo-container">
                <IconContext.Provider value={{ className: "logo" }}>
                  <PiChefHat />
                </IconContext.Provider>
              </div>
              <p className="greeting-text">
                <span>Hello, {userName}.</span>
              </p>
              <p className="message-text">How can I help you today?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() => {
                  onSent(
                    "Generate a pasta recipe. Provide the recipe name, ingredients list, and step-by-step instructions. Format the response using bold for heading only and section heading (**text**), italic (*text*),line breaks (\\n) and give me a beautifully formatted response."
                  );
                }}
              >
                <p>Not sure what to do? Click here to find out!</p>
                <IconContext.Provider value={{ className: "book-icon" }}>
                  <FaBook />
                </IconContext.Provider>
              </div>
              <div
                className="card"
                onClick={() => {
                  onSent(
                    "Generate a recipe from a Tv Show or Anime. Provide the TvShow or Anime Name ,recipe name, ingredients list, and step-by-step instructions. Format the response using bold for heading only and section heading (**text**), italic (*text*),line breaks (\\n) and give me a beautifully formatted response."
                  );
                }}
              >
                <p>
                  TV-Inspired Delights: Bring Your Favorite Show Recipes to Life
                </p>
                <IconContext.Provider value={{ className: "tv-icon" }}>
                  <FiTv />
                </IconContext.Provider>
              </div>
              <div
                className="card"
                onClick={() => {
                  onSent(
                    "Generate a recipe using some ingredients. Provide the recipe name, ingredients list, and step-by-step instructions. Format the response using bold for heading only and section heading (**text**), italic (*text*),line breaks (\\n) and give me a beautifully formatted response."
                  );
                }}
              >
                <p>
                  Ready for a surprise? Dive into something unexpected today!
                </p>
                <IconContext.Provider value={{ className: "chef-icon" }}>
                  <GiPerspectiveDiceSixFacesRandom />
                </IconContext.Provider>
              </div>
              <div className="card" onClick={toggleForm}>
                <p>Tell us what you like! What’s your preference?</p>
                <IconContext.Provider value={{ className: "chef-icon" }}>
                  <MdFastfood />
                </IconContext.Provider>
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <IconContext.Provider value={{ className: "chef-icon-2" }}>
                <LuChefHat />
              </IconContext.Provider>
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={logo} alt="" className="gemini-icon" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => {
                setInput(e.target.value);
              }}
              value={input}
              type="text"
              placeholder="Enter your ingredients here..."
            />
            <div>
              <IconContext.Provider value={{ className: "input-icons" }}>
                {input ? <MdSend onClick={() => onSent()} /> : null}
              </IconContext.Provider>
            </div>
          </div>
          <p className="bottom-info">
            This may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Apps.
          </p>
        </div>
      </div>
      {isFormOpen && <PopupForm isOpen={isFormOpen} onClose={toggleForm} />}
    </div>
  );
};

export default Main;
