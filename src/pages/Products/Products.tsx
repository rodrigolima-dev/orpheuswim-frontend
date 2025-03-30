import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/Card/Card";
import "./Products.css";

const products = [
    { id: 1, image: "https://picsum.photos/200", title: "Bikini Azul", description: "Bikini confortável", price: "R$ 99,90", category: "bikinis" },
    { id: 2, image: "https://picsum.photos/201", title: "Conjunto Floral", description: "Estampa tropical", price: "R$ 129,90", category: "conjuntos" },
    { id: 3, image: "https://picsum.photos/202", title: "Óculos de Sol", description: "Proteção UV", price: "R$ 59,90", category: "acessorios" },
    { id: 4, image: "https://picsum.photos/203", title: "Bikini Rosa", description: "Modelo estiloso", price: "R$ 109,90", category: "bikinis" },
    { id: 5, image: "https://picsum.photos/204", title: "Pulseira de Praia", description: "Feita à mão", price: "R$ 39,90", category: "acessorios" },
    { id: 6, image: "https://picsum.photos/205", title: "Conjunto Preto", description: "Design sofisticado", price: "R$ 149,90", category: "conjuntos" },
    { id: 7, image: "https://picsum.photos/206", title: "Bikini Listrado", description: "Listras modernas", price: "R$ 119,90", category: "bikinis" },
    { id: 8, image: "https://picsum.photos/207", title: "Bolsa de Praia", description: "Espaçosa e leve", price: "R$ 89,90", category: "acessorios" },
    { id: 9, image: "https://picsum.photos/208", title: "Conjunto Vermelho", description: "Chamativo e elegante", price: "R$ 139,90", category: "conjuntos" },
    { id: 10, image: "https://picsum.photos/209", title: "Bikini Verde", description: "Cor vibrante", price: "R$ 99,90", category: "bikinis" },
    { id: 11, image: "https://picsum.photos/210", title: "Chapéu de Palha", description: "Proteção solar", price: "R$ 69,90", category: "acessorios" },
    { id: 12, image: "https://picsum.photos/211", title: "Conjunto Branco", description: "Puro e clássico", price: "R$ 159,90", category: "conjuntos" },
    { id: 13, image: "https://picsum.photos/212", title: "Bikini Preto", description: "Peça essencial", price: "R$ 109,90", category: "bikinis" },
    { id: 14, image: "https://picsum.photos/213", title: "Brincos de Concha", description: "Inspirado no mar", price: "R$ 49,90", category: "acessorios" },
    { id: 15, image: "https://picsum.photos/214", title: "Conjunto Azul Marinho", description: "Estilo navy", price: "R$ 169,90", category: "conjuntos" },
    { id: 16, image: "https://picsum.photos/215", title: "Bikini Branco", description: "Minimalista e elegante", price: "R$ 119,90", category: "bikinis" },
    { id: 17, image: "https://picsum.photos/216", title: "Tornozeleira de Praia", description: "Acessório delicado", price: "R$ 29,90", category: "acessorios" },
    { id: 18, image: "https://picsum.photos/217", title: "Conjunto Rosa", description: "Romântico e delicado", price: "R$ 149,90", category: "conjuntos" },
];
  

export default function Products () {
    //Pegando categoria da URL
    const { category } = useParams();
    //Filtrando produtos por categoria
    const filteredProducts = category ? products.filter(p => p.category === category) : products;



    return (
        <div className="main-container">
            <div className="title-container">
                <h1>Você está procurando por <span>{category}</span></h1>
            </div>
            <div className="product-grid">
                {filteredProducts.map((product) => (
                    <Card
                    key={product.id}
                    image={product.image}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    />
                ))}
            </div>
        </div>
    )
}