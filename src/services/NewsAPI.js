import axios from "axios";
import {API_URL} from './Config'


async function findAll(){

    return axios.get(API_URL + '?order[createdAt]')
      .then(response =>{
        const news = response.data["hydra:member"];
        return news
      } );
}



export default {
    findAll,

}