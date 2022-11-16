import React, { useEffect, useState } from 'react'
import NewsAPI from '../services/NewsAPI';
import CardNews from '../components/CardNews';
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const NewsPage = () => {

  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true);
  const fetchNews = async () => {
    try {
      const data = await NewsAPI.findAll();
      setNews(data);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error("An error occurred while loading news")

    }
  }

  useEffect(() => {
    fetchNews();

  }, [])
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
      :(
     
        news.map((news) => {
          return (
            <CardNews news={news}/>
          )
        })
      
      )
    }
 

    </div>
  )
}

export default NewsPage