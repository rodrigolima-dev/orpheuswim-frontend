import React from "react";
import './Card.css'

export default function Card({image, title, description, price}) {
    return(
        <div className="element">
            <img src={image} alt={title} className="element-image" />
            <h1>{title}</h1>
            <p>{description}</p>
            <span>{price}</span>
      </div>
    );
}