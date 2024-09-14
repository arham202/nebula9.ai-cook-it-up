import { useState, useEffect, useContext } from "react";
import Select from "react-select";
import Cookies from "js-cookie";
import { getNames, getCode } from "country-list";
import "./PopUpForm.css";
import { Context } from "../context/Context";
import axios from "axios";

const countries = getNames().map((country) => ({
  value: getCode(country),
  label: country,
}));

const cuisines = [
  { value: "italian", label: "Italian" },
  { value: "chinese", label: "Chinese" },
  { value: "mexican", label: "Mexican" },
  { value: "indian", label: "Indian" },
  { value: "japanese", label: "Japanese" },
  { value: "french", label: "French" },
  { value: "thai", label: "Thai" },
  { value: "spanish", label: "Spanish" },
  { value: "greek", label: "Greek" },
  { value: "lebanese", label: "Lebanese" },
];

const diets = [
  { value: "omnivore", label: "Omnivore" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "pescatarian", label: "Pescatarian" },
  { value: "paleo", label: "Paleo" },
  { value: "keto", label: "Keto" },
  { value: "gluten-free", label: "Gluten-free" },
  { value: "dairy-free", label: "Dairy-free" },
  { value: "halal", label: "Halal" },
  { value: "kosher", label: "Kosher" },
];

const PopupForm = ({ isOpen, onClose }) => {
  const { dietary, country, favCuisine, userName, getUser } =
    useContext(Context);

  const [formData, setFormData] = useState({
    name: userName || "User",
    country: country ? countries.find((c) => c.label === country) : null,
    cuisine: favCuisine ? cuisines.find((c) => c.label === favCuisine) : null,
    diets: dietary ? diets.find((d) => d.label === dietary) : null,
  });

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSave = async (savedData) => {
    try {
      const token = Cookies.get("token");
      const response = await axios.post(
        "http://localhost:8080/api/v1/set-user",
        {
          userName: savedData.name,
          country: savedData.country,
          favCuisine: savedData.cuisine,
          dietary: savedData.diets,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      console.log(response.data);
      alert("Updated Successfully");
      getUser();
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Failed to update user preferences";
      console.error("Error:", errorMsg);
      alert(errorMsg);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    const savedData = {
      ...formData,
      country: formData.country ? formData.country.label : "",
      cuisine: formData.cuisine ? formData.cuisine.label : "",
      diets: formData.diets ? formData.diets.label : "",
    };

    onSave(savedData);
    onClose();
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className="avatar-section">
          <h2>{formData.name}</h2>
        </div>
        <form className="popup-form" onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country:</label>
            <Select
              id="country"
              options={countries}
              value={formData.country}
              onChange={(selected) => handleChange("country", selected)}
              isClearable
            />
          </div>
          <div className="form-group">
            <label htmlFor="cuisine">Favorite Cuisine:</label>
            <Select
              id="cuisine"
              options={cuisines}
              value={formData.cuisine}
              onChange={(selected) => handleChange("cuisine", selected)}
              isClearable
            />
          </div>
          <div className="form-group">
            <label htmlFor="diets">Dietary Preferences:</label>
            <Select
              id="diets"
              options={diets}
              value={formData.diets}
              onChange={(selected) => handleChange("diets", selected)}
              isClearable
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="btn-save">
              Save
            </button>
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
