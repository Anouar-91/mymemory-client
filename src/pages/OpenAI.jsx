import React, { useState } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import {callApiOpenAI } from '../services/OpenAI'

const OpenAI = () => {
    const [word, setWord] = useState('');
    const [loading, setLoading] = useState(false);

/*     const translateTextToHtml = (textOpenAi) => {
        return textOpenAi.split('\n').map((str) => `<p>${str}</p>`).join('');
    }

    const callAPI = async () => {
        setLoading(true)
        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + "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"
        }
        const data = await axios.post('https://api.openai.com/v1/completions',
            {
                prompt: `Peux tu me donner une liste de 3 phrases avec le mot anglais ${word} en anglais et leur traduction ?`,
                max_tokens: 2000,
                model: "text-davinci-003",
            },
            { headers })
            .then(response => {
                const responseTextApi = response.data.choices[0].text
                document.getElementById('resultApi').innerHTML = translateTextToHtml(responseTextApi)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })
    } */

    const test = async () => {
        console.log(await callApiOpenAI(word))
    }
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="form-group row">
                    <div className="col"><input type="text" value={word} onChange={(e) => setWord(e.currentTarget.value)} className="form-control" /></div>
                    <div className="col"> <button onClick={() => test()} className="btn btn-primary">Valider</button></div>
                </div>
            </div>
            <div className="row">
            {loading && (
                        <div className="text-center">
                            <ThreeDots
                                color="#C30028"
                                wrapperStyle={{ justifyContent: 'center' }}
                            />
                        </div>)}
                <div id="resultApi"></div>
            </div>

        </div>
    )
}

export default OpenAI