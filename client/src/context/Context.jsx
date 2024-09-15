import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [country, setCountry] = useState("");
  const [favCuisine, setfavCuisine] = useState("");
  const [dietary, setDietary] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const [userName, setUserName] = useState(() => Cookies.get("userName") || "");

  const fetchPrevPrompts = async () => {
    console.log("Fetching previous prompts...");
    try {
      const token = Cookies.get("token");

      const response = await axios.post(
        "https://nebula9-ai-cook-it-up.onrender.com/api/v1/prevPrompts",
        { userName },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      // response.data.map((item) => {
      //   console.log(item);
      // });

      setPrevPrompts(response.data);
    } catch (error) {
      console.error("Error fetching previous prompts:", error);
    }
  };

  const run = async (prompt) => {
    console.log("Fetching response...");
    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        "https://nebula9-ai-cook-it-up.onrender.com/api/generative-ai/generate",
        { prompt },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      return response.data.response;
    } catch (error) {
      console.error("Error fetching previous prompts:", error);
    }
  };

  const getUser = async () => {
    // console.log(userName);
    try {
      const token = Cookies.get("token");

      const response = await axios.post(
        "https://nebula9-ai-cook-it-up.onrender.com/api/v1/user",
        { userName },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      // console.log(response.data);

      setCountry(response.data.country);
      setfavCuisine(response.data.fav_cuisine);
      setDietary(response.data.dietary);

      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching previous prompts:", error);
    }
  };

  useEffect(() => {
    fetchPrevPrompts();
    getUser();
  }, []);

  useEffect(() => {
    Cookies.get("userName");
  }, [userName]);

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let promptToSend;
    let response = "";
    if (prompt !== undefined) {
      setRecentPrompt(input);
      promptToSend = prompt;
    } else {
      setRecentPrompt(input);
      promptToSend = `Generate a recipe using the following ingredients: ${input}. The recipe should be inspired by ${country} cuisine, focusing on ${favCuisine} dishes, and should adhere to the following dietary preferences: ${dietary}. Provide the recipe name, ingredients list, and step-by-step instructions. Format the response using bold for heading only and section heading (**text**), italic (*text*),line breaks (\\n) and give me a beautifully formatted response.`;
    }

    response = await run(promptToSend);
    console.log(response);

    let newResponse2 = response
      .replace(/^##\s*/, "")
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
      .replace(/\*(.*?)\*/g, "<i>$1</i>")
      .replace(/\n/g, "<br>")
      .replace(/(\d+\.\s)/g, "<br><b>$1</b>");
    let newResponseArray = newResponse2.split(" ");

    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }

    const token = Cookies.get("token");

    try {
      await axios.post(
        "https://nebula9-ai-cook-it-up.onrender.com/api/v1/storePrompt",
        { userName, promptText: newResponse2 },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      console.log("Prompt stored successfully.");
    } catch (error) {
      console.error("Error storing prompt:", error);
    }

    setPrevPrompts((prev) => [...prev, input]);
    fetchPrevPrompts();

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    userName,
    setUserName,
    dietary,
    country,
    favCuisine,
    setCountry,
    setDietary,
    setfavCuisine,
    getUser,
    fetchPrevPrompts,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
