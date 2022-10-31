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
            await WordAPI.addFrTranslation(frWord, id)
            toast.success("Registered successfully")
            setFrWord("")
            navigate("/en_words");
            setLoading(false)


        } catch (error) {
            console.log(error)
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
                            height="80"
                            width="80"
                            radius="9"
                            color="#0d6efd"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{ marginLeft: '50%', transform: 'translateX(-10%)' }}
                            wrapperClassName=""
                            visible={true}
                        />
                    </div>

                ) : (
                    <>
                        <div className="title-primary mt-3 mb-4">
                            Add translation
                        </div>
                        <div >

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
                )

                }



            </div>
        </>
    )
}

export default AddTranslationPage