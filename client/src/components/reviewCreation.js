import React, {useState} from "react";
import axios from "axios";
import {jwtToken} from './Signals';

export default function ReviewsC(){
    const [username, setUsername] = useState([]);
    const [revtext, setRevtext] = useState([]);
    const [rating, setRating] = useState([]);
    const [targetid, setTargetid] = useState([]);
    
   /* function CreateReview(){
        axios.postForm('/review', {username, revtext, rating, targetid})
            .then(resp => jwtToken.value = resp.data)
            .catch(error => console.log(error.message))
    }
    */
    const  CreateReview = async () => {
        try {
          const token = sessionStorage.getItem('token');
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          console.log();
          await axios.post(`http://localhost:3001/review`, {username, revtext, rating, targetid}, config);
        } catch (error) {
          console.error("Error joining group:", error.message);
        }
      };

    return(
            <body>
                <div>
                <p>{'Give your username: '}<input onChange={e => setUsername(e.target.value)}/></p>
                <p>{'What is the ID of the movie? '}<input onChange={e => setTargetid(e.target.value)}/></p>
                <p>{'Type in your review: '}<input onChange={e => setRevtext(e.target.value)}/></p>
                <p>{'What rating would you like to give for this movie? (0-5)'}<input onChange={e => setRating(e.target.value)}/></p><br/>
                <button onClick={CreateReview}>Send Review</button><br/>

                <a href="reviews" target="_self"className="styled-link">See all reviews</a><br/>
                <a href="movies" target="_self"className="styled-link">See popular movies</a>
            </div>
        </body>
    )
}