import WordAPI from './WordAPI';


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

async function  generateRandomEnWord(){
    const enWords = await WordAPI.findAll();
    const max = enWords.length > 10 ? 10 : enWords.length;
    let questions = [];
    let arrayRandom = [];
    
    for(let i = 0; i < max; i++) {

        let nbRandom = getRandomInt(enWords.length)
        if(arrayRandom.includes(nbRandom) || enWords[nbRandom].frWords.length < 1){
            i--
        }else{
            arrayRandom.push(nbRandom);
            questions.push(enWords[nbRandom])
        }
    }
     return questions;
}

export default {
    generateRandomEnWord
}