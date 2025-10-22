import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPositions = async () => {
    try {
      const res = await axios.get("http://localhost:3000/allPositions");
      setPositions(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching positions:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  if (loading) {
    return <div className="text-center my-5">Loading Positions...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Positions</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Product</th>
              <th>Stock</th>
              <th>Qty</th>
              <th>Avg Price</th>
              <th>Current Price</th>
              <th>Net P&L</th>
              <th>Day P&L</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {positions.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">
                  No Positions Available
                </td>
              </tr>
            ) : (
              positions.map((pos, index) => (
                <tr key={index}>
                  <td>{pos.product}</td>
                  <td>{pos.name}</td>
                  <td>{pos.qty}</td>
                  <td>{pos.avg}</td>
                  <td>{pos.price}</td>
                  <td
                    className={pos.isLoss ? "text-danger fw-bold" : "text-success fw-bold"}
                  >
                    {pos.net}
                  </td>
                  <td>{pos.day}</td>
                  <td>
                    {pos.isLoss ? (
                      <span className="badge bg-danger">Loss</span>
                    ) : (
                      <span className="badge bg-success">Profit</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Positions;
