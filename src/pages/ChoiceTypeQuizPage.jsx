import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import enWordQuestion from '../assets/img/enWordQuestion.png'
import frWordQuestion from '../assets/img/frWordQuestion.png'
import ModalChoiceListWord from '../components/ModalChoiceListWord';

function ChoiceTypeQuizPage() {
    const navigate = useNavigate();

    const handleClick = (to) => {
        const myModal = document.querySelectorAll('.btn-close');
        myModal.forEach(modal => modal.click())
        navigate(to);
    }
    return (
        <>
            <div className="container mb-5">
                <div className="title-primary mt-3 mb-4">
                    Quiz Word : Choose a mode
                </div>
                <div className="row">
                    <div className="col-md-6 mt-3">
                        <div className="position-relative">

                        </div>
                        <div className="card-shadow text-center">
                            <h2>English to french</h2>
                            <div className="d-flex align-items-center">
                                <div className="col-3">
                                    <img src={enWordQuestion} alt="illustration" className="img-fluid w-75" />
                                </div>
                                <div className="col-9">
                                    <p>In this mode you have to translate english words into french.</p>
                                </div>
                            </div>
                            <button   type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#chooseListWordEn">
                                Select
                            </button>

                        </div>
                    </div>
                    <div className="col-md-6 mt-3">
                        <div className="card-shadow text-center">
                            <h2>French to english</h2>
                            <div className="d-flex align-items-center">
                                <div className="col-3">
                                    <img src={frWordQuestion} alt="illustration" className="img-fluid w-75" />
                                </div>
                                <div className="col-9">
                                    <p>In this mode you have to translate french words into english.</p>
                                </div>
                            </div>
                            <button   type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#chooseListWordFr">
                                Select
                            </button>

                        </div>
                    </div>
                </div>

            </div>
            <ModalChoiceListWord  handleClick={handleClick} to="/quiz_fr_words" id="chooseListWordFr" title="French to english" />
            <ModalChoiceListWord handleClick={handleClick} to="/quiz_en_words" id="chooseListWordEn" title="English to french"/>

        </>
    )
}

export default ChoiceTypeQuizPage