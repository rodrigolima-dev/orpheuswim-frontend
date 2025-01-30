import React from "react";
import './Home.css';
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import Footer from "../../components/Footer/Footer";


export default function Home () {
    const products = [
      {
        image: "./images/pecas/peca_01.png",
        className: "element-image",
        title: "Conjunto saída de praia",
        description: "Estampa vibrante para dias ensolarados.",
        price: "R$120,00"
      },
      {
        image: "./images/pecas/peca_02.jpg",
        className: "element-image",
        title: "Bikini preto básico (sutiã)",
        description: "Conforto e sofisticação para qualquer ocasião.",
        price: "R$150,00"
      },
      {
        image: "./images/pecas/peca_03.jpg",
        className: "element-image",
        title: "Bikini preto básico",
        description: "Leve e confortável, perfeito para o verão.",
        price: "R$90,00"
      },
      {
        image: "./images/pecas/peca_04.jpg",
        className: "element-image",
        title: "Bolsa",
        description: "Estilosa e prática para momentos à beira-mar.",
        price: "R$110,00"
      },
      {
        image: "./images/pecas/peca_05.jpg",
        className: "element-image",
        title: "Bikini Azul Oceano",
        description: "Versátil e charmosa para compor o look.",
        price: "R$75,00"
      },
      {
        image: "./images/pecas/peca_06.jpg",
        className: "element-image",
        title: "Top Cropped",
        description: "Moderno e descolado para arrasar no visual.",
        price: "R$85,00"
      }
    ];
    

    return(
        <div className="home">
          <Header />

  
          <main>
            <Navigation/>
            <div className="main-container">
              <div className="slogan">
                <h1>Bikini Azul Oceano<br/><span>Leve como o verão, único como você.</span></h1>
                <Button text={"Adquirir"}/>
              </div>
    
              <img src="./images/header-photo.png" alt="Menina com bikini de crochê azul na praia" className="main-image"/>
            </div>
    
            <div className="news-container">
              <div className="news-text-container">
                  <h1>NOVAS COLEÇÕES</h1>
                  <p>Peças exclusivas e cheias de charme para deixar seu verão ainda mais especial.</p>
              </div>
    
              <div className="news-elements">
                {
                  products.map((product, index) => (
                    <Card key={index} {...product} />
                  ))
                }
              </div>
            </div>

            <div className="orders-container">
                <div className="orders-text">
                  <h1>Sua ideia, nossa <span>arte.</span></h1>
                  <p>Criamos peças <span>exclusivas</span>, feitas <span>sob medida</span> para você brilhar em qualquer ocasião. Do dia a dia aos momentos especiais, damos vida à sua inspiração com estilo único e personalizado. Fale com a gente no WhatsApp e vamos transformar suas ideias em realidade!</p>
                  <p>Ainda não sabe medir?</p>
                  <Button text={"Saiba mais"}/>
                </div>

                <div className="logo-large">
                  <img src="./images/logo.png" alt="" />
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

          <Footer/>
      </div>
    );
}