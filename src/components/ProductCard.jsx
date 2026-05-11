import React from "react";

export default function ProductCard({ product }) {
  const price = new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(product.price);

  return (
    <div className='card bg-base-100 w-full h-full shadow-sm'>
      <figure className="h-64">
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
          <button className='btn btn-primary'>Buy Now</button>
        </div>
      </div>
    </div>
  );
}
