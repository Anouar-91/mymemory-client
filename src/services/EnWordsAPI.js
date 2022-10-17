import axios from "axios";
import Cache from './Cache'
import {API_URL} from './Config'


async function findAll(){
    const cachedEnWords = await Cache.get('enWords');
    if(cachedEnWords){
        return cachedEnWords;
    } 
    
    return axios.get(API_URL + 'en_words')
      .then(response =>{
        const enWords = response.data["hydra:member"];
        Cache.set("enWords", enWords);
        return enWords
      } );
}


function deleteCustomer(id){
    return axios.delete(API_URL + 'en_words/' + id).then(async response => {
        const cachedEnWords = await Cache.get('enWords');
        if(cachedEnWords){
            Cache.set("enWords", cachedEnWords.filter(word => word.id !== id));
        }
        return response
    })
}

function find(id){
   return axios.get(API_URL + `en_words/${id}`).then((response) => {
        return response.data;
   });
}

function create(words){
    return axios.post(API_URL + "en_fr_words/add", words).then(async response => {
        const cachedEnWords = await Cache.get('enWords');
        console.log('je suis avant')

        if(cachedEnWords){
            console.log('je suis dans le ache')
            Cache.set("enWords", [...cachedEnWords, response.data]);
        }
        return response

    })
}

function update(id, customer){
    return axios.put(API_URL + "customers/" + id, customer).then(async response => {
        const cachedCustomers = await Cache.get('customers');
        if(cachedCustomers){
            const index = cachedCustomers.findIndex(c => c.id === +id);
            cachedCustomers[index] = response.data;
            Cache.set("customers",cachedCustomers );
        }
        return response
    })
}

export default {
    findAll,
    delete: deleteCustomer,
    find,
    create, 
    update
}