import React, { useEffect, useState } from 'react';
import Quiz from '../services/Quiz';
import { ThreeDots } from 'react-loader-spinner';
import InputQuestionWord from "../components/forms/InputQuestionWord";
import WordAPI from '../services/WordAPI';
import illustration from '../assets/img/frWordQuiz-illustration.png';
import successIllustration from '../assets/img/success-illustration.png'
import failureIllustration from '../assets/img/failure-illustration.png'
import {  useNavigate, useParams , useSearchParams} from 'react-router-dom';
import { toast } from 'react-toastify';


function QuizFrWordPage() {
    const navigate = useNavigate();
    const [randomEnWord, setRandomEnWord] = useState()
    const [loading, setLoading] = useState(true);
    const [answer, setAnswer] = useState([]);
    const [formHide, setFormHide] = useState(false);
    const [errors, setErrors] = useState();
    const [success, setSuccess] = useState();
    const [queryParameters] = useSearchParams();
    const lowsuccess = queryParameters.get("lowsuccess") ? true : false;


    const fetchRandomEnWord = async () => {
        let data ;
        if(lowsuccess){
            console.log(true)
            data = await Quiz.generateRandomEnWord("lowsuccess");
        }else{
            console.log(false)
          data = await Quiz.generateRandomEnWord();
        }
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
            if (answer[enWord.id].toLowerCase().replace('’', "'").trim() === enWord.content.toLowerCase().trim()) {
                ok = true;
                successArray.push(enWord);
                successIdArray.push(enWord.id)
            }
            /* enWord.frWords.forEach((frWord, index) => {
                if (frWord.content.toLowerCase() === answer[enWord.id].toLowerCase().trim()) {
                    ok = true;
                    successArray.push(enWord);
                    successIdArray.push(enWord.id)
                }
            }) */
            if (!ok) {
                errorArray.push(enWord);
                errorIdArray.push(enWord.id)
            }
        })
        try {
            await WordAPI.incrementError(errorIdArray);
            await WordAPI.incrementSuccess(successIdArray);
        } catch (error) {
            if (error.response.status == 401) {
                toast.error("You are no longer connected!")
                navigate("/login");
              }else{
                toast.error("Error !")
              }
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
            <div className="container mt-3">

                <div className="title-primary mt-3 mb-4">
                    <div className="d-flex align-items-center justify-content-between-centers">
                        <div className="col-8">
                            Quiz French Word
                        </div>
                        <div className="col-4">
                            <img src={illustration} alt="illustration" className="img-fluid w-25" />
                        </div>
                    </div>

                </div>
                <div className={formHide ? "d-none" : "mt-5 mb-5"}>
                    {loading ? (
                        <ThreeDots
                            color="#C30028"
                            wrapperStyle={{ justifyContent: 'center' }}
                        />
                    ) : (
                        <>
                            <div className="row align-items-center">
                                <div className="col-md-6">
                                    <form onSubmit={handleSubmit}>
                                        {randomEnWord.map((enWord, index) => {
                                            return (
                                                <>
                                                    <div key={index} className="mt-3">
                                                        <InputQuestionWord required value={answer[enWord.id]}
                                                            mode="fr"
                                                            onChange={handleChange}
                                                            name={enWord.id}
                                                            label={enWord.frWords.length > 1 ? (
                                                                enWord.frWords.map(frWord => {
                                                                    return (
                                                                        frWord.content + " / "
                                                                    )
                                                                })
                                                            ) : (enWord.frWords[0].content)}
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
                                </div>
                                <div className="col-md-6 d-none d-md-block text-center">
                                    <img src={illustration} alt="illustration" className="img-fluid" />
                                </div>
                            </div>

                        </>
                    )
                    }
                </div>
                {formHide &&
                    <>
                        <div className="row mb-3 justify-content-center">
                            <div className="col-md-5 mt-3 text-center" >
                                <div className="card-primary">
                                    <h3 className="text-danger">List of errors</h3>
                                    {errors.map((error, index) => {
                                        return (
                                            <p key={index}><strong>{error.frWords.length > 1 ? (
                                                error.frWords.map(frWord => {
                                                    return (
                                                        frWord.content + " / "
                                                    )
                                                })
                                            ) : (error.frWords[0].content)}</strong>, <br /> vous avez écris : <span className="text-danger">{answer[error.id].toLowerCase()}</span> , <br />
                                                au lieu de {error.content}
                                            </p>
                                        )
                                    })}
                                    <img src={failureIllustration} alt="illustration" className="img-fluid" />

                                </div>

                            </div>
                            <div className="col-md-5 mt-3 text-center">
                                <div className="card-primary">
                                    <h3 className="text-success">List of success</h3>
                                    {success.map((word, index) => {
                                        return (
                                            <p key={index}>{word.content}</p>
                                        )

                                    })}
                                    <img src={successIllustration} alt="illustration" className="img-fluid" />
                                </div>

                            </div>
                        </div>
                        <div className="text-center mt-4">
                            <button onClick={() => restart()} className="btn btn-primary mb-5">Restart</button>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default QuizFrWordPage