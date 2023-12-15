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

    return (
      <body>
        <div className='reviewlist'>
          <ul>
            {reviews.map((r) => (
              <li key={r.idreview}>
                <h3>{'Reviewer: ' + r.username}</h3>
                <p><strong>Review:</strong> {r.revtext}</p>
                <p><strong>Movie ID:</strong> {r.targetid}</p>
                <p><strong>Review ID:</strong> {r.idreview}</p>
                <p><strong>Rating:</strong> {r.rating}</p><br/>
              </li>
            ))}
          </ul>
        </div>
      </body>
    );

    /*function deleteReview(reid){
      axios.delete('/review')
      .then(resp => {})
      .catch(error => console.log(error.message));
      return(reid)
    }*/
  }
