// src/pages/CategoryPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import type { Product } from '../types';
import ProductList from '../components/ProductList';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('category', slug);
      setProducts(data || []);
      setLoading(false);
    };
    fetchProducts();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Carregando produtos...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center capitalize">
        {slug}
      </h1>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum produto encontrado nesta categoria.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

// Componente ProductCard simplificado para esta página
import ProductCard from '../components/ProductCard';