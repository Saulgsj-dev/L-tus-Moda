// src/pages/CartPage.tsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Seu carrinho está vazio</h2>
        <Link
          to="/"
          className="bg-gradient-to-r from-pink-400 to-yellow-400 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Escolher Produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Meu Carrinho ({totalItems} itens)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de Itens */}
        <div className="lg:col-span-2 space-y-6">
          {items.map(item => (
            <div key={item.id} className="flex bg-white p-4 rounded-lg shadow">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="ml-4 flex-grow">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">R$ {item.price.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-200 px-3 py-1 rounded-l"
                  >
                    -
                  </button>
                  <span className="border-t border-b px-4 py-1">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 px-3 py-1 rounded-r"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-4 text-red-500 hover:underline"
                  >
                    Remover
                  </button>
                </div>
              </div>
              <div className="font-bold text-lg">
                R$ {(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Resumo do Pedido */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal ({totalItems} itens)</span>
              <span>R$ {totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Frete</span>
              <span>Grátis</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>R$ {totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={clearCart}
            className="w-full mt-4 py-2 text-red-500 border border-red-500 rounded hover:bg-red-50 transition"
          >
            Limpar Carrinho
          </button>
          <Link
            to="/checkout"
            className="w-full mt-4 block bg-gradient-to-r from-pink-400 to-yellow-400 text-white py-3 rounded-lg font-semibold text-center hover:shadow-lg transition"
          >
            Finalizar Compra
          </Link>
        </div>
      </div>
    </div>
  );
}