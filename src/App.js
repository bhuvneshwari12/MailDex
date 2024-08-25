import React, { useContext } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import MailBoxPage from './Pages/MailBox/MailBoxPage';
import { Redirect, Route } from 'react-router-dom/cjs/react-router-dom.min';
import { AuthContext } from './Store/AuthContext';
import Inbox from './Pages/InputPage/Inbox';
import MessageDetail from './Pages/MessageDetail/MessageDetail';
import SideBar from './SideBar/SideBar';
import Sent from './Pages/SentPage/Sent';
import SentDetail from './Pages/SentPageDetail/SentDetail';
import AuthPage from './AuthForm/AuthPage';


const App = () => {
  const authctx = useContext(AuthContext)
  return (
    <div>
    
      <header>
        {authctx.isLoggedIn && <SideBar />}
      </header>
      <main>
        <Route path='/' exact >{!authctx.isLoggedIn ? <AuthPage /> : <Redirect to='/mailbox' />}</Route>
        <Route path='/auth' exact >{!authctx.isLoggedIn ? <AuthPage /> : <Redirect to='/mailbox' />}</Route>
        <Route path='/mailbox'>{authctx.isLoggedIn ? <MailBoxPage /> : <Redirect to='/auth' />}</Route>
        <Route path='/inbox/mails' exact>{authctx.isLoggedIn ? <Inbox /> : <Redirect to='/auth' />}</Route>
        <Route path='/inbox/mails/:id' exact>{authctx.isLoggedIn ? <MessageDetail /> : <Redirect to='/auth' />}</Route>
        <Route path='/sent/mails' exact>{authctx.isLoggedIn ? <Sent /> : <Redirect to='/auth' />}</Route>
        <Route path='/sent/mails/:id' exact>{authctx.isLoggedIn ? <SentDetail /> : <Redirect to='/auth' />}</Route>
      </main>
    </div>
  )
}

export default App;