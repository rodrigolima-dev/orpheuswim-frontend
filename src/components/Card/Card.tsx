import React from "react";
import './Card.css'
import { useNavigate } from "react-router-dom";

export default function Card({image, title, description, price}) {
    const navigation = useNavigate();
    //Sem espaços
    const formattedTitle = title.replace(/\s+/g, "-").toLowerCase();

    return(
        <div className="element" onClick={() => navigation(`/purchase/${formattedTitle}`, {state: {title, description, price, image}})}>
            <img src={image} alt={title} className="element-image" />
            <h1>{title}</h1>
            <p>{description}</p>
            <span>{price}</span>
        </div>
    );
}