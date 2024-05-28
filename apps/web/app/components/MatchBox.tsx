'use client'
// Hardcoded secret key still doesn't work due to jwt.verify throwing type mismatch errors. Will have to pass around userID after login for now.
// const secret_key = "8430b5564e42d39e724e1aa08a2723281e5120162e97ad8554111cea26bd6b76";

// TODO: Define match box component to hold entries pulled from matches collection on DB
import React, {useState, useEffect} from 'react';
import jwt from 'jsonwebtoken';
import Axios from 'axios';
import { ObjectId } from 'mongodb';
import MatchBoxItem from '../components/MatchBoxItem';

  // Define an interface for explicit TS type definition according to schema of match
interface Match{
  _id: ObjectId;
  loanerId: string,
  borrowerId: string,
  offerId: string,
  status: string
}
  

const MatchBox = () => {
  const [decodedUserId, setDecodedUserId] = useState(''); // will be pulling directly from localstorage already decoded rather than decoding using JWT
  const [rawJWT, setRawJWT] = useState('');
  const [maxPageCount, setMaxPageCount] = useState(0); // for pagination
  const [fetchedMatches, setFetchedMatches] = useState<Match[]>([]); // To hold raw api response
  //const [secretKey, setSecretKey] = useState('');

  // Re-render when user ID is decoded and set
  useEffect(()=>{
    // Grab the JWT from local storage
    const JWTToken = localStorage.getItem('jwtToken');
    if(JWTToken){
      setRawJWT(JWTToken);
    }

    // // TODO: Figure out secure way to get secret key in context here.
    // if(process.env.SECRET_KEY){
    //   setSecretKey(process.env.SECRET_KEY);
    // } else {
    //   setSecretKey(secret_key); // Using local hardcoded const for now as dotenv approach not working on frontend to get secret key from .env file
    // }

    // // Use secret key to decode the JWT 
    // if(rawJWT && secretKey){
    //   try {
    //     const decodedJWT = jwt.verify(rawJWT, secret_key);
    //     setDecodedUserId(JSON.stringify(decodedJWT));
    //   } catch (error) {
    //     console.error('Error decoding JWT:', error);
    //     // Handle the error (e.g., invalid token, expired token, etc.)
    //   }
    // }

    // Pull user ID from local storage, should be stored there after login
    const pulledId = localStorage.getItem('loggedInUserId');
    if(pulledId){
      setDecodedUserId(pulledId);
    }

    const fetchMatches= () => {
      Axios.get('http://localhost:4040/api/loan-service/matches/', { headers: {'content-type': 'application/json', "Authorization" : `Bearer ${JWTToken}`}})
        .then((res) => {
          // console.log('full response of offers: ', res);
          // console.log('Got offers res on front-end:', res.data);
          setFetchedMatches(res.data);
          setMaxPageCount(Math.ceil(res.data.length / 6)); // set max page count based on groups of 6
        })
        .catch((error) => {
          console.error('Error fetching offers on front-end:', error.message);
        });
    }

    fetchMatches();
  }, []);

  useEffect(()=>{
    console.log("matches? ")
    console.log(fetchedMatches);
  }, [fetchedMatches])

  return (
    <>
      <div className= "text-white p-3">MatchBox component testing grabbing user ID: <h1 className="inline font-bold">{decodedUserId ? decodedUserId : 'null'}</h1></div>
      <div className="p-3 text-white flex justify-center">
        <ul id="matches-offers" className="h-[95%]  w-1/5 shadow-sm flex flex-col items-center relative">
          {/* Map all the loaded entries data into list items */}
          {fetchedMatches.map(match => 
            <MatchBoxItem match={match}/>
          )}
        </ul>
      </div>
    </>
  )
}

export default MatchBox