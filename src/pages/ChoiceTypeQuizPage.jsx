import React from 'react'
import { Link } from 'react-router-dom'

function ChoiceTypeQuizPage() {
    return (
        <>
            <h1 className="text-center">Choisis un mode : </h1>
            <div className="row mt-5 justify-content-center">
                <div className="col-md-4">
                    <div className="card mb-3" >
                    <div className="card-header text-primary text-center h4"><strong>English to french</strong></div>
                        <div className="card-body">
                            <h5 className="card-title">Rules</h5>
                            <p className="card-text">In this mode you have to translate english words into french.</p>
                        </div>
                        <div className="card-footer text-center">
                            <Link to="/quiz_en_words" className="btn btn-primary">Select</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mb-3" >
                        <div className="card-header text-primary text-center h4"><strong>French to english</strong></div>
                        <div className="card-body">
                            <h5 className="card-title">Rules</h5>
                            <p className="card-text">In this mode you have to translate french words into english.</p>
                        </div>
                        <div className="card-footer text-center">
                        <Link to="/quiz_fr_words" className="btn btn-primary">Select</Link>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ChoiceTypeQuizPage