import React, { useEffect, useState } from "react";
import './Home.css';
import Card from "../../components/Card/Card";
import Footer from "../../components/Footer/Footer";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from "react-router-dom";
import { getReleases } from '../../services/apiConnect';
import { FaWhatsapp } from "react-icons/fa";




export default function Home () {
    const [products, setProducts] = useState([])
    const navigate = useNavigate();
    
    useEffect(() => {
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
            <video autoPlay loop muted playsInline disablePictureInPicture controlsList="nodownload nofullscreen noremoteplayback" className="main-video">
              <source src="/images/main-video.mp4" type="video/mp4"/>
              Seu navegador não suporta a tag de vídeo.
            </video>
          </div>

  
          <main>
              <div className="news-container">
                <div className="news-text-container">
                    <h1>NOVAS COLEÇÕES</h1>
                    <p>Peças exclusivas e cheias de charme para deixar seu verão ainda mais especial.</p>
                </div>
      
                <div className="news-elements">
                {products.length > 0 ? (
                  products.map((product, index) => (
                    <Card key={index} id={product.id} {...product} />
                  ))
                ) : (
                  <p></p>     
                )}
              </div>

              {products.length > 0 && (
              <div className="news-carousel-container">
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
              </div>
            )}
            </div>


            <div className="orders-container">
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

                    <a href="https://wa.me/5521983103439" target="_blank">
                        <FaWhatsapp className="contact-icon-home" color="#555" size={35}/>
                    </a>
                  </div>
                </div>

                <div className="image-large">
                  <img src="./images/colagem.png" alt="" />
                </div>
            </div>

            <div className="about-container">
              <div className="image-container">
                <img src="./images/gabriella.jpeg" alt="" />
              </div>
              <div className="text-container">
                <h1>O coração do crochê, <br /><span>Gabriella</span></h1>
                <p>O crochê sempre fez parte de mim. Desde pequena, me encantava com os fios se transformando em algo único, e essa paixão só cresceu com o tempo. Hoje, aos 19 anos, cada peça que crio carrega um pouco da minha dedicação e do amor que sinto por essa arte. <br/><br />Para mim, o crochê vai além da beleza, é sobre conforto, estilo e aquela sensação especial de vestir algo feito à mão, pensado para você. Cada ponto, cada detalhe, é uma forma de expressar cuidado e tornar cada acessório ainda mais especial. 💖</p>
              </div>
            </div>
          </main>
      </div>
    );
}