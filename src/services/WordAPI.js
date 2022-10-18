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
function addFrTranslation(word, id){
    return axios.post(API_URL + "fr_words", {
        content: word,
        enWord: "/api/en_words/"+ id
    }).then(async response => {
        const cachedEnWords = await Cache.get('enWords');

        if(cachedEnWords){
            const index = cachedEnWords.findIndex(w => w.id === +id);
            const newWord = await find(id);
            cachedEnWords[index] = newWord;
            Cache.set("enWords",cachedEnWords );

        }
        return response

    })
}

function update(word){
    return axios.put(API_URL + "en_words/" + word.id, {content:word.content}).then(async response => {
        const cachedEnWords = await Cache.get('enWords');
        if(cachedEnWords){
            const index = cachedEnWords.findIndex(w => w.id === +word.id);
            cachedEnWords[index] = response.data;
            Cache.set("enWords",cachedEnWords );
        }
        return response
    }).catch(error =>console.log(error))
}

function updateFrWord(id, word){
    console.log(word, "je suis EnWordAPI")
    return axios.put(API_URL + "fr_words/" +id, {content:word}).then(async response => {
        const cachedEnWords = await Cache.get('enWords');
        if(cachedEnWords){
            const enWord = await find(response.data.enWord.id);
            const index = cachedEnWords.findIndex(w => w.id === enWord.id);
            cachedEnWords[index] = enWord;
            Cache.set("enWords",cachedEnWords );
        }
        return response
    }).catch(error =>console.log(error))
}

export default {
    findAll,
    delete: deleteCustomer,
    find,
    create, 
    update,
    addFrTranslation,
    updateFrWord
}