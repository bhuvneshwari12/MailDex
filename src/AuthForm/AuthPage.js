import React, { useContext, useRef, useState } from 'react';
import './AuthPage.css'
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { AuthContext } from '../Store/AuthContext';


const AuthPage = () => {
    const authctx=useContext(AuthContext)
    const history=useHistory()
   const [isLogin,setIsLogin]=useState(true);
   let emailRef=useRef()
   let passwordRef=useRef()
   let confirmPasswordRef=useRef()
 

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredEmail=emailRef.current.value;
    const enteredPassword=passwordRef.current.value;
    console.log('Form submitted');


    if (!isLogin) {
        const enteredConfirmPassword = confirmPasswordRef.current.value;
        if (enteredPassword.trim() !== enteredConfirmPassword.trim()) {
          alert("Passwords don't match.");
          return;
        }
      }

    let url;
    if(!isLogin)
    {
        url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDXnYnPZvWmQikMTjFhQ4x2VjbehYit0xo  '
    }
    else
    {
        url=' https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDXnYnPZvWmQikMTjFhQ4x2VjbehYit0xo'
    }
    fetch(url,{
        method:'POST',
        body: JSON.stringify({email:enteredEmail,password:enteredPassword ,returnSecureToken:true}),
        headers: {'Content-Type':'application/json'}
    })
    .then(res=>{
        if(!res.ok){
            throw new Error('Authentication failed')
        }
        return res.json();
    })
    .then (data=>{
        console.log(data)
        authctx.login(data.idToken,data.email)
        history.push('./mailbox')
    })
    .catch(error=>{
        alert(error.message)
    })
  };

  const togglehandler=()=>{
    setIsLogin(!isLogin)
 }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${'https://images.pexels.com/photos/3435249/pexels-photo-3435249.jpeg?auto=compress&cs=tinysrgb&w=600'})`,
        backgroundSize: 'cover',
        padding: '20px',
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
      }}
    >
      <div
        className="p-4"
        style={{
          maxWidth: '400px',
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '10px',
          boxShadow: '0 0 20px rgba(0, 0, 255, 0.5)',
          transition: 'box-shadow 0.3s ease-in-out',
        }}
      
      >
        <h2 className="text-center mb-4">{isLogin? 'Login':'SignUp'}</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref={emailRef} required/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"  ref={passwordRef} required/>
          </Form.Group>

       {!isLogin &&   <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label> Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" ref={confirmPasswordRef} required />
          </Form.Group> }

          <Button variant="primary" type="submit" className="w-100 mt-3">{isLogin? 'Login':'SignUp'}</Button>
         

          <button className='toggle' onClick={togglehandler}>{isLogin? 'create new account': 'Already have an account?  '}</button>
        </Form>
      </div>
    </div>
  );
};

export default AuthPage;
