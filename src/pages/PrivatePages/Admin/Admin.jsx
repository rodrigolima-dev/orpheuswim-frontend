import React, { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteProduct, getProducts } from "../../../services/apiConnect";
import './Admin.css';

export default function Admin() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();

                setProducts(Array.isArray(response) ? response : []);
            } catch (error) {
                console.error("Erro ao carregar os produtos: ", error);
                setProducts([]); 
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
        } catch (error) {
            const re = localStorage.getItem("token");
            console.log("token: ", re);
            console.log("id: ", id);
            console.error("Erro ao deletar produto: ", error);
        }
    };

    return (
        <div className="admin-container">

            <div className="search-container">
                <input type="text" placeholder="Pesquisar..." />
                <button>Buscar</button>
            </div>

            <div className="products-list-container">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product?.id} className="product-card">

                            <img src={product?.imageUrl || "/images/default-product.png"} alt={product?.name || "Produto"} />

                            <div className="product-card-info">
                                <h2>{product?.title || "Título indisponível"}</h2>
                                <p>{product?.description || "Descrição não disponível"}</p>
                                <span>R$ {product?.price !== undefined ? product.price : "0,00"}</span>
                            </div>

                            <div className="options">
                                <FaRegEdit className="edit-icon icon" size={25} color="#000" />
                                <MdDelete className="delete-icon icon" size={25} color="#000" onClick={() => handleDelete(product.id)} />
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-products-message">Nenhum produto cadastrado.</p>
                )}
            </div>

        </div>
    );
}
