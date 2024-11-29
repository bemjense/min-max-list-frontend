import React, { useState } from "react";
import axios from "axios";
import './Chatbox.css'; // Import the CSS file

import './TodoPage.css'; // Add styles for the search bar if needed

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(false);
  
    const sendMessage = async () => {
        // if empty message return nothing
        if (!newMessage.trim()) return;
    
        // Add the user's message to the chat
        const userMessage = { sender: "You", text: newMessage };
        // concats onto messages the users input
        setMessages((prev) => [...prev, userMessage]);
        setNewMessage("");
        setLoading(true);
    
        try {
            // send message to ai
            const response = await axios.post("http://localhost:8000/api/chat", 
            {
                message: newMessage,
            });
    
            // add ai reply to chat
            const aiReply = { sender: "AI", text: response.data.reply };
            setMessages((prev) => [...prev, aiReply]);
            // if error output console error and input error text into messages
        } catch (error) {
            console.error("Error communicating with AI:", error);
            const errorMessage = { sender: "AI", text: "Something went wrong. Please try again." };
            setMessages((prev) => [...prev, errorMessage]);
            // no matter what set loading to false at end
        } finally {
            setLoading(false);
        }
    };
    
    
    return (
    <div className="chat-container">
        <div>
            {messages.map((msg, index) => (
                <div key={index} className="message">
                <strong>{msg.sender}: </strong> {msg.text}
                </div>
            ))}
        </div>
    
        <div className="input-container">
        <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={loading}
        />
        
        <button onClick={sendMessage} disabled={loading}>
            {loading ? "Generating" : "Send"}
        </button>
        
        </div>
    </div>
    );
};


export default ChatBox;
