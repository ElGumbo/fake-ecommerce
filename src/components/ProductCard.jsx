import React, { useState } from "react";

export default function ProductCard({ product }) {
  const price = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(product.price);

  const getQuantity = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    return cartItems.find((item) => item.id === product.id)?.quantity ?? 0;
  };

  const [quantity, setQuantity] = useState(getQuantity);

  const addToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    cartItems.push({ ...product, quantity: 1 });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setQuantity(getQuantity());
  };

  const incrementQuantity = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const currentItem = cartItems.find((item) => item.id === product.id);
    currentItem.quantity += 1;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setQuantity(getQuantity());
  };

  const decrementQuantity = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const currentItem = cartItems.find((item) => item.id === product.id);
    currentItem.quantity -= 1;
    if (currentItem.quantity <= 0) {
      const filtered = cartItems.filter((item) => item.id !== product.id);
      localStorage.setItem("cartItems", JSON.stringify(filtered));
    } else {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
    setQuantity(getQuantity());
  };

  return (
    <div className='card bg-base-100 w-full h-full shadow-sm'>
      <figure className='h-64'>
        <img
          src={product.image}
          alt={product.title}
          className='object-contain h-full w-full p-4'
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{product.title}</h2>
        <p>{price}</p>
        <div className='card-actions justify-end'>
          {quantity === 0 ? (
            <button
              onClick={() => addToCart(product)}
              className='btn btn-primary'
            >
              Add to cart
            </button>
          ) : (
            <div className='flex items-center gap-2'>
              <button onClick={decrementQuantity} className='btn btn-primary'>
                -
              </button>
              <span>Quantity: {quantity}</span>
              <button onClick={incrementQuantity} className='btn btn-primary'>
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
