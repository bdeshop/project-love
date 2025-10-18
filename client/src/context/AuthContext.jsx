import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(null); // user initially null
  const [loading, setLoading] = useState(false);

   // ✅ Demo user data (এই ডেটা আসলে API থেকে আসার কথা)
  useEffect(() => {
    const demoUser = {
      id: 1,
      username: "Raihan007",
      email: "raihan@example.com",
      role: "US",
      balance: 1250,
      status: "active",
      avatar: "https://i.ibb.co/V2tTg6M/user-avatar.png",
    };

    // ২ সেকেন্ড ডিলে দিয়ে লোডিং সিমুলেট করছি
    setTimeout(() => {
      setUser(demoUser);
      setLoading(false);
    }, 2000);
  }, []);


  // ✅ Balance রিফ্রেশ করার ডেমো ফাংশন
  const reloadBalance = () => {
    setLoading(true);
    setTimeout(() => {
      // Demo হিসেবে ব্যালেন্স একটু বাড়াই
      setUser((prev) => ({
        ...prev,
        balance: prev.balance + Math.random() * 100,
      }));
      setLoading(false);
    }, 1500);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, reloadBalance, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
