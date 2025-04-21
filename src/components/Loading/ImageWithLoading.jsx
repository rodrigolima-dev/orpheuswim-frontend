import React, { useState } from "react";
import './ImageWithLoading.css';

export default function ImageWithLoading({ src, alt, className = '', style = {} }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="image-wrapper">
      {loading && <div className="spinner" />}
      <img
        src={src}
        alt={alt}
        className={`${className} ${loading ? 'hidden' : 'fade-in'}`}
        onLoad={() => setLoading(false)}
        style={style}
      />
    </div>
  );
}
