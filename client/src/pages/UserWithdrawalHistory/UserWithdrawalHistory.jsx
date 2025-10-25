import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { AuthContext } from "@/context/AuthContext";
import { useToasts } from "react-toast-notifications";

const UserWithdrawalHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const { addToast } = useToasts();
  const userId = user?._id;

  useEffect(() => {
    if (!userId) {
      addToast("Login First!", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/withdraw/history/user/${userId}`);
        setHistory(res.data);
      } catch (err) {
        
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [userId]);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-gray-100 p-6 rounded-lg shadow-lg mt-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Withdraw History</h1>
      {history.length === 0 ? (
        <p className="text-center text-gray-600">No Withdraw History</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Method</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">PBU</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item._id}>
                <td className="border p-2">{item.methodId}</td>
                <td className="border p-2">৳ {item.amount.toLocaleString()}</td>
                <td className="border p-2">{item.pbuAmount.toFixed(2)}</td>
                <td className="border p-2">
                  <span className={`px-2 py-1 rounded text-xs ${item.status === "approved" ? "bg-green-200 text-green-800" : item.status === "pending" ? "bg-yellow-200 text-yellow-800" : "bg-red-200 text-red-800"}`}>
                    {item.status === "pending" ? "pending" : item.status === "approved" ? "approved" : "cancel"}
                  </span>
                </td>
                <td className="border p-2">{new Date(item.createdAt).toLocaleDateString('bn-BD')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserWithdrawalHistory;