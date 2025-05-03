import React, { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteProduct, getProducts, updateProduct } from "../../../services/apiConnect";
import debounce from 'lodash.debounce';

import './Admin.css';

export default function Admin() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        imageUrl: '',
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async (search = '') => {
        try {
            const response = await getProducts("", search);
            setProducts(Array.isArray(response) ? response : []);
        } catch (error) {
            console.error("Erro ao carregar os produtos: ", error);
            setProducts([]);
        }
    };

    const debouncedSearch = debounce((search) => {
        fetchProducts(search);
    }, 300);

    const handleSearchChange = (e) => {
        const { value } = e.target;
        setSearchTerm(value);

        if (value.trim() === '') {
            fetchProducts(); // Se o campo de pesquisa estiver vazio, recarrega todos os produtos
        } else {
            debouncedSearch(value); // Chama a função de pesquisa com debounce
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
        } catch (error) {
            console.error("Erro ao deletar produto: ", error);
        }
    };



    const openModal = (product) => {
        setCurrentProduct(product);
        setFormData({
            title: product.title || '',
            description: product.description || '',
            price: product.price !== undefined ? product.price : '',
            imageUrl: product.imageUrl || '',
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentProduct(null);
        setFormData({
            title: '',
            description: '',
            price: '',
            imageUrl: '',
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {
        try {
            const updatedProduct = {
                id: currentProduct.id,
                ...formData,
                price: formData.price ? parseFloat(formData.price) : undefined,
            };
            await updateProduct(updatedProduct);
            await fetchProducts();
            closeModal();
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
        }
    };

    return (
        <div className="admin-container">
            <div className="search-container">
                <input 
                type="text" 
                placeholder="Pesquisar..." 
                value={searchTerm}
                onChange={handleSearchChange}
                />

            </div>

            <div className="products-list-container">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product?.id} className="product-card">
                            <img src={product?.imageUrl || "/images/default-product.png"} alt={product?.name || "Produto"} />
                            <div className="product-card-info">
                                <h2>{product?.title || "Título indisponível"}</h2>
                                <span>R$ {product?.price !== undefined ? Number(product.price).toFixed(2) : "0,00"}</span>
                            </div>
                            <div className="options">
                                <FaRegEdit className="edit-icon icon" size={25} color="#000" onClick={() => openModal(product)} />
                                <MdDelete className="delete-icon icon" size={25} color="#000" onClick={() => handleDelete(product.id)} />
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-products-message">Nenhum produto cadastrado.</p>
                )}
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Atualizar Produto</h2>
                        <input
                            type="text"
                            name="title"
                            placeholder="Título"
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                        <textarea
                            name="description"
                            placeholder="Descrição"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            step="0.01"
                            name="price"
                            placeholder="Preço"
                            value={formData.price}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="imageUrl"
                            placeholder="URL da Imagem"
                            value={formData.imageUrl}
                            onChange={handleInputChange}
                        />
                        <div className="modal-buttons">
                            <button onClick={handleUpdate}>Salvar</button>
                            <button className="cancel-button" onClick={closeModal}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
