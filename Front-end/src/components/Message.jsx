import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function Message() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
      setUsername(decoded.username);
    }
  }, []);

  const handleSend = async () => {
    if (!message.trim()) {
      setIsSuccess(false);
      setStatus("Message can't be empty!");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://quicknotesbackend-e5oz.onrender.com/messages/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id: userId, username, message }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setStatus("Message sent! Thanks for your feedback 🙏");
        setMessage("");
      } else {
        setIsSuccess(false);
        setStatus(data.message);
      }
    } catch (error) {
      setIsSuccess(false);
      setStatus("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="message-container">
      <h1 className="message-title1">Wanna share your thoughts on your experience?</h1>
      <span className="message-title2">Drop your feedback below</span>
      <textarea
        className="message-area"
        placeholder="Type. . ."
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          setStatus(null);
        }}
      />
      {status && (
        <p className={`inline-message ${isSuccess ? "inline-success" : "inline-error"}`}>
          {status}
        </p>
      )}
      <button
        onClick={handleSend}
        className="btn btn-primary"
        style={{ alignSelf: "center" }}
        disabled={loading}
      >
        {loading ? "Sending..." : "SEND"}
      </button>
    </div>
  );
}

export default Message;