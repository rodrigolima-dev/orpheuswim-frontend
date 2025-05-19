import React from "react";

export default function FadeUp({delay = 0, children, className=""}) {
    return (
        <div
            className={className}
            data-aos="fade-up"
            data-aos-delay={delay}
        >
            {children}
        </div>
    ); 
}