import { IconContext } from "react-icons";
import "./Main.css";
import { LuChefHat } from "react-icons/lu";
import { BiSolidImageAdd } from "react-icons/bi";
import { IoNotifications } from "react-icons/io5";
import { MdMic, MdSend } from "react-icons/md";
import { useContext, useEffect } from "react";
import { Context } from "../context/Context";
import logo from "../../src/assets/Google-Bard-Logo.png";
import NotificationSystem from "./NotificationSystem";

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
    fetchPrevPrompts,
    getUser,
  } = useContext(Context);

  useEffect(() => {
    fetchPrevPrompts();
    getUser();
  }, []);

  return (
    <div className="main">
      <div className="nav">
        <p>Recipe Generator</p>
        <IconContext.Provider value={{ className: "notification-icon" }}>
          <NotificationSystem />
        </IconContext.Provider>
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello,{userName}.</span>
              </p>
              <p>How can I help you today ?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <IconContext.Provider value={{ className: "chef-icon" }}>
                  <LuChefHat />
                </IconContext.Provider>
              </div>
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <IconContext.Provider value={{ className: "chef-icon" }}>
                  <LuChefHat />
                </IconContext.Provider>
              </div>
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <IconContext.Provider value={{ className: "chef-icon" }}>
                  <LuChefHat />
                </IconContext.Provider>
              </div>
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <IconContext.Provider value={{ className: "chef-icon" }}>
                  <LuChefHat />
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
              placeholder="Enter a prompt here"
            />
            <div>
              <IconContext.Provider value={{ className: "input-icons" }}>
                <BiSolidImageAdd />
                <MdMic />
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
    </div>
  );
};

export default Main;
