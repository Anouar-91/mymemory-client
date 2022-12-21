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

async function getRate(){
    const enWords = await findAll();
    let countError = 0;
    let countSuccess = 0;
    let result = 0;
    enWords.forEach((word) => {
        countError = countError + word.nbError;
        countSuccess = countSuccess + word.nbSuccess;
    })
    let count = countError + countSuccess;
    if(count > 0){
        result = countSuccess / count
    }
    console.log(countError, "error")
    console.log(countSuccess, "success")
    return Math.round(result * 100);
}


function deleteEnWord(id){
    return axios.delete(API_URL + 'en_words/' + id).then(async response => {
        const cachedEnWords = await Cache.get('enWords');
        if(cachedEnWords){
            Cache.set("enWords", cachedEnWords.filter(word => word.id !== id));
        }
        return response
    })
}
function deleteFrWord(idFr, idEn){
    return axios.delete(API_URL + 'fr_words/' + idFr).then(async response => {
        const cachedEnWords = await Cache.get('enWords');
        if(cachedEnWords){
            const enWord = await find(idEn);
            const index = cachedEnWords.findIndex(w => w.id === idEn);
            cachedEnWords[index] = enWord;
            Cache.set("enWords",cachedEnWords );
        }
        return response
    })
}

function find(id){
   return axios.get(API_URL + `en_words/${id}`).then((response) => {
        return response.data;
   });
}
function lowSuccess(limit = null){
    
   return axios.get(API_URL + `en_words/low-success?${limit != null && "limit=" + limit  }`).then((response) => {
        return response.data["hydra:member"];
   });
}

function create(words, isShare= false){
    return axios.post(API_URL + "en_fr_words/add", {
        enWord: words.enWord.replace('’', "'").trim(),
        frWord: words.frWord.replace('’', "'").trim(),
        isShare
    }).then(async response => {
        const cachedEnWords = await Cache.get('enWords');
        if(cachedEnWords){
            Cache.set("enWords", [response.data, ...cachedEnWords]);
        }
        return response

    })
}
function addFrTranslation(word, id){
    return axios.post(API_URL + "fr_words", {
        content: word.replace('’', "'").trim(),
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
    return axios.put(API_URL + "en_words/" + word.id, {content:word.content.replace('’', "'").trim()}).then(async response => {
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
    return axios.put(API_URL + "fr_words/" +id, {content:word.replace('’', "'").trim()}).then(async response => {
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

function incrementError(arrayIdError){
    return axios.post(API_URL + "en_words_increment/error", {enWords:arrayIdError}).then(async response => {
        const cachedEnWords = await Cache.get('enWords');
        if(cachedEnWords){
            arrayIdError.forEach((id) => {
                const index = cachedEnWords.findIndex(w => w.id === id);
                cachedEnWords[index] = {
                    ...cachedEnWords[index], 
                    nbError: cachedEnWords[index].nbError + 1
                } ;
            })

            Cache.set("enWords",cachedEnWords );
        }
        return response
    }).catch(error =>console.log(error))
}

function incrementSuccess(arrayIdSucces){
    console.log(arrayIdSucces, "arrayIdSuccess");
    return axios.post(API_URL + "en_words_increment/success", {enWords:arrayIdSucces})
    .then(async response => {
        const cachedEnWords = await Cache.get('enWords');
        if(cachedEnWords){
            arrayIdSucces.forEach((id) => {
                const index = cachedEnWords.findIndex(w => w.id === id);
                cachedEnWords[index] = {
                    ...cachedEnWords[index], 
                    nbSuccess: cachedEnWords[index].nbSuccess + 1
                } ;
            })

            Cache.set("enWords",cachedEnWords );
        }
        return response
    })
    .catch(error =>console.log(error))
}

export default {
    findAll,
    delete: deleteEnWord,
    deleteFrWord,
    find,
    create, 
    update,
    addFrTranslation,
    updateFrWord,
    incrementError,
    incrementSuccess,
    getRate,
    lowSuccess
}