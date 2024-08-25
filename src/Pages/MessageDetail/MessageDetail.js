import React from 'react';
import { useLocation } from 'react-router-dom';
import './MessageDetial.css'; // Import CSS file

const MessageDetail = () => {
    const location = useLocation();
    const { email } = location.state;

    if (!email) {
        return <div className="loading">Loading...</div>; // Apply loading class
    }

    return (
        <div className="message-container">
            <h2>Message Detail</h2>
            <div className="message-details">
                <div><span>From:</span> {email.sender}</div>
                <div><span>To:</span> {email.recipient}</div>
                <div><span>Subject:</span> {email.subject}</div>
                <div><span>Message:</span> {email.message}</div>
                <div><span>Sent At:</span> {new Date(email.sentAt).toLocaleString()}</div>
            </div>
        </div>
    );
};

export default MessageDetail;
