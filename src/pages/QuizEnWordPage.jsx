import React, { useEffect, useState } from 'react';
import Quiz from '../services/Quiz';
import { ThreeDots } from 'react-loader-spinner';
import InputQuestionWord from "../components/forms/InputQuestionWord";
import WordAPI from '../services/WordAPI';


function QuizEnWordPage() {
    const [randomEnWord, setRandomEnWord] = useState()
    const [loading, setLoading] = useState(true);
    const [answer, setAnswer] = useState([]);
    const [formHide, setFormHide] = useState(false);
    const [errors, setErrors] = useState();
    const [success, setSuccess] = useState();

    const fetchRandomEnWord = async () => {
        const data = await Quiz.generateRandomEnWord();
        setRandomEnWord(data)
        let table = {}
        data.forEach(word => {
            table[word.id] = ""
        })
        setAnswer(table);
        setLoading(false);
    }
    useEffect(() => {
        fetchRandomEnWord()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setAnswer({
            ...answer,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        let successArray = [];
        let errorArray = [];
        let errorIdArray = [];
        let successIdArray = [];
        randomEnWord.forEach((enWord, index) => {
            let ok = false;
            enWord.frWords.forEach((frWord, index) => {
                if (frWord.content.toLowerCase() === answer[enWord.id].toLowerCase().trim()) {
                    ok = true;
                    successArray.push(enWord);
                    successIdArray.push(enWord.id)
                }
            })
            if (!ok) {
                errorArray.push(enWord);
                errorIdArray.push(enWord.id)
            }
        })
        try {
            await WordAPI.incrementError(errorIdArray);
            await WordAPI.incrementSuccess(successIdArray);
        } catch (error) {
            console.log(error)
        }
  
        setErrors(errorArray);
        setSuccess(successArray);
        setFormHide(true)
    }

    const restart = () => {
        setLoading(true)
        setFormHide(false)
        setErrors();
        setSuccess();
        fetchRandomEnWord();
    }

    return (
        <>
            <div className="text-center">
                <h1>Quiz English Word</h1>
            </div>
            <div className={formHide ? "d-none" : "card mt-5 mb-5"}>
                {loading ? (
                    <ThreeDots
                        height="80"
                        width="80"
                        radius="9"
                        color="#0d6efd"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{ marginLeft: '50%', transform: 'translateX(-10%)' }}
                        wrapperClassName=""
                        visible={true}
                    />
                ) : (
                    <>
                        <form onSubmit={handleSubmit}>
                            {randomEnWord.map((enWord, index) => {
                                return (
                                    <>
                                        <div key={index} className="mt-3">
                                            <InputQuestionWord required value={answer[enWord.id]}
                                                onChange={handleChange}
                                                name={enWord.id}
                                                label={enWord.content}
                                                placeholder="Your answer">
                                            </InputQuestionWord>
                                        </div>
                                    </>
                                )
                            })}
                            <div className="text-center mt-4">
                                <button className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </>
                )
                }
            </div>
            {formHide &&
                <>
                    <div className="row mb-3 justify-content-center">
                        <div className="col-md-5 mt-3 text-center" >
                            <div className="card">
                                <h3 className="text-danger">List of errors</h3>
                                {errors.map((error, index) => {
                                    return (
                                        <p key={index}><strong>{error.content}</strong>, <br /> vous avez écris : <span className="text-danger">{answer[error.id].toLowerCase()}</span> , <br />
                                            au lieu de {error.frWords.map((word, index) => { return (<> <span className="text-success">{word.content} </span> {error.frWords[index + 1] && "ou "}</>) })}
                                        </p>
                                    )
                                })}
                            </div>

                        </div>
                        <div className="col-md-5 mt-3 text-center">
                            <div className="card">
                                <h3 className="text-success">List of success</h3>
                                {success.map((word, index) => {
                                    return (
                                        <p key={index}>{word.content}</p>
                                    )

                                })}

                            </div>

                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <button onClick={() => restart()} className="btn btn-primary mb-5">Restart</button>
                    </div>
                </>
            }
        </>
    )
}

export default QuizEnWordPage