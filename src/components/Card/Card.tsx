import React, { useState } from "react";
import './Card.css';
import { useNavigate } from "react-router-dom";
import ImageWithLoading from "../Loading/ImageWithLoading";

export default function Card({id, imageUrl, title, description, price}) {
    const navigation = useNavigate();
    const [loading, setLoading] = useState(true);

    // Sem espaços
    const formattedTitle = title.replace(/\s+/g, "-").toLowerCase();

    return (
        <div
            className="element"
            onClick={() =>
                navigation(`/purchase/${formattedTitle}`, {
                    state: { id, title, description, price, imageUrl },
                })
            }
        >
            <div className="image-wrapper">
                {loading && <div className="spinner" />}
                <ImageWithLoading src={imageUrl} alt={title} className="element-image" />
            </div>
            <h1>{title}</h1>
            <p>{description}</p>
            <span>R${price}</span>
        </div>
    );
}
