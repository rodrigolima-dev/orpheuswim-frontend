import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Purchase.css"
import Dropdown from "../../components/Dropdown/Dropdown";
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function Purchase() {
    const location = useLocation();
    const { addToCart } = useCart();

    const {title, price, imageUrl, description} = location.state || {};
    const [size, setSize] = useState("P");
    const [color, setColor] = useState("Branco")
    const [quantity, setQuantity] = useState(1);
    const [showModal, setShowModal] = useState(false);


    const sizes = ["PP", "P", "M", "G"];
    const colors = ["Branco", "Preto", "Azul", "Vermelho", "Escolher"];

    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true, // garante que a animação ocorra uma única vez
        });
    }, []);


    //Função para adcionar ao carrinho
    function handleAddToCart() {
        const newItem = {
            id: location.state.id,
            title,
            price,
            imageUrl,
            size,
            color,
            quantity
        }

        addToCart(newItem);
        setShowModal(true);

        // Fecha automaticamente após 2.5 segundos
        setTimeout(() => {
            setShowModal(false);
            navigate('/');
        }, 2500);
    }


    return(
        <div className="purchase">


            <img 
            src={imageUrl} 
            alt="Imagem do produto" 
            className="product-image"
            data-aos="fade-up"
            data-aos-delay="200"
            />


            <div className="product-info-container" data-aos="fade-up" data-aos-delay="300">
                <div className="title-container">
                    <img src="/images/logo-site.png" alt="Logo orpheuswim" className="logo-orp"/>
                    <h1>{title}</h1>
                    <span>R${price.toFixed(2)}</span>
                </div>

                <div className="description-container">

                    <div className="individual-product-description">
                        <p>{description}</p>
                    </div>

                    <div className="standart-description">
                        <p> 100% Algodão </p>

                        <div className="care-instructions">
                            <h3>Cuidados: </h3>
                            <ul>
                                <li>Lavar à mão com cuidado.</li>
                                <li>Evitar produtos químicos fortes.</li>
                                <li>Secar à sombra, em superfície plana.</li>
                                <li>Guardar dobrado para preservar a forma.</li>
                            </ul>


                        </div>
                    </div>
                </div>

                <div className="specifications-container">  
                    <div className="selectors">
                        {/* Bolinhas de Tamanho */}
                        <div className="size-selector">
                            <label className="label"><h1>TAMANHO</h1> </label>
                            <div className="size-buttons">
                                {sizes.map((s) => (
                                    <button
                                    key={s}
                                    className={`size-button ${size === s ? 'selected' : ''}`}
                                    onClick={() => setSize(s)}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Dropdown de Cor */}
                        <Dropdown
                        label="COR"
                        options={colors}
                        value={color}
                        onChange={(value) => setColor(value)}
                        />

                        <div className="quantity-container">
                            <button
                                className="set-quantity"
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            >
                                -
                            </button>

                            <div className="quantity-display">
                                <span>{quantity}</span>
                            </div>
                            
                            <button
                                className="set-quantity"
                                onClick={() => setQuantity((q) => q + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <button className="buy-button" onClick={() => {
                        handleAddToCart();
                        }}>
                        ADCIONAR AO CARRINHO
                    </button>

                </div>
            </div>

             {/* Modal de confirmação */}
             {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                        <p>✅ Produto adicionado ao carrinho!</p>
                    </div>
                </div>
            )}

        </div>
    )
}