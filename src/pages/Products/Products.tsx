import React, { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useSearchParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import { getProducts } from "../../services/apiConnect";
import "./Products.css";

export default function Products() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts(category);
        setProducts(productsData);
      } catch (error) {
        console.error("Erro ao buscar produtos", error);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="main-container">
      <div className="title-container">
        <h1>
          Você está procurando por {" "}
          <span>{category ? category : "todos os produtos"}</span>
         
        </h1>
      </div>

       <hr />

      {products.length > 0 && ( // só renderiza se tiver produtos
        <div className="product-grid">
          {products.map((product) => (
            <Card
              key={product.id}
              imageUrl={product.imageUrl}
              title={product.title}
              description={product.description}
              price={product.price}
              data-aos="fade-up"
              data-aos-delay="100"
            />
          ))}
        </div>
      )}
    </div>
  );
}
