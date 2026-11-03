import React, { useState } from "react";
import './Card.css';
import { useNavigate } from "react-router-dom";
import ImageWithLoading from "../Loading/ImageWithLoading";
import { getProductSlug } from "../../domain/product";

export default function Card({id, imageUrl, title, description, price}) {
    const navigation = useNavigate();

    // Sem espaços
    const formattedTitle = getProductSlug(title);

    return (
        <div
            className="element"
            onClick={() =>
                navigation(`/purchase/${formattedTitle}`, {
                    state: { id, title, description, price, imageUrl },
                })
            }
        >
            <div className="image-card-wrapper">
                <ImageWithLoading src={imageUrl} alt={title} className="element-image" />
            </div>
            <h1>{title}</h1>
            <span>R${price.toFixed(2)}</span>
        </div>
    );
}
