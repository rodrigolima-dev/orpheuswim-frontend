import React, { useState } from "react";
import { createProduct } from "../../../services/apiConnect"; 
import './Register.css';

export default function Register() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const categoriasValidas = ['BIKINIS', 'CONJUNTOS', 'ACESSORIOS'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoriasValidas.includes(category)) {
      alert('Categoria inválida! Selecione uma categoria válida.');
      return;
    }

    setIsLoading(true);
    try {
      const newProduct = {
        title,
        description,
        price: parseFloat(price),
        imageUrl,
        category, // agora inclui a categoria
      };

      await createProduct(newProduct);

      alert("Produto cadastrado com sucesso!");

      setTitle('');
      setDescription('');
      setPrice('');
      setImageUrl('');
      setCategory('');
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      alert("Ocorreu um erro ao cadastrar o produto.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h1>Cadastrar Produto</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <label>Título:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Descrição:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label>Preço:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label>Imagem (URL):</label>
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />

        <label>Categoria:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Selecione a categoria</option>
          {categoriasValidas.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0) + cat.slice(1).toLowerCase()}
            </option>
          ))}
        </select>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}
