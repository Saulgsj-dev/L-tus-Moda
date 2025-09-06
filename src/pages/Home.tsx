// src/pages/Home.tsx
import React from 'react';
import ProductList from '../components/ProductList';

export default function Home() {
  return (
    <div>
      {/* Hero Section com Imagem de Fundo */}
      <div
        className="relative bg-cover bg-center bg-no-repeat py-20 text-center text-white"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          height: '500px',
        }}
      >
        {/* Overlay escuro para melhorar contraste */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Conteúdo */}
        <div className="relative z-10 px-4">
          <h1 className="text-5xl font-bold mb-4">Moda que combina com você</h1>
          <p className="text-lg max-w-2xl mx-auto">
            As melhores marcas, os melhores preços. Descubra looks que combinam com seu estilo.
          </p>
          <button className="mt-8 bg-white text-red-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg">
            Ver Coleção
          </button>
        </div>
      </div>

      {/* Lista de Produtos */}
      <ProductList />
    </div>
  );
}