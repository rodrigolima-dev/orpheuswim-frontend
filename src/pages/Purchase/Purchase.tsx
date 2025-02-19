import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Purchase.css"


export default function Purchase() {
    const location = useLocation();
    const {title, description, price, image} = location.state || {};
    const [size, setSize] = useState("P");
    const [color, setColor] = useState("Branco")
    const [quantity, setQuantity] = useState(1);

    const sizes = ["P", "M", "G", "GG", "SB"];
    const colors = ["Branco", "Preto", "Azul", "Vermelho", "Escolher"];


    return(
        <div className="purchase-container">
            <div className="image-container">
                <img src={image} alt="Imagem do produto" />
            </div>

            <div className="product-info-container">
                <div className="title-container">
                    <img src="/images/logo-site.png" alt="Logo orpheuswim" />
                    <h1>{title}</h1>
                    <span>{price}</span>
                </div>

                <div className="specifications-container">
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

                    {/* Seletor de Quantidade */}
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
                    
                    <button className="buy-button">
                            COMPRAR AGORA
                    </button>
                </div>
            </div>

        </div>
    )
}