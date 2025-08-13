import { useEffect, useState } from "react";
import "./Currentprices.css";

function Currentprices() {
  const [stocks, setStocks] = useState({});
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/stocks")
      .then(res => res.json())
      .then(data => setStocks(data));
  }, []);

  const fetchPrediction = () => {
    fetch("http://localhost:8000/predict")
      .then(res => res.json())
      .then(data => {
        // data looks like: { "Predicted Next Day Close Price": 185.23 }
        setPrediction(data["Predicted Next Day Close Price"]);
      });
  };

  return (
    <div>
      <h1>Stockies</h1>
      <ul className="cool-list">
        {Object.entries(stocks).map(([symbol, price]) => (
          <li key={symbol}>{symbol}: ${price.toFixed(2)}</li>
        ))}
      </ul>

      <button className="neon-btn" onClick={fetchPrediction}>
        Predictions
      </button>

      {prediction !== null && (
        <div className="prediction-result">
          <h2>Predicted AAPL Price Tomorrow: ${prediction}</h2>
        </div>
      )}
    </div>
  );
}

export default Currentprices;