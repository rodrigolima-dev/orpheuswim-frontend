import React, { useState } from "react";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Purchase.css"


export default function Purchase() {
    const location = useLocation();
    const { addToCart } = useCart();

    const {title, price, imageUrl} = location.state || {};
    const [size, setSize] = useState("P");
    const [color, setColor] = useState("Branco")
    const [quantity, setQuantity] = useState(1);
    const [showModal, setShowModal] = useState(false);


    const sizes = ["P", "M", "G", "GG", "SB"];
    const colors = ["Branco", "Preto", "Azul", "Vermelho", "Escolher"];

    const navigate = useNavigate();


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


            <img src={imageUrl} alt="Imagem do produto" className="product-image"/>


            <div className="product-info-container">
                <div className="title-container">
                    <img src="/images/logo-site.png" alt="Logo orpheuswim" className="logo-orp"/>
                    <h1>{title}</h1>
                    <span>R${price}</span>
                </div>

                <div className="specifications-container">  
                    <div className="selectors">
                        {/* Bolinhas de Tamanho */}
                        <div className="size-selector">
                            <label className="label">TAMANHO <span>(sb = sob medida)</span></label>
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
                        <div className="dropdown">
                            <label className="label">COR</label>
                            <select 
                            value={color}
                            onChange={(c) => setColor(c.target.value)}
                            >
                                {colors.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>

                        </div>

                        <div className="quantity-container">
                            <button
                                className="set-quantity"
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            >
                                -
                            </button>
                            <div className="quantity">
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