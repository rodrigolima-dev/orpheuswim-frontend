import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { buildWhatsAppMessage, buildWhatsAppUrl, getCartItemKey } from "../../domain/cart";
import { isDemoMode } from "../../services/apiConnect";
import "./Cart.css";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, clearCart, updateQuantity, totalPrice } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");

  const whatsappMessage = buildWhatsAppMessage(cart);

  function handleWhatsAppCheckout() {
    if (isDemoMode) return;

    const phone = "5521983103439"; 

    const whatsappUrl = buildWhatsAppUrl(phone, whatsappMessage);
    window.open(whatsappUrl, "_blank");
    clearCart();
    setShowPreview(false);
  }

  async function handleCopyMessage() {
    try {
      await navigator.clipboard.writeText(whatsappMessage);
      setCopyStatus("Mensagem copiada.");
    } catch {
      setCopyStatus("Não foi possível copiar automaticamente.");
    }
  }

   // Função chamada quando a imagem termina de carregar
  const handleImageLoad = () => {
    setImageLoaded(true); // Quando a imagem é carregada, remover o spinner
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Seu carrinho</h2>

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
                key={getCartItemKey(item)}
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
                    {/* I don't know why but if it was a div or span, not align */}
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

              <button className="checkout-btn" onClick={() => setShowPreview(true)}>
                <p>Pré-visualizar mensagem</p>
              </button>
            </div>
          </div>

          {showPreview && (
            <div className="message-preview-overlay" role="presentation" onClick={() => setShowPreview(false)}>
              <div
                className="message-preview-box"
                role="dialog"
                aria-modal="true"
                aria-labelledby="message-preview-title"
                onClick={(event) => event.stopPropagation()}
              >
                <h3 id="message-preview-title">Prévia da solicitação</h3>
                <p>Confira o texto antes de abrir o WhatsApp.</p>
                {isDemoMode && <p role="status">O encaminhamento está desativado no modo demo local.</p>}
                <pre>{whatsappMessage}</pre>
                {copyStatus && <p role="status">{copyStatus}</p>}
                <div className="preview-actions">
                  <button type="button" onClick={handleCopyMessage}>Copiar mensagem</button>
                  {!isDemoMode && (
                    <button type="button" onClick={handleWhatsAppCheckout}>Continuar para o WhatsApp</button>
                  )}
                  <button type="button" onClick={() => setShowPreview(false)}>Fechar</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
