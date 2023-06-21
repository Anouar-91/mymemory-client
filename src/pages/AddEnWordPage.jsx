import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Field from "../components/forms/field";
import WordAPI from "../services/WordAPI";
import { toast } from 'react-toastify';
import addWordIllustration from '../assets/img/addWord-illustration.png';
import { ThreeDots } from 'react-loader-spinner'

function AddEnWordPage(props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isShare, setIsShare] = useState(false);
    const [addFrDescription, setAddFrDescription] = useState(false);
    const [addEnDescription, setAddEnDescription] = useState(false);
    const [btnEnDescripton, setBtnEnDescripton] = useState("Add a description");
    const [btnFrDescripton, setBtnFrDescripton] = useState("Ajouter une description");
    const [words, setWords] = useState({
        enWord: "",
        frWord: "",
        enDescription: "",
        frDescription: ""
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
        setWords({
            enWord: words.enWord,
            frWord: words.frWord,
            frDescription: words.frDescription,
            enDescription: words.enDescription
        })
        try {
            await WordAPI.create(words, isShare)
            toast.success("Registered successfully")
            setWords({
                enWord: "",
                frWord: "",
                frDescription: "",
                enDescription:""
            })

            setLoading(false)
            navigate("/en_words");
        } catch (error) {
            console.log(error)
            setLoading(false)
            if (error.response.status == 422) {
                toast.error("This word is already in your list");
            } else if (error.response.status == 401) {
                toast.error("You are no longer connected!")
                navigate("/login");
            } else {
                toast.error("Error")
            }
        }
    }

    const functionAddEnDescription = () => {
        setAddEnDescription(!addEnDescription);
       
    }
    const functionAddFrDescription = () => {
        setAddFrDescription(!addFrDescription);

    }
    useEffect(() => {
        if(!addEnDescription){
            setWords({
                ...words,
                enDescription: "",
            })
            setBtnEnDescripton('Add En Description')
        }else{
            setBtnEnDescripton('Remove Description')
        }

    }, [addEnDescription])
    useEffect(() => {
        if(!addFrDescription){
            setWords({
                ...words,
                frDescription: "",
            })
            setBtnFrDescripton('Ajouter une description')
        }else{
            setBtnFrDescripton('Remove Description')
        }

    }, [addFrDescription])

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
                            <div className="col-md-8 mt-3">
                                <form onSubmit={handleSubmit}>
                                    <div className="row align-items-center">
                                        <div className="col-9">
                                            <Field required value={words.enWord}
                                                className="input-shadow"
                                                onChange={handleChange}
                                                name="enWord"
                                                placeholder="English word">
                                            </Field>
                                            {addEnDescription && (
                                                <Field  value={words.enDescription}
                                                    className="input-shadow"
                                                    onChange={handleChange}
                                                    name="enDescription"
                                                    placeholder="Explication">
                                                </Field>
                                            )}
                                        </div>
                                        <div className="col-3">
                                            <a onClick={() => functionAddEnDescription()} className="btn btn-sm btn-primary mt-4">
                                                {btnEnDescripton}
                                            </a>
                                        </div>

                                    </div>

                                    <div className="mt-3">
                                        <div className="row align-items-center">
                                            <div className="col-9">
                                                <Field required value={words.frWord}
                                                    className="input-shadow"
                                                    onChange={handleChange}
                                                    name="frWord"
                                                    placeholder="French word">
                                                </Field>
                                                {addFrDescription && (
                                                <Field  value={words.frDescription}
                                                    className="input-shadow"
                                                    onChange={handleChange}
                                                    name="frDescription"
                                                    placeholder="French word">
                                                </Field>
                                                )}
                                            </div>
                                            <div className="col-3">
                                                <a onClick={() => functionAddFrDescription()} className="btn btn-sm btn-primary mt-4">
                                                    {btnFrDescripton}
                                                </a>
                                            </div>
                                        </div>

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
                            <div className="col-md-4 text-center mt-3">
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