'use client'
// import dotenv from 'dotenv';
// Dotenv approach not working for frontend like it was on backend, need to come up with diff way to get secret key later for security for now hardcoding so not blocked
const secret_key = "8430b5564e42d39e724e1aa08a2723281e5120162e97ad8554111cea26bd6b76";

// TODO: Define match box component to hold entries pulled from matches collection on DB
import React, {useState, useEffect} from 'react'
import jwt from 'jsonwebtoken';


const MatchBox = () => {
  // for testing grabbing userID from JWT
  const [decodedUserId, setDecodedUserId] = useState('');
  const [rawJWT, setRawJWT] = useState('');
  const [secretKey, setSecretKey] = useState('');

  // Re-render when user ID is decoded and set
  useEffect(()=>{
    // Decode the userID from JWT local storage
    const JWTToken = localStorage.getItem('jwtToken');
    if(JWTToken){
      setRawJWT(JWTToken);
    }

    // TODO: Figure out secure way to get secret key in context here.
    if(process.env.SECRET_KEY){
      setSecretKey(process.env.SECRET_KEY);
    } else {
      setSecretKey(secret_key); // Using local hardcoded const for now as dotenv approach not working on frontend to get secret key from .env file
    }

    // Use secret key to decode the JWT 
    if(rawJWT && secretKey){
      try {
        const decodedJWT = jwt.verify(rawJWT, secret_key);
        setDecodedUserId(JSON.stringify(decodedJWT));
      } catch (error) {
        console.error('Error decoding JWT:', error);
        // Handle the error (e.g., invalid token, expired token, etc.)
      }
    }
  }, [decodedUserId, rawJWT, secretKey]);

  return (
    <div className="p-3 text-white">
      <div>MatchBox component testing decoding user ID: <h1 className="inline font-bold">{decodedUserId ? decodedUserId : 'null'}</h1></div>
      <div>raw JWT: <h1 className="inline font-bold">{rawJWT ? rawJWT : 'null'}</h1></div>
      <div>secret key: <h1 className="inline font-bold">{secretKey ? secretKey : 'null'}</h1></div>
    </div>
  )
}

export default MatchBox