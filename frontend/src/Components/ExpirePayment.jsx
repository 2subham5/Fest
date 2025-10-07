import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const ExpirePayment = () => {
  const location = useLocation();
  const [message, setMessage] = useState("Processing...");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const uniqueId = params.get("uniqueId");

    if (!uniqueId) {
      setMessage("❌ No Unique ID provided in the URL.");
      return;
    }

    const expirePass = async () => {
      try {
        const token = localStorage.getItem("token"); // admin JWT
        const { data } = await axios.post(
          `http://localhost:3000/user/expire?uniqueId=${uniqueId}`,
          {}, // empty body
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // If backend succeeds, pass was valid and is now expired
        setMessage(`✅ Pass is valid and now expired for ${data.name} (${data.email})`);
      } catch (err) {
        const errorMsg = err.response?.data?.error || "Server error";

        // Check if backend says it was already expired
        if (errorMsg.includes("This payment is already expired")) {
          setMessage("❌ Invalid / Pass already expired");
        } else if (errorMsg.includes("This payment is not done")) {
          setMessage("❌ Payment not completed yet");
        } else if (errorMsg.includes("Payment not found")) {
          setMessage("❌ Invalid Unique ID");
        } else {
          setMessage(`❌ ${errorMsg}`);
        }
      }
    };

    expirePass();
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Expire Pass</h1>
      <p className="mt-2 text-center">{message}</p>
    </div>
  );
};

export default ExpirePayment;
