import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Field from "../components/forms/field";
import WordAPI from "../services/WordAPI";
import { toast } from 'react-toastify';
import addWordIllustration from '../assets/img/addWord-illustration.png';
import { ThreeDots } from 'react-loader-spinner'

function AddEnWordPage(props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isShare, setIsShare] = useState(false)
    const [words, setWords] = useState({
        enWord: "",
        frWord: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setWords({
            ...words,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const enWordCopy = words.enWord.replace('’', "'").trim()
        const frWordCopy = words.frWord.replace('’', "'").trim()
        setWords({
            enWord: enWordCopy,
            frWord: frWordCopy
        })
        try {
            await WordAPI.create(words, isShare)
            toast.success("Registered successfully")
            setWords({
                enWord: "",
                frWord: ""
            })
            setLoading(false)
            navigate("/en_words");
        } catch (error) {
            console.log(error.response.status)
            setLoading(false)
            if (error.response.status == 422) {
                toast.error("This word is already in your list");
            } else if (error.response.status == 401) { 
                toast.error("you are no longer connected!")
                navigate("/login");
            } else {
                toast.error("Error")
            }
        }
    }

    return (
        <>
            <div className="container">
                <div className="title-primary mt-3 mb-4">
                    Add a new word
                </div>
                <div className="row justify-content-center align-items-center">
                    {loading ? (
                        <div className="text-center">
                            <ThreeDots
                                color="#C30028"
                                wrapperStyle={{ justifyContent: 'center' }}
                            />
                        </div>
                    ) : (
                        <>
                            <div className="col-md-6 mt-3">
                                <form onSubmit={handleSubmit}>
                                    <Field required value={words.enWord}
                                        className="input-shadow"
                                        onChange={handleChange}
                                        name="enWord"

                                        placeholder="English word">
                                    </Field>
                                    <div className="mt-3">
                                        <Field required value={words.frWord}
                                            className="input-shadow"
                                            onChange={handleChange}
                                            name="frWord"

                                            placeholder="French word">
                                        </Field>
                                    </div>
                                    <div className="form-check mt-3">
                                        <input className="form-check-input" type="checkbox" value={isShare} onChange={(e) => setIsShare(e.target.checked)} id="flexCheckDefault" />
                                        <label className="form-check-label" for="flexCheckDefault">
                                            share your word with the community MyMemory
                                        </label>
                                    </div>
                                    <div className="mt-3 text-center">
                                        <button className="btn btn-primary">Save</button>
                                    </div>
                                </form>

                            </div>
                            <div className="col-md-6 text-center mt-3">
                                <img src={addWordIllustration} className="img-fluid w-75" alt="illustration" />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default AddEnWordPage