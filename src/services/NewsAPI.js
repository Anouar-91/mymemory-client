import axios from "axios";
import {API_URL} from './Config'


async function findAll(){

    return axios.get(API_URL + 'news/?order[createdAt]')
      .then(response =>{
        const news = response.data["hydra:member"];
        return news
      } );
}

async function getLength(){

    return axios.get(API_URL + 'news/length')
      .then(response =>{
        return response.data
      } );
}
async function getASlice(id){
    let url = 'news/slice';
    if(id!=null){
      url = 'news/slice?id=' + id
    }
    return axios.get(API_URL + url)
      .then(response =>{
        const news = response.data["hydra:member"];
        return news
      } );
}



export default {
    findAll,
    getASlice,
    getLength

}