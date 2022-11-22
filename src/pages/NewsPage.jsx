import React, { useEffect, useState } from 'react'
import NewsAPI from '../services/NewsAPI';
import CardNews from '../components/CardNews';
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const NewsPage = () => {

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
        toast.error("you are no longer connected!")
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
      console.log(error)
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

          news.map((news, index) => {
            return (
              <CardNews key={index} news={news} />
            )
          })

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