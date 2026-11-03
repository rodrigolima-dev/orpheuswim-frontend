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
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const productsData = await getProducts(category);
        setProducts(productsData);
      } catch (error) {
        console.error("Erro ao buscar produtos", error);
        setProducts([]);
        setErrorMessage("Não foi possível carregar os produtos agora.");
      } finally {
        setIsLoading(false);
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

      {isLoading && <p role="status">Carregando produtos...</p>}

      {!isLoading && errorMessage && <p role="alert">{errorMessage}</p>}

      {!isLoading && !errorMessage && products.length === 0 && (
        <p role="status">Nenhum produto encontrado.</p>
      )}

      {!isLoading && !errorMessage && products.length > 0 && (
        <div className="product-grid">
          {products.map((product) => (
            <Card
              key={product.id}
              id={product.id}
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
