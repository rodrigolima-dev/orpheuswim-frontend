import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import "./Cart.css";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);
  

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function generateWhatsAppMessage() {
    let message = "Olá, quero finalizar uma compra com os seguintes produtos:%0A%0A";
  
    cart.forEach((item, index) => {
      message += `*Produto ${index + 1}:* ${item.title}%0A`;
      message += `Tamanho: ${item.size}%0A`;
      message += `Cor: ${item.color}%0A`;
      message += `Quantidade: ${item.quantity}%0A`;
      message += `Preço unitário: R$ ${item.price.toFixed(2)}%0A%0A`;
    });
  
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    message += `*Total:* R$ ${total.toFixed(2)}%0A%0A`;
  
    message += "Aguardo a confirmação!";
  
    return message;
  }

  function handleWhatsAppCheckout() {
    const message = generateWhatsAppMessage();
    const phone = "5521983103439"; 

    const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  }

   // Função chamada quando a imagem termina de carregar
  const handleImageLoad = () => {
    setImageLoaded(true); // Quando a imagem é carregada, remover o spinner
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Seu Carrinho</h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Seu carrinho está vazio.</p>
          <Link to="/" className="go-back-btn">Voltar às compras</Link>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div
                className="cart-item"
                key={`${item.id}-${item.size}-${item.color}`}
              >
              <div className="image-wrapper">
               {!imageLoaded && <div className="spinner"></div>}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className={`cart-item-image ${imageLoaded ? "fade-in" : "hidden"}`}
                    onLoad={handleImageLoad} // Chama a função quando a imagem carregar
                  />

              </div>
                <div className="cart-item-info">
                  <h3>{item.title}</h3>
                  <p>Tamanho: {item.size}</p>
                  <p>Cor: {item.color}</p>
                  <p>Preço: R$ {item.price.toFixed(2)}</p>

                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id, item.size, item.color)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <p className="cart-total">Total: R$ {totalPrice.toFixed(2)}</p>
            <div className="buttons-container">
              <button className="clear-cart-btn" onClick={clearCart}>
                Limpar Carrinho
              </button>

              <button  className="checkout-btn"  onClick={() => {
                handleWhatsAppCheckout();
                clearCart();
                }}>
                <p>Finalizar Compra</p>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
