import axios from "axios";
import {API_URL} from './Config'

function register(user){
    return axios.post(API_URL + "users", user);
}

export default {
    register
}