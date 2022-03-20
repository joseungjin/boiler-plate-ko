import { LOGIN_USER } from "./types";
import axios from "axios";

export function loginUser(dataToSubmit){
    console.log(dataToSubmit);
    const request = axios.post('/api/users/login',dataToSubmit)
    .then(response =>response.data)

    return{
        type:LOGIN_USER,
        payload:request
    }
}