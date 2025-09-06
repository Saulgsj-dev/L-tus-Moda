// src/components/ProductCard.tsx
import React from 'react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext'; // ✅ ADICIONADO

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart(); // ✅ USA O HOOK

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white flex flex-col">
      <div className="relative">
        <img
          src={product.image_url || 'https://via.placeholder.com/300'}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <button className="absolute top-3 right-3 w-10 h-10 bg-white bg-opacity-80 rounded-full flex items-center justify-center text-red-500 hover:text-red-600 hover:bg-opacity-100 transition-all shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
        <p className="text-gray-500 text-sm mt-1">{product.category}</p>
        <p className="text-xl font-bold text-gray-800 mt-3">
          R$ {product.price.toFixed(2)}
        </p>

        <button
          onClick={() => addItem(product)} // ✅ ADICIONA AO CARRINHO
          className="mt-4 w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 shadow-md hover:shadow-lg
            bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-400
            hover:from-pink-500 hover:via-orange-500 hover:to-yellow-500
            focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}