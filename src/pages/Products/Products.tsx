import React, { useEffect, useState } from "react";
import { useSearchParams  } from "react-router-dom";
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
          const productsData = await getProducts(category);  // Usando a função do apiConnect
          setProducts(productsData);
        } catch (error) {
          console.error("Erro ao buscar produtos", error);
        }
      };
  
      fetchProducts();
    }, [category]);  // Dependência para quando a categoria mudar
  


    return (
        <div className="main-container">
          <div className="title-container">
            <h1>
              Você está procurando por{" "}
              <span>{category ? category : "todos os produtos"}</span>
            </h1>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <Card
                key={product.id}
                image={product.imageUrl}
                title={product.title}
                description={product.description}
                price={product.price}
              />
            ))}
          </div>
        </div>
      );
    }