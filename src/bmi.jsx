import React, { useState } from "react";
import "./index.css";

// Import images statically
import underweightImg from "../src/assets/underweight.png";
import healthyImg from "../src/assets/healthy.png";
import overweightImg from "../src/assets/overweight.png";

function App() {
  // state
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState("");
  const [message, setMessage] = useState(""); 
  const [imgSrc, setImgSrc] = useState(null); // Initialize image source state

  let calcBmi = (event) => {
    // prevent submitting 
    event.preventDefault();

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (isNaN(weightNum) || isNaN(heightNum) || weightNum <= 0 || heightNum <= 0) {
      alert("Please enter valid weight and height greater than zero");
      return;
    }

    let bmiValue = (weightNum / (heightNum * heightNum)) * 703;
    setBmi(bmiValue.toFixed(1));

    // Logic for message and image
    let img;
    if (bmiValue < 25) {
      setMessage("You are underweight");
      img = underweightImg;
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setMessage("You are a healthy weight");
      img = healthyImg;
    } else {
      setMessage("You are overweight");
      img = overweightImg;
    }
    setImgSrc(img);
  };

  let reload = () => {
    window.location.reload();
  };

  return (
    <div className="app">
      <div className="container">
        <h2 className="center">BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div>
            <label>Weight (lbs)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              min="0"
            />
          </div>
          <div>
            <label>Height (in)</label>
            <input
              type="number"
              value={height}
              onChange={(event) => setHeight(event.target.value)}
              min="0"
            />
          </div>
          <div>
            <button className="btn" type="submit">
              Submit
            </button>
            <button
              className="btn btn-outline"
              onClick={reload}
              type="button" // Changed type to "button" to prevent form submission
            >
              Reload
            </button>
          </div>
        </form>

        <div className="center">
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
        </div>

        <div className="img-container">
          {imgSrc && <img src={imgSrc} alt="" />}
        </div>
      </div>
    </div>
  );
}

export default App;
