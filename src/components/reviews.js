import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = 'http://localhost:3001';

export default function Reviews(){
    const [reviews, setReviews] = useState([]);

    useEffect(()=>{
        axios.get('/review/all')
            .then(resp =>{setReviews(resp.data)})
            .catch(error => console.log(error.message));
    },[]);

        return(
          <div>
            <ul>
              {
                reviews.map((r) => (
                  <li key={r.idreview}>
                    <h4>{'Reviewer: ' + r.username}</h4>
                    <p>{'Review: ' + r.revtext}</p>
                    <p>{'Rating: ' + r.rating}</p>
                    <p>{'Movie ID: ' + r.targetid}</p>
                    <p>{'Review ID: ' + r.idreview}</p><br/>
                  </li>
                ))
              }
            </ul>
          </div>
        );
    

    function deleteReview(reid){
      axios.delete('/review')
      .then(resp => {})
      .catch(error => console.log(error.message));
      return(reid)
    }

    function ReviewInfo({username, revtext, rating, moid, reid}){
      return(
        <div>
          <h4>{'Reviever: ' + username + ' ID: ' + reid}</h4>
          <p>{'Review: ' + revtext}</p>
          <p>{'Rating: ' + rating}</p>
          <p>{'ID of the movie: ' + moid}</p>
          <button onClick={deleteReview()}>Remove review</button><br/><br/>
        </div>
      )
    }
  }

