import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";

const UserTransactionHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const userId = user?._id;

  useEffect(() => {
    if (!userId) {

      return;
    }
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/deposit/history/user/${userId}`);
        setHistory(res.data);
      } catch (err) {
 
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [userId]);

  if (loading) {
    return <div className="text-center p-4">লোড হচ্ছে...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-gray-100 p-6 rounded-lg shadow-lg mt-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">আপনার ডিপোজিট হিস্ট্রি</h1>
      {history.length === 0 ? (
        <p className="text-center text-gray-600">কোনো হিস্ট্রি নেই</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">মেথড</th>
              <th className="border p-2">অ্যামাউন্ট</th>
              <th className="border p-2">PBU</th>
              <th className="border p-2">স্ট্যাটাস</th>
              <th className="border p-2">তারিখ</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item._id}>
                <td className="border p-2">{item.methodId}</td>
                <td className="border p-2">৳ {item.amount.toLocaleString()}</td>
                <td className="border p-2">{item.totalPBU.toFixed(2)}</td>
                <td className="border p-2">
                  <span className={`px-2 py-1 rounded text-xs ${item.status === "approved" ? "bg-green-200 text-green-800" : item.status === "pending" ? "bg-yellow-200 text-yellow-800" : "bg-red-200 text-red-800"}`}>
                    {item.status === "pending" ? "পেন্ডিং" : item.status === "approved" ? "অ্যাপ্রুভ" : "ক্যানসেল"}
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

export default UserTransactionHistory;