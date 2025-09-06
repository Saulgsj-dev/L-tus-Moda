// src/pages/Admin.tsx
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { Product } from '../types';

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    image_url: '',
    category: 'Blusas',
    description: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*');
    setProducts(data || []);
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;

    setUploading(true);

    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, imageFile);

    if (uploadError) {
      alert('Erro ao fazer upload da imagem.');
      setUploading(false);
      return null;
    }

    // ✅ DESTA FORMA É 100% SEGURO E FUNCIONAL
    const {  } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    setUploading(false);
    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = formData.image_url;

    if (imageFile) {
      imageUrl = await handleImageUpload();
      if (!imageUrl) return;
    }

    const { error } = await supabase.from('products').insert([
      {
        ...formData,
        image_url: imageUrl,
      },
    ]);

    if (!error) {
      alert('Produto adicionado com sucesso!');
      setFormData({
        name: '',
        price: 0,
        image_url: '',
        category: 'Blusas',
        description: '',
      });
      setImageFile(null);
      fetchProducts();
    } else {
      alert('Erro ao adicionar produto: ' + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      await supabase.from('products').delete().eq('id', id);
      fetchProducts();
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>

      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl mb-4">Adicionar Novo Produto</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nome do Produto"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="p-3 border rounded"
          />
          <input
            type="number"
            placeholder="Preço"
            value={formData.price || ''}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            required
            className="p-3 border rounded"
          />
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="p-3 border rounded"
            required
          >
            <option value="Blusas">Blusas</option>
            <option value="Calças">Calças</option>
            <option value="Vestidos">Vestidos</option>
            <option value="Saias">Saias</option>
            <option value="Feminino">Feminino</option>
            <option value="Masculino">Masculino</option>
            <option value="Infantil">Infantil</option>
            <option value="Acessórios">Acessórios</option>
            <option value="Esportivo">Esportivo</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block mb-2 font-medium">Imagem do Produto</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {uploading && <p className="mt-2 text-blue-500">Fazendo upload...</p>}
        </div>

        <textarea
          placeholder="Descrição"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-3 border rounded mt-4"
          rows={3}
        />
        <button
          type="submit"
          disabled={uploading}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {uploading ? 'Salvando...' : 'Salvar Produto'}
        </button>
      </form>

      <h2 className="text-xl mb-4">Produtos Cadastrados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="border p-4 rounded shadow">
            <img src={p.image_url} alt={p.name} className="w-full h-32 object-cover rounded" />
            <h3 className="font-bold mt-2">{p.name}</h3>
            <p className="text-green-600">R$ {p.price}</p>
            <p className="text-sm text-gray-500">{p.category}</p>
            <button
              onClick={() => handleDelete(p.id)}
              className="mt-2 text-red-500 hover:underline"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}