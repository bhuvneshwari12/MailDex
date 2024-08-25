import React from 'react';
import { useLocation } from 'react-router-dom';
import './SentDetail.css'; // Import CSS file

const SentDetail = () => {
    const location = useLocation();
    const { sentMessage } = location.state;

    if (!sentMessage) {
        return <div className="loading">Loading...</div>; // Apply loading class
    }

    return (
        <div className="sent-detail-container">
            <h2>Details:</h2>
            <div className="sent-detail-content">
                <div><span>From:</span> {sentMessage.sender}</div>
                <div><span>To:</span> {sentMessage.recipient}</div>
                <div><span>Subject:</span> {sentMessage.subject}</div>
                <div><span>Message:</span> {sentMessage.message}</div>
                <div><span>Sent At:</span> {new Date(sentMessage.sentAt).toLocaleString()}</div>
            </div>
        </div>
    );
};

export default SentDetail;
