import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [features, setFeatures] = useState({
    ph: "",
    Hardness: "",
    Solids: "",
    Chloramines: "",
    Sulfate: "",
    Conductivity: "",
    Organic_carbon: "",
    Trihalomethanes: "",
    Turbidity: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeatures({
      ...features,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/predict", features);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error making prediction", error);
    }
    setLoading(false);
  };

  const featureLabels = {
    ph: "pH",
    Hardness: "Hardness",
    Solids: "Solids",
    Chloramines: "Chloramines",
    Sulfate: "Sulfate",
    Conductivity: "Conductivity",
    Organic_carbon: "Organic Carbon",
    Trihalomethanes: "Trihalomethanes",
    Turbidity: "Turbidity",
  };

  return (
    <div className="container">
      {/* Left side image */}
      <div className="image-side">
        <img src="/water.png" alt="Water Quality" className="side-image" />
        
      </div>

      {/* Form side */}
      <div className="form-container">
        <h2 className="form-title">Water Quality Prediction</h2>
        <form onSubmit={handleSubmit} className="prediction-form">
          {Object.keys(features).map((feature) => (
            <div key={feature} className="input-group">
              <label>{featureLabels[feature]}:</label>
              <input
                type="number"
                name={feature}
                value={features[feature]}
                onChange={handleInputChange}
                placeholder={`Enter ${featureLabels[feature]}`}
                step="any"
                required
              />
            </div>
          ))}
          <button type="submit" disabled={loading}>
            {loading ? "Predicting..." : "Predict"}
          </button>
        </form>

        {prediction !== null && (
          <div className="result">
           <h2 className={prediction === 1 ? "safe" : "unsafe"}>
          {prediction === 1 ? "Safe to Drink" : "Unsafe to Drink"}
        </h2>

          </div>
        )}
      </div>
    </div>
  );
}

export default App;
