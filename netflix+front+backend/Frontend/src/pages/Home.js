import React, { useEffect, useState } from "react";
//import Tmdb from "../Tmdb";
import  api from "../services/api";
import App from "../App.css";
import MovieRow from "../components/MovieRow";
import FeaturedMovie from "../components/FeaturedMovie";
import Header from "../components/Header";
import Cadastro from "../pages/Cadastro";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [FeaturedData, setFeaturedData ] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      // Pegando a list Total
      let list = await api.getHomeList();
      setMovieList(list);


      // Pegando o Featured
      let originais = list.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originais[0].items.results.length - 1));
      let chosen = originais[0].items.results[randomChosen];
      let chosenInfo = await api.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll();

  }, []);

  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }

  }, [])

  return (
    <div className="page">
      
      <Header black={blackHeader}/>

      {FeaturedData &&
        <FeaturedMovie item={FeaturedData} />
      }
      
      
      <section className="lists">
        {movieList.map((item, key) => (
          <div>
            <MovieRow key={key} title={item.title} items={item.items}/>
          </div>
        ))}
      </section>

      <footer>
        Feito com <span role="img" aria-label="coração">❤</span> pelo Lenine<br/>
        Direitos de imagem para Netflix<br/>
        Dados pegos do site Themoviedb.org
      </footer>

      {movieList.length <= 0 && 
        <div className="loading">
          <img src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/3:2/w_2560%2Cc_limit/Netflix_LoadTime.gif" alt="Carregando"/>  
        </div>
      }

    </div>
  );
}