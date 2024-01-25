import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import { TextField, Select, MenuItem } from "@mui/material";
import axios from "axios";
import validator from "validator";
import Button from "@mui/material/Button";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [chips, setChips] = useState([]);
  const [emailError, setEmailError] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputText(value);
    setEmailError(validator.isEmail(value) ? "" : "Invalid email address");
  };

  const handleAddChip = () => {
    if (inputText.trim() !== "") {
      setChips([...chips, inputText]);
      setInputText("");
      setEmailError("");
    }
  };

  const handleRemoveChip = (chipIndex) => {
    const newChips = chips.filter((_, index) => index !== chipIndex);
    setChips(newChips);
  };

  const handleSubmit = async () => {
    try {
      // Send the chips array to the backend using Axios
      await axios.post("http://localhost:5000/api/submit", { chips, emailSubject, emailBody });
      // Do something after successful submission if needed
      console.log("Chips submitted successfully!");
    } catch (error) {
      console.error("Error submitting chips:", error);
    }
  };

  return (
    <section
      id="app"
      className="flex h-screen w-screen flex-col items-center justify-center"
    >
      <div className="flex items-center">
        <TextField
          label="Type email here"
          variant="outlined"
          value={inputText}
          onChange={handleInputChange}
          error={!!emailError}
          helperText={emailError}
        />
        <Button variant="contained" onClick={handleAddChip}>
          Add
        </Button>
      </div>
      <div style={{ marginTop: "10px" }}>
        {chips.map((chip, index) => (
          <Chip
            key={index}
            label={chip}
            onDelete={() => handleRemoveChip(index)}
            style={{ margin: "4px" }}
          />
        ))}
      </div>
      <div style={{ marginTop: "10px" }}>
        <TextField
          label="Email Subject"
          variant="outlined"
          value={emailSubject}
          onChange={(e) => setEmailSubject(e.target.value)}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <TextField
          label="Email Body"
          variant="outlined"
          value={emailBody}
          onChange={(e) => setEmailBody(e.target.value)}
          multiline
          rows={4}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </section>
  );
}
