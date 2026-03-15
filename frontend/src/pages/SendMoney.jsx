import { useState, useEffect } from "react";
import API from "../api/axios";

function SendMoney() {
  const [users, setUsers] = useState([]);
  const [receiverId, setReceiverId] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await API.get("/account/users");
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDafault();

    await API.post("/account/transfer", {
      receiverId,
      amount: Number(amount),
    });
    alert("Transfer Successful");
  };

  return (
    <form onSubmit={handleSubmit}>
      <select onChange={(e) => setReceiverId(e.target.value)}>
        <option>Select User</option>
        {users.map((user) => {
          <option key={user.id}>{user.name}</option>;
        })}
      </select>
      <input placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />

      <button type="submit">Send</button>
    </form>
  );
}
export default SendMoney;
