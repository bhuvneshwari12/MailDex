import React, { useEffect, useState } from 'react'
import './Sent.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Sent = () => {
    const history = useHistory()
    const [recievedEmails, setRecievedEmails] = useState([])
    const [counter, setCounter] = useState('')
    const userEmail = localStorage.getItem('email')
    const userName = userEmail && userEmail.split('@')[0]

    useEffect(() => {
        fetchEmails()
        // const fetchInterval=setInterval(fetchEmails,9000)
        // return ( )=>clearInterval(fetchInterval)
    }, [])

    useEffect(() => {
        const count = recievedEmails.filter((email) => !email.read).length
        setCounter(count)
        console.log(count)
    }, [recievedEmails])




    const fetchEmails = () => {
        fetch(`https://mail-project-14c51-default-rtdb.firebaseio.com/mail/${userName}.json`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to recieve emails')
                }
                return res.json()
            })
            .then(data => {
                console.log(data)
                const emails = Object.values(data);
                setRecievedEmails(emails);
            })
            .catch(err => {
                alert(err)
            })
    }

    const handleDelete = (event, emailId) => {
        event.stopPropagation()
        const updatedEmails = recievedEmails.filter((email) => email.id !== emailId);
        setRecievedEmails(updatedEmails);

        const url = `https://mail-box-client-2b2e8-default-rtdb.firebaseio.com/mail/${userName}/.json`;
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(updatedEmails),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete email');
                }
                console.log('Email deleted successfully');
            })
            .catch((error) => {
                console.error('Error deleting email:', error);
            });
    };



    const handleEmailClick = (emailId) => {
        const selectedEmail = recievedEmails.find(email => email.id === emailId);
        if (selectedEmail) {
            markAsRead(emailId);
            history.push({
                pathname: `/sent/mails/${emailId}`,
                state: { sentMessage: selectedEmail }
            });

        }
    };

    const markAsRead = (emailId) => {
        const updatedEmails = recievedEmails.map((email) =>
            email.id === emailId ? { ...email, read: true } : email
        );
        setRecievedEmails(updatedEmails);

        fetch(`https://mail-box-client-2b2e8-default-rtdb.firebaseio.com/mail/${userName}.json`, {
            method: 'PUT',
            body: JSON.stringify(updatedEmails),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };
    return (
        <div className="email-container">
            <h2>Unread:{counter}</h2>
            {recievedEmails.length === 0 && <p>No emails found</p>}
            <ul className="email-list">
                {
                    recievedEmails.map((mail) => (
                        <div key={mail.id} className={`email-item ${!mail.read ? 'unread' : ''}`} onClick={() => handleEmailClick(mail.id)}>
                            <div className="email-sender">From: {mail.sender}</div>
                            <div>{mail.read}</div>
                            <div> subject:{mail.subject}</div>
                            {/* <div className="email-recipient">To: {mail.recipient}</div> */}
                            {/* <div className="email-content">Message: {mail.emailContent}</div> */}
                            {/* <div className="email-sentAt">Sent At: {new Date(mail.sentAt).toLocaleString()}</div> */}
                            {!mail.read && <p className='dot' ></p>}

                            <button onClick={(event) => handleDelete(event, mail.id)}>Delete</button>
                        </div>
                    ))
                }
            </ul>
        </div>
    )
}

export default Sent;