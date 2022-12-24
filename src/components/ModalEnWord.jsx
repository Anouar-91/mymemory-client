import React from 'react'
import { useNavigate } from 'react-router-dom'

function ModalEnWord({ word, handleDelete }) {
    const navigate = useNavigate();
    const update = () => {
        const myModal = document.querySelector('.btn-close');
        myModal.click()
        navigate("/update_words/" + word.id)
    }

    const addTranslation = () => {
        const myModal = document.querySelector('.btn-close');
        myModal.click()
        navigate("/add_translation/" + word.id)
    }
    const speak = ( word) => {
        const synth = window.speechSynthesis;
        var utterance = new SpeechSynthesisUtterance(word);
        utterance.voice = synth.getVoices()[33];
    
        synth.speak(utterance);
      };

    return (
        <div className="modal fade" id={"wordModal"} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{word.content}</h1> &nbsp; &nbsp;
                        <a onClick={() => speak(word.content)} className="btn btn-primary">                        
                        <i class="fa-sharp fa-solid fa-headphones"></i>
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