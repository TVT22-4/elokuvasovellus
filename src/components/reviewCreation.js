import React, {useState} from "react";
import axios from "axios";
import {jwtToken} from './signals';

export default function ReviewsC(){
    const [username, setUsername] = useState([]);
    const [revtext, setRevtext] = useState([]);
    const [rating, setRating] = useState([]);
    const [targetid, setTargetid] = useState([]);
    
    function CreateReview(){
        axios.postForm('/review', {username, revtext, rating, targetid})
            .then(resp => jwtToken.value = resp.data)
            .catch(error => console.log(error.message))
    }
    
    return(
            <div>
                <p>{'Give your username: '}<input onChange={e => setUsername(e.target.value)}/></p>
                <p>{'What is the ID of the movie? '}<input onChange={e => setTargetid(e.target.value)}/></p>
                <p>{'Type in your review: '}<input onChange={e => setRevtext(e.target.value)}/></p>
                <p>{'What rating would you like to give for this movie? (0-5)'}<input onChange={e => setRating(e.target.value)}/></p>
                <button onClick={CreateReview}>Send Review</button><br/>

                <a href="reviews" target="_self">See all reviews</a><br/>
                <a href="movies" target="_self">See popular movies</a>
            </div>
    )
}
