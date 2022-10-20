import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import WordAPI from '../services/WordAPI';

export default function EnWordPage() {

    const [enWords, setEnWords] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true)

    const fetchEnWords = async () => {
        try {
            const data = await WordAPI.findAll();
            setEnWords(data)
            setLoading(false)
        } catch (error) {
            toast.error("An error occurred while loading clients")
            console.log(error.response)
        }
    }

    const handleDelete = async (id) => {
        const copyWords = [...enWords];
        setEnWords(enWords.filter(word => word.id !== id))
        try {
            await WordAPI.delete(id)
        } catch (error) {
            toast.error("An error has occurred")
            setEnWords(copyWords);
            console.log(error.response)
        }
    };

    useEffect(() => {
        fetchEnWords();
    }, [])

    const handleChangePage = (page) => {
        setCurrentPage(page)
    }

    const handleSearch = e => {
        const value = e.currentTarget.value;
        setSearch(value)
        setCurrentPage(1)
    }

    const itemsPerPage = 1000;

    const filteredEnWords = enWords.filter(
        word =>
            word.content.toLowerCase().includes(search.toLowerCase())
    )

    const start = currentPage * itemsPerPage - itemsPerPage
    const paginatedWords = filteredEnWords.slice(start, start + itemsPerPage);

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>List of words</h1>
                <Link to="/en_words/new" className="btn btn-primary">New word</Link>
            </div>

            <div className="form-group mb-5 mt-5">
                <input type="text" placeholder="Rechercher..." value={search} onChange={handleSearch} className="form-control" />
            </div>
            {!loading ? (
                <table  className="table table-hover table-responsive">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>English Word</th>
                            <th>French Word</th>
                            <th>Error</th>
                            <th>Success</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginatedWords.map((word) =>
                            <tr key={word.id} >
                                <td>{word.id}</td>
                                <td>{word.content}</td>
                                <td >{word.frWords.map((frWord) => frWord.content + ", ")}</td>
                                <td>{word.nbError}</td>
                                <td>{word.nbSuccess}</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(word.id)}

                                        className="btn btn-sm btn-danger"><i className="fa-solid fa-trash-can"></i>
                                    </button>
                                </td>
 
                                <td>
                                    <Link
                                        to={"/update_words/" + word.id}

                                        className="btn btn-sm btn-warning"><i className="fa-solid fa-pen-to-square"></i>
                                    </Link>
                                </td>
                                <td>
                                    <Link
                                        to={"/add_translation/" + word.id}

                                        className="btn btn-sm btn-primary">Add translation
                                    </Link>
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
            ) : (
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

            )}
            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredEnWords.length} onPageChange={handleChangePage} />

        </>
    )
}
