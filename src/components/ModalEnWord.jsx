import React, { useState } from 'react'
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom'
import VoiceSelector from './VoiceSelector';
import { callApiOpenAI } from '../services/OpenAI';
import { useEffect } from 'react';

function ModalEnWord({ word, handleDelete }) {
    const [loading, setLoading] = useState()
    const [textValue, setTextValue] = useState('');
    const [selectedVoice, setSelectedVoice] = useState(0);
    const navigate = useNavigate();
    const update = () => {
        const myModal = document.querySelector('.btn-close');
        myModal.click()
        navigate("/update_words/" + word.id)
    }
    useEffect(() => {
        document.getElementById('resultApi').innerHTML = "" 
    },[word])
    const generateSentance = async () => {
        setLoading(true)
        try {
            const data = await callApiOpenAI(word.content)
            setLoading(false)
            document.getElementById('resultApi').innerHTML = data

        } catch (error) {
            setLoading(false)
            console.log(error)
        }

    }

    const addTranslation = () => {
        const myModal = document.querySelector('.btn-close');
        myModal.click()
        navigate("/add_translation/" + word.id)
    }
    const speak = (word) => {
        const synth = window.speechSynthesis;
        var utterance = new SpeechSynthesisUtterance(word);
        utterance.voice = synth.getVoices()['en-US'];
        utterance.lang = 'en-US';
        synth.speak(utterance);
    };

    return (
        <div className="modal fade" id={"wordModal"} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{word.content}</h1> &nbsp; &nbsp;
                        <a onClick={() => speak(word.content)} className="btn btn-primary">
                            <i className="fa-sharp fa-solid fa-headphones"></i>
                        </a>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <strong>In french is : </strong> <br />
                        <ul>
                            {word.frWords.map(frWord =>
                                <li key={frWord.id}>{frWord.content}</li>
                            )}
                        </ul>
                        <hr />
                        <p><span className="text-danger">Error :</span> {word.nbError}</p>
                        <p><span className="text-success">Success :</span> {word.nbSuccess}</p>
                        <hr />
                        <div className="text-center">
                            {loading ? (
                                <div className="text-center">
                                    <ThreeDots
                                        color="#C30028"
                                        wrapperStyle={{ justifyContent: 'center' }}
                                    />
                                </div>
                            ) : (
                                <div className='text-center'>
                                    <button
                                        onClick={() => generateSentance()}
                                        className="btn btn-sm btn-primary">
                                        Generate me example sentences
                                    </button>
                                </div>
                            )}
                            <div id="resultApi"></div>
                        </div>

                    </div>


                    <div className="modal-footer d-flex justify-content-space-around">
                        <button
                            onClick={() => handleDelete(word.id)}

                            className="btn btn-sm btn-danger"><i className="fa-solid fa-trash-can"></i> Delete
                        </button>
                        <button
                            onClick={() => update()}
                            to={"/update_words/" + word.id}

                            className="btn btn-sm btn-warning"><i className="fa-solid fa-pen-to-square"></i> Update
                        </button>
                        <button
                            onClick={() => addTranslation()}
                            className="btn btn-sm btn-primary">Add translation
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalEnWord