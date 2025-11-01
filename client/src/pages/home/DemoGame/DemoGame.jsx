import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DemoGame = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [balance, setBalance] = useState(null);
  const [balLoading, setBalLoading] = useState(false);
  const [gameLink, setGameLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  // Fetch user balance
  useEffect(() => {
    if (user && user._id) {
      setBalLoading(true);
      axios
        .get(
          `${import.meta.env.VITE_API_URL}/api/admins/user-balance/${user._id}`
        )
        .then((res) => {
          setBalance(res.data.balance * 100); // Convert .01.00 BDT to 100 Bangladeshi currency
        })
        .catch((err) => {
          console.error("Error fetching user balance:", err);
          setError("Failed to fetch balance");
        })
        .finally(() => setBalLoading(false));
    }
  }, [user]);

  // Fetch game link on page load
  useEffect(() => {
    const fetchGameLink = async () => {
      if (!user || !id) {
        setError("User or game ID not found");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const body = {
          username: user?.username || user?.email || "guest",
          money: balance || 0,
          gameID: id,
        };
        console.log("Calling play-game with:", body);
        const resp = await axios.post(
          `${import.meta.env.VITE_API_URL}/games/play-game`,
          body
        );
        console.log("play-game response:", resp?.data?.data);

        const link =
          resp?.data?.data || resp?.data?.gameLink || resp?.data?.link;
        if (link) {
          setGameLink(link);
        } else {
          throw new Error("Game link not found in response");
        }
      } catch (err) {
        console.error(
          "Error fetching game link:",
          err?.response?.data || err.message
        );
        setError("Failed to fetch game link");
      } finally {
        setLoading(false);
      }
    };

    if (user && id) {
      fetchGameLink();
    }
  }, [user, id, balance]);

  // Handle iframe loading state
  useEffect(() => {
    if (!videoRef.current || !gameLink) return;

    const handleIframeLoad = () => {
      console.log("Iframe loaded");
      setLoading(false);
    };

    videoRef.current.addEventListener("load", handleIframeLoad);

    // Fallback timer to stop loading after 5 seconds
    const fallbackTimer = setTimeout(() => {
      console.log("Iframe loading fallback timer");
      setLoading(false);
    }, 5000);

    return () => {
      clearTimeout(fallbackTimer);
      if (videoRef.current) {
        videoRef.current.removeEventListener("load", handleIframeLoad);
      }
    };
  }, [gameLink]);

  return (
    <div className="relative w-full h-[100vh] bg-white">
      {error && (
        <div className="mt-5 pt-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">
          <p className="font-semibold mt-5 pt-5">একটি ত্রুটি ঘটেছে!</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {gameLink && (
        <iframe
          ref={videoRef}
          className="w-full h-[90%] fixed inset-0 top-16 bg-gradient-to-b from-white to-gray-100"
          src={gameLink}
          frameBorder="0"
          title={`Game ${id}`}
          allowFullScreen
        ></iframe>
      )}

      {loading && (
        <div className="loader-container fixed inset-0 flex items-center justify-center bg-gradient-to-b from-white to-gray-100 z-50">
          <div className="flex flex-col items-center justify-center">
            <div className="loader relative w-16 h-16 mb-6">
              <div className="absolute inset-0 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-4 border-t-transparent border-yellow-400 rounded-full animate-spin-slow"></div>
              <div className="absolute inset-0 bg-blue-100 rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 animate-bounce">
              গেম লোড হচ্ছে
            </h2>
            <p className="text-lg font-semibold text-blue-600">
              অপেক্ষা করুন...
            </p>
          </div>
        </div>
      )}

      <style>
        {`
          .animate-spin-slow {
            animation: spin 2s linear infinite;
          }
          .animate-pulse {
            animation: pulse 1.5s ease-in-out infinite;
          }
          .animate-bounce {
            animation: bounce 2s ease-in-out infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.2); opacity: 0.9; }
            100% { transform: scale(1); opacity: 0.7; }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>
    </div>
  );
};

export default DemoGame;
