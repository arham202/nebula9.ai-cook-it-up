import "./SideBar.css";
import Cookies from "js-cookie";
import { MdMenu, MdOutlineQuestionMark } from "react-icons/md";
import {
  AiOutlinePlusCircle,
  AiOutlineHistory,
  AiOutlineLogout,
  AiOutlineDelete,
} from "react-icons/ai";
import { FaRegMessage } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { useContext, useState } from "react";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PopupForm from "./PopUpForm";

const SideBar = () => {
  const navigate = useNavigate();
  const [extended, setExtended] = useState(true);
  const {
    onSent,
    prevPrompts,
    setRecentPrompt,
    newChat,
    setPrevPrompts,
    getUser,
    userName,
  } = useContext(Context);
  const [selectedPrompt, setSelectedPrompt] = useState(null); // State for selected prompt
  const [dialogOpen, setDialogOpen] = useState(false); // State to handle dial
  const [hoveredPrompt, setHoveredPrompt] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleDeletePrompt = async (id) => {
    const token = Cookies.get("token");
    console.log(token);
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/prompts/${id}`,
        { userName },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      if (response.status === 200) {
        setPrevPrompts((prev) => prev.filter((prompt) => prompt.id !== id));
        alert("Deleted successfully");
      } else {
        console.error("Failed to delete prompt");
      }
    } catch (error) {
      console.error("Error deleting prompt:", error);
    }
  };

  const toggleForm = () => {
    setIsFormOpen((prev) => !prev);
    getUser();
  };

  // const loadPrompt = async (prompt) => {
  //   setRecentPrompt(prompt);
  //   await onSent(prompt);
  // };

  const handlePromptClick = (prompt) => {
    setSelectedPrompt(prompt); // Set the selected prompt
    setDialogOpen(true); // Open the dialog
  };

  const closeDialog = () => {
    setDialogOpen(false); // Close the dialog
    setSelectedPrompt(null); // Reset selected prompt
  };

  return (
    <IconContext.Provider value={{ className: "react-icons" }}>
      <div className="sidebar">
        <div className="top">
          <IconContext.Provider value={{ className: "menu" }}>
            <MdMenu onClick={() => setExtended((prev) => !prev)} />
          </IconContext.Provider>
          <div onClick={() => newChat()} className="new-chat">
            <AiOutlinePlusCircle />
            {extended ? <p>New Chat</p> : null}
          </div>
          {extended ? (
            <div className="recent">
              <p className="recent-title">Recent</p>
              {prevPrompts.map((item) => {
                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredPrompt(item.id)}
                    onMouseLeave={() => setHoveredPrompt(null)}
                    className="recent-entry"
                  >
                    <FaRegMessage />
                    <p
                      onClick={() => {
                        handlePromptClick(item);
                      }}
                    >
                      {item.prompt_text
                        ? item.prompt_text
                            .replace(/<\/?[^>]+(>|$)/g, "")
                            .slice(0, 18) + "..."
                        : "No text available"}
                    </p>
                    {hoveredPrompt === item.id && (
                      <AiOutlineDelete
                        className="delete-icon"
                        onClick={() => handleDeletePrompt(item.id)}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
        <div className="bottom">
          <div className="bottom-item recent-entry" onClick={toggleForm}>
            <MdOutlineQuestionMark />
            {extended ? <p>Help</p> : null}
          </div>
          <div className="bottom-item recent-entry">
            <AiOutlineHistory />
            {extended ? <p>Activity</p> : null}
          </div>
          <div
            className="bottom-item recent-entry"
            onClick={() => {
              navigate("/logout");
            }}
          >
            <AiOutlineLogout />
            {extended ? <p>LogOut</p> : null}
          </div>
        </div>
        {isFormOpen && <PopupForm isOpen={isFormOpen} onClose={toggleForm} />}
        {dialogOpen && (
          <div className="dialog-backdrop" onClick={closeDialog}>
            <div
              className="dialog-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="dialog-close" onClick={closeDialog}>
                &times;
              </button>

              <h3 className="dialog-title">Prompt Details</h3>
              {/* Render HTML content safely */}
              <div
                className="dialog-html"
                dangerouslySetInnerHTML={{ __html: selectedPrompt.prompt_text }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </IconContext.Provider>
  );
};

export default SideBar;
