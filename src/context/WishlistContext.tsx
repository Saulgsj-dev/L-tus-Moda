// src/context/WishlistContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { Product } from '../types';

interface WishlistContextType {
  items: string[];
  addItem: (productId: string) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  hasItem: (productId: string) => boolean;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const loadWishlist = async () => {
    // ✅ CORREÇÃO 1: destructuring correto
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      setItems([]);
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from('wishlists')
      .select('product_id')
      .eq('user_id', session.user.id);

    setItems(data?.map(item => item.product_id) || []);
    setLoading(false);
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const addItem = async (productId: string) => {
    // ✅ CORREÇÃO 2: destructuring correto
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) return;

    const { error } = await supabase
      .from('wishlists')
      .insert([{ user_id: session.user.id, product_id: productId }]);

    if (!error) {
      setItems(prev => [...prev, productId]);
    }
  };

  const removeItem = async (productId: string) => {
    // ✅ CORREÇÃO 3: destructuring correto
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) return;

    const { error } = await supabase
      .from('wishlists')
      .delete()
      .eq('user_id', session.user.id)
      .eq('product_id', productId);

    if (!error) {
      setItems(prev => prev.filter(id => id !== productId));
    }
  };

  const hasItem = (productId: string) => {
    return items.includes(productId);
  };

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, hasItem, loading }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
};