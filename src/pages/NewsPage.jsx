import React, { useEffect, useState } from 'react'
import NewsAPI from '../services/NewsAPI';
import CardNews from '../components/CardNews';
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const NewsPage = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([])
  const [length, setLength] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadPost, setLoadPost] = useState(false);

  const fetchNews = async () => {
    try {
      const data = await NewsAPI.getASlice();
      setNews([...data]);
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)

      if (error.response.status == 401) {
        toast.error("You are no longer connected!")
        navigate("/login");
      } else {
        toast.error("An error occurred while loading news")
      }
    }
  }

  const fechMoreNews = async () => {
    if (news.length < length) {
      const id = news[news.length - 1].id
      try {
        const data = await NewsAPI.getASlice(id);
        setNews([...news, ...data])
        setLoadPost(false);
      } catch (error) {
        console.log("error in fetchMoreNews")
      }
    }
  }

  const fetchLength = async () => {
    try {
      const data = await NewsAPI.getLength();
      setLength(data)
    } catch (error) {
      if (error.response.status == 401) {
        toast.error("You are no longer connected!")
        navigate("/login");
      }
    }
  }

  useEffect(() => {
    fetchNews();
    fetchLength();
  }, [])

  const loadMore = () => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
      if (news.length !== length) {
        setLoadPost(true);

      }
    }
  }

  useEffect(() => {
    if (loadPost) {
      fechMoreNews();
    }
    window.addEventListener('scroll', loadMore);
    return () => window.removeEventListener('scroll', loadMore);
  }, [loadPost])


  return (
    <div className="container">
      <div className="title-primary mt-3 mb-4">
        News
      </div>
      {loading ?
        <div className="text-center">
          <ThreeDots
            color="#C30028"
            wrapperStyle={{ justifyContent: 'center' }}
          />
        </div>
        : (
          <>
            <div className="row mb-5">
              <div className="col-md-6">
                <div className="card-news" style={{"height" : "100%"}}>
                  <div>
                    <strong className="text-primary">Mise à jour !</strong>   <br />
                    <p>Salut tout le monde, je vous écris pour vous informer de la dernière mise à jour de <strong className="text-primary">MyMemory.</strong></p>
                    <p>Dorénavant, avant de lancer un quiz, vous pouvez choisir d'être soit intérrogé sur une liste de mot totalement aléatoire, soit sur les mots sur lesquels vous avez le moins de succès.</p>
                    <p><strong>Bonne apprentissage !</strong></p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card-news" style={{"height" : "100%"}}>
                  <div>
                    <strong className="text-primary">Update !</strong>   <br />
                    <p>Hello everyone, I am writing to inform you of the latest update <strong className="text-primary">MyMemory.</strong></p>
                    <p>From now on,
                      before launching a quiz, you can choose to be either questioned on a list of completely random words, or on the words on which you have the least success.</p>
                    <p><strong>Good learning !</strong></p>
                  </div>
                </div>
              </div>
            </div>

            {
              news.map((news, index) => {
                return (
                  <CardNews key={index} news={news} />
                )
              })
            }
          </>



        )
      }
      {loadPost && (
        <div className="text-center">
          <ThreeDots
            color="#C30028"
            wrapperStyle={{ justifyContent: 'center' }}
          />
        </div>
      )}


    </div>
  )
}

export default NewsPage