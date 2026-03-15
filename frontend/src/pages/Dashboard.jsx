import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

function Dashboard() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await API.get("/account/balance");
      setBalance(res.data.balance);
    };
    fetchBalance();
  }, []);

  return (
    <div>
      <h2>Account Balance:₹{balance} </h2>
      <Link to="/send-money">send Money</Link>
      <br />
      <Link to="/statement">Account Statement</Link>
    </div>
  );
}
export default Dashboard;
