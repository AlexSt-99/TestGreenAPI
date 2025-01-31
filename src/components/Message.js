import React from 'react';
import './styles.css';

const Message = ({ text, sender, time }) => {
    if (!text) return null;

    return (
        <div className={`message ${sender === 'me' ? 'sender' : 'recipient'}`}>
            <p>{text}</p>
            <span className="message-time">{time}</span>
        </div>
    );
};

export default Message;