import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {API_URL} from './Config'

function authenticate(credentials) {
    return axios
        .post(API_URL + "login_check", credentials)
        .then(response => {
            // je stock mon token dans le local storage
            const token = response.data.token;
            window.localStorage.setItem('authToken', token)
            // je change le head de nos requete http en ajoutant le token
            axios.defaults.headers["Authorization"] = "Bearer " + token;
        })
}

function logout() {
    window.localStorage.removeItem('authToken')
    delete axios.defaults.headers["Authorization"];
}

function setup() {
    // on check si on a un token
    const token = window.localStorage.getItem('authToken');
    //on check qu'on a bien un token et que la date est valide
    if (token) {
        const jwtData = jwtDecode(token);
        if (jwtData.exp * 1000 > (new Date().getTime())) {
            axios.defaults.headers["Authorization"] = "Bearer " + token;

        } else {
            logout()
        }
    } else {
        logout()
    }
}

function isAuthenticated() {
    const token = window.localStorage.getItem('authToken');
    if (token) {
        const jwtData = jwtDecode(token);
        if (jwtData.exp * 1000 > (new Date().getTime())) {
            return true;

        } else {
            return false;
        }
    } else {
        return false;
    }
}

export default {
    authenticate,
    logout,
    setup,
    isAuthenticated
}

