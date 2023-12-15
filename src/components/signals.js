import {effect, signal} from "@preact/signals-react";
import axios from "axios";

//Setting the global base url for axios
axios.defaults.baseURL = 'http://localhost:3001';

//Signal for JWT token that is itialized from the session storage.
export const jwtToken = signal(getSessionToken());

export const userInfo = signal(null);

function getSessionToken(){
    const t = sessionStorage.getItem('token');
    return t===null || t==='null' ? '' : t;
}

effect(()=>{
    sessionStorage.setItem('token', jwtToken.value);

    if(jwtToken.value.length !== 0){
        axios.get('/', {headers: {Authorization: "Bearer " + jwtToken.value}})
            .then(resp => userInfo.value = resp.data)
            .catch(error => console.log(error.message))
    }else{
        userInfo.value = null;
    }
});

/*effect(()=>{
    if(apiKey.length !== 0){
        axios.get('https://api.themoviedb.org/3/movie/popular', {headers: {Authorization: "Bearer " + apiKey}})
            .then(resp => movieInfo.value = resp.data)
            .catch(error => console.log(error.message))
    }else{
        movieInfo.value = null;
    }
});*/