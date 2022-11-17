import React, { useEffect, useState } from 'react'
import NewsAPI from '../services/NewsAPI';
import CardNews from '../components/CardNews';
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const NewsPage = () => {

  const [news, setNews] = useState([])
  const [newsDisplayed, setNewsDisplayed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadPost, setLoadPost] = useState(true);
  const [count, setCount] = useState(8);

  const fetchNews = async () => {
    try {
      const data = await NewsAPI.findAll();
      setNews(data);
      const tab = []
      for (let i = 0; i < count; i++) {
        tab.push(data[i])
      }
      setNewsDisplayed(...[tab]);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error("An error occurred while loading news")
    }
  }

  useEffect(() => {
    fetchNews();
    console.log(newsDisplayed)
  }, [])

  const loadMore = () => {
    if(window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight){
      setLoadPost(true);
      setCount(count + 2)
    }
  }

  useEffect(() =>{
    if(loadPost){
      if(newsDisplayed.length < news.length){
        const tab = [...newsDisplayed]
        let i = newsDisplayed.length;
        for ( i ; i < count; i++) {
          tab.push(news[i])
        }
        setNewsDisplayed(...[tab]);
      }

      setLoadPost(false);
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
      :(
     
        newsDisplayed.map((news) => {
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