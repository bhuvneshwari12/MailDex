import React, { useContext, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './MailBoxPage.css';
import { AuthContext } from '../../Store/AuthContext';
import { useHistory } from 'react-router-dom';

const MailBoxPage = () => {
    const history = useHistory();
    const authctx = useContext(AuthContext);
    const [recipient, setRecipient] = useState('');
    const [subject, setSubject] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const handleSendEmail = (event) => {
        event.preventDefault();
        const userEmail = localStorage.getItem('email');
        const userName = userEmail && userEmail.split('@')[0];

       
        fetch(`https://mail-project-14c51-default-rtdb.firebaseio.com/mail/${userName}.json`, {
            method: 'POST',
            body: JSON.stringify({
                subject,
                recipient,
                message: editorState.getCurrentContent().getPlainText(),
                sender: userEmail,
                sentAt: new Date().toISOString(),
                read: false,
                id: Date.now()
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to store email');
            }
            console.log('email successfully sent');
            setRecipient('');
            setSubject('');
            setEditorState(EditorState.createEmpty());
            history.push('/inbox/mails');
        })
        .catch(error => {
            alert(error);
            console.log('error storing email', error);
        });
    };

    return (
        <div className="compose-mail-container">
            <h1 className='heading'>𝐂𝐨𝐦𝐩𝐨𝐬𝐞 𝐌𝐚𝐢𝐥</h1>
            <form className="compose-mail-form" onSubmit={handleSendEmail}>
                <input
                    type="email"
                    placeholder="Recipient"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="recipient-input"
                    required
                />
                <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="subject-input"
                    required
                />
                <Editor
                    editorState={editorState}
                    wrapperClassName="text-editor-wrapper"
                    editorClassName="text-editor"
                    onEditorStateChange={setEditorState}
                    toolbar={{
                        options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'emoji', 'history'],
                        inline: {
                            options: ['bold', 'italic', 'underline', 'strikethrough'],
                        },
                    }}
                    placeholder="Compose your mail..."
                />
                <button className="send-button">Send</button>
            </form>
        </div>
    );
};

export default MailBoxPage;
