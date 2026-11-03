import React, { useEffect, useState } from "react";
import './Home.css';
import Card from "../../components/Card/Card";
import AOS from 'aos';
import 'aos/dist/aos.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from "react-router-dom";
import { getReleases, isDemoMode } from '../../services/apiConnect';
import { FaWhatsapp } from "react-icons/fa";
import FadeUp from "../../components/FadeUp/FadeUp";




export default function Home () {
    const [products, setProducts] = useState([

    ])
    const navigate = useNavigate();
    


    useEffect(() => {
        AOS.init({
        duration: 800, 
        once: true     
      });


      const fetchProducts = async () => {
        try {
          const data = await getReleases();
          setProducts(data);

        } catch (err) {
          console.error("Erro ao carregar produtos: ", err)
        }
      };

      fetchProducts();
    }, [])


    return(
        <div className="home">

          <div className="main-video-container">
            <video autoPlay loop muted  playsInline disablePictureInPicture preload="auto" className="main-video">
              <source src="/images/main-video.mp4" type="video/mp4"/>
              Seu navegador não suporta a tag de vídeo.
            </video>
          </div>

  
          <main>
              <FadeUp className="news-container" delay={100}>
                <div className="news-text-container" >
                    <h1>NOVAS COLEÇÕES</h1>
                    <p>Peças exclusivas e cheias de charme para deixar seu verão ainda mais especial.</p>
                </div>
      
                <FadeUp className="news-elements" delay={200}>
                {products.length > 0 ? (
                  products.map((product, index) => (
                    <Card key={index} id={product.id} {...product} />
                  ))
                ) : (
                  <p></p>     
                )}
              </FadeUp>

              {products.length > 0 && (
              <FadeUp className="news-carousel-container" delay={100}>
                <Swiper
                  className="news-carousel"
                  modules={[Navigation, Pagination]}
                  spaceBetween={10}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                >
                  {products.map((product, index) => (
                    <SwiperSlide key={index}>
                      <Card id={product.id} {...product} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </FadeUp>
            )}
            </FadeUp>


            <FadeUp className="orders-container" delay={100}>
                <div className="orders-text">
                  <h1>Sua ideia, nossa <span>arte.</span></h1>
                  <p>Criamos peças <span>exclusivas</span>, feitas <span>sob medida</span> para você brilhar em qualquer ocasião. Do dia a dia aos momentos especiais, damos vida à sua inspiração com estilo único e personalizado. Fale com a gente no WhatsApp e vamos transformar suas ideias em realidade!</p>
                  <p>Ainda não sabe medir?</p>
                  <div className="buttons-contact-container">
                    <button onClick={() => {
                      navigate("/measure")
                      }}>
                      Saiba mais
                    </button>

                    {!isDemoMode && (
                      <a href="https://wa.me/5521983103439" target="_blank" rel="noreferrer">
                          <FaWhatsapp className="contact-icon-home" color="#555" size={35}/>
                      </a>
                    )}
                  </div>
                </div>

                <div className="image-large">
                  <img src="./images/colagem.png" alt="" />
                </div>
            </FadeUp>

            <FadeUp className="about-container" delay={100}>
              <div className="image-container">
                <img src="./images/colagem.png" alt="Coleção de peças artesanais" />
              </div>
              <div className="text-container">
                <h1>Feito à mão, <br /><span>pensado para você</span></h1>
                <p>Cada peça combina cuidado artesanal, conforto e estilo para acompanhar momentos especiais. Explore o catálogo, escolha suas variações e prepare uma solicitação personalizada.</p>
              </div>
            </FadeUp>
          </main>
      </div>
    );
}
