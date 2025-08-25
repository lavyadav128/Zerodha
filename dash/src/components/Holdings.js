import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import "bootstrap/dist/css/bootstrap.min.css";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch holdings from backend
  const fetchHoldings = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/allHoldings");
      setAllHoldings(res.data);
    } catch (err) {
      setError("Failed to fetch holdings");
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh prices every 5 seconds
  useEffect(() => {
    fetchHoldings();
    const interval = setInterval(fetchHoldings, 5000);
    return () => clearInterval(interval);
  }, []);

  // Send dummy holdings to backend
  const sendHoldingsToBackend = async () => {
    try {
      await axios.post("http://localhost:3000/saveHoldings", allHoldings);
      alert("✅ Holdings synced successfully!");
    } catch (err) {
      alert("❌ Failed to sync holdings!");
    }
  };

  // Portfolio calculations
  const totalInvestment = allHoldings.reduce((acc, stock) => acc + stock.avg * stock.qty, 0);
  const currentValue = allHoldings.reduce((acc, stock) => acc + stock.price * stock.qty, 0);
  const totalPnL = currentValue - totalInvestment;
  const percentageChange = ((totalPnL / totalInvestment) * 100).toFixed(2);

  const labels = allHoldings.map(stock => stock.name);
  const data = {
    labels,
    datasets: [
      {
        label: "Stock Prices",
        data: allHoldings.map(stock => stock.price),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  if (loading) return <h3 className="text-center mt-4">Loading holdings...</h3>;
  if (error) return <h3 className="text-danger text-center mt-4">{error}</h3>;

  return (
    <div className="container mt-4">
      <h3 className="text-primary mb-3">
        Holdings ({allHoldings.length})
      </h3>

      {/* Portfolio Insights */}
      <div className="row mb-3">
        <div className="col-md-3 col-6">
          <div className="card p-3 shadow-sm">
            <h5>₹{totalInvestment.toFixed(2)}</h5>
            <p className="text-muted">Total Investment</p>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card p-3 shadow-sm">
            <h5>₹{currentValue.toFixed(2)}</h5>
            <p className="text-muted">Current Value</p>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card p-3 shadow-sm">
            <h5 className={totalPnL >= 0 ? "text-success" : "text-danger"}>
              ₹{totalPnL.toFixed(2)}
            </h5>
            <p className="text-muted">Total P&L</p>
          </div>
        </div>
        <div className="col-md-3 col-6">
          <div className="card p-3 shadow-sm">
            <h5 className={totalPnL >= 0 ? "text-success" : "text-danger"}>
              {percentageChange}%
            </h5>
            <p className="text-muted">Overall Change</p>
          </div>
        </div>
      </div>

      {/* Sync Holdings Button */}
      <button
        onClick={sendHoldingsToBackend}
        className="btn btn-primary mb-3"
      >
        Sync Holdings
      </button>

      {/* Holdings Table */}
      <div className="table-responsive shadow-sm">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Instrument</th>
              <th>Qty</th>
              <th>Avg. Cost</th>
              <th>LTP</th>
              <th>Cur. Value</th>
              <th>P&L</th>
              <th>Net Chg.</th>
              <th>Day Chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const isProfit = curValue - stock.avg * stock.qty >= 0;
              const profClass = isProfit ? "text-success" : "text-danger";
              const dayClass = stock.isLoss ? "text-danger" : "text-success";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td className={profClass}>
                    {(curValue - stock.avg * stock.qty).toFixed(2)}
                  </td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Graph */}
      <div className="mt-4">
        <VerticalGraph data={data} />
      </div>
    </div>
  );
};

export default Holdings;
