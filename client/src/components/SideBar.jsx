import "./SideBar.css";
import Cookies from "js-cookie";
import { MdMenu } from "react-icons/md";
import {
  AiOutlinePlusCircle,
  AiOutlineLogout,
  AiOutlineDelete,
} from "react-icons/ai";
import { MdFastfood } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoDotFill } from "react-icons/go";
import { IconContext } from "react-icons";
import { useContext, useState } from "react";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PopupForm from "./PopUpForm";

const SideBar = () => {
  const navigate = useNavigate();
  const [extended, setExtended] = useState(true);
  const { prevPrompts, newChat, setPrevPrompts, getUser, userName } =
    useContext(Context);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hoveredPrompt, setHoveredPrompt] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleDeletePrompt = async (id) => {
    const token = Cookies.get("token");
    try {
      const response = await axios.post(
        `https://nebula9-ai-cook-it-up.onrender.com/api/v1/prompts/${id}`,
        { userName },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      if (response.status === 200) {
        setPrevPrompts((prev) => prev.filter((prompt) => prompt.id !== id));
        toast.success("Deleted successfully");
      } else {
        toast.error("Failed to delete prompt");
      }
    } catch (error) {
      toast.error("Error deleting prompt:", error);
    }
  };

  const toggleForm = () => {
    setIsFormOpen((prev) => !prev);
    getUser();
  };

  const handlePromptClick = (prompt) => {
    setSelectedPrompt(prompt);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedPrompt(null);
  };

  return (
    <IconContext.Provider value={{ className: "react-icons" }}>
      <ToastContainer />
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
                    <GoDotFill />
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
            <MdFastfood />
            {extended ? <p>User Preference</p> : null}
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
              <h3 className="dialog-title">Recipe Details</h3>
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
