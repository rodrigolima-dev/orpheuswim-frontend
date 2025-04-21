import React from "react";
import './Card.css'
import { useNavigate } from "react-router-dom";

export default function Card({id, imageUrl, title, description, price}) {
    const navigation = useNavigate();
    //Sem espaços
    const formattedTitle = title.replace(/\s+/g, "-").toLowerCase();

    return(
        <div className="element" onClick={() => navigation(`/purchase/${formattedTitle}`, {state: {id, title, description, price, imageUrl}})}>

            <img src={imageUrl} alt={title} className="element-image" />
            <h1>{title}</h1>
            <p>{description}</p>
            <span>R${price}</span>
        </div>
    );
}