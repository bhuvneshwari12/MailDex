import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css'
import { AuthContext } from '../Store/AuthContext';

const SideBar = () => {
    const authctx=useContext(AuthContext)

    
    const handleLogout=()=>{
        authctx.logout()
    }

    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Mailbox</h2>
            <ul className="sidebar-nav">
                <li>
                    <Link to="/mailbox" className="sidebar-link">Compose Email</Link>
                </li>
                <li>
                    <Link to="/inbox/mails" className="sidebar-link">Inbox</Link>
                </li>
                <li>
                    <Link to="/sent/mails" className="sidebar-link">Sent</Link>
                </li>
                <li>
                    <Link to="/auth" className="sidebar-link" onClick={handleLogout}>Logout</Link>
                </li>
            </ul>
        </div>
    );
}
export default SideBar;