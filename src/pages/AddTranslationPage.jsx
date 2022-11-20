import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Field from "../components/forms/field";
import WordAPI from "../services/WordAPI";
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner'

function AddTranslationPage(props) {
    const navigate = useNavigate();
    const [enWord, setEnWord] = useState()
    const [frWord, setFrWord] = useState("")
    const [loading, setLoading] = useState(true)
    let { id } = useParams();

    const fetchEnWord = async () => {
        const data = await WordAPI.find(id)
        setEnWord(data);
        setLoading(false)
    }

    useEffect(() => {
        fetchEnWord()
    })

    const handleChange = (e) => {
        const { value } = e.currentTarget;
        setFrWord(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const wordTrim = frWord.replace('’', "'").trim()
            await WordAPI.addFrTranslation(wordTrim, id)
            toast.success("Registered successfully")
            setFrWord("")
            navigate("/en_words");
            setLoading(false)
        } catch (error) {
            toast.error("Error")
            setLoading(false)
        }
    }

    return (
        <>
            <div className="container">
                {loading ? (
                    <div className="text-center">
                        <ThreeDots
                            color="#C30028"
                            wrapperStyle={{ justifyContent: 'center' }}
                        />
                    </div>
                ) : (
                    <>
                        <div className="title-primary mt-3 mb-4">
                            Add translation
                        </div>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className="mt-3">
                                    <Field required value={frWord}
                                        className="input-shadow"
                                        onChange={handleChange}
                                        name="frWord"
                                        placeholder="French word">
                                    </Field>
                                </div>

                                <div className="mt-3 text-center">
                                    <button className="btn btn-primary">Save</button>
                                </div>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default AddTranslationPage