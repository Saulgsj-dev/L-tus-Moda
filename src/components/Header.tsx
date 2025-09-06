// src/components/Header.tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Header() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // ✅ Menu mobile
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
  };

  const categories = [
    { name: 'Blusas', path: '/category/blusas' },
    { name: 'Calças', path: '/category/calças' },
    { name: 'Vestidos', path: '/category/vestidos' },
    { name: 'Saias', path: '/category/saias' },
    { name: 'Feminino', path: '/category/feminino' },
    { name: 'Masculino', path: '/category/masculino' },
    { name: 'Infantil', path: '/category/infantil' },
    { name: 'Acessórios', path: '/category/acessórios' },
    { name: 'Esportivo', path: '/category/esportivo' },
  ];

  return (
    <header className="bg-black text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-bold text-xl sm:text-2xl hover:text-pink-300 transition">
            Lótus Moda
          </Link>

          {/* Ações Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Dropdown de Categorias */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-800 hover:bg-gray-700 transition group"
              >
                <span className="font-medium">Categorias</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isCategoryOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 text-gray-800 z-50">
                  {categories.map((category) => (
                    <Link
                      key={category.path}
                      to={category.path}
                      onClick={() => setIsCategoryOpen(false)}
                      className="block px-4 py-3 hover:bg-gray-50 transition border-b border-gray-50 last:border-0 group"
                    >
                      <span className="font-medium text-gray-800 group-hover:text-pink-500 transition">
                        {category.name}
                      </span>
                      <span className="block w-0 h-0.5 bg-gradient-to-r from-pink-400 to-yellow-400 transition-all duration-300 group-hover:w-full mt-1"></span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Barra de busca */}
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                className="pl-10 pr-4 py-2 w-64 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Ícones */}
            <div className="flex items-center space-x-3">
              {user ? (
                <Link to="/wishlist" className="text-red-400 hover:text-red-300 transition p-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </Link>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="text-red-400 hover:text-red-300 transition p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              )}

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-800 transition"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {user.email?.[0]?.toUpperCase()}
                    </div>
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 text-gray-800 z-50">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-50 transition"
                      >
                        🚪 Sair
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition"
                >
                  Entrar
                </Link>
              )}

              <Link to="/cart" className="relative p-2">
                <svg className="w-6 h-6 text-white hover:text-gray-300 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10a2 2 0 002-2V5.4L16 3H4.4l-.4 2M7 13V4.5L13 7m-6 8v-4.5L13 15" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center leading-none">
                  0
                </span>
              </Link>
            </div>
          </div>

          {/* Menu Mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-gray-800 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Menu Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 border-t border-gray-700">
            {/* Busca Mobile */}
            <div className="relative px-2">
              <input
                type="text"
                placeholder="O que você procura?"
                className="w-full pl-10 pr-4 py-3 rounded-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Categorias Mobile */}
            <div className="px-2">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center justify-between w-full px-4 py-3 bg-gray-800 rounded-lg text-left"
              >
                <span className="font-medium">Categorias</span>
                <svg
                  className={`w-5 h-5 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isCategoryOpen && (
                <div className="mt-2 space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category.path}
                      to={category.path}
                      onClick={() => {
                        setIsCategoryOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                      className="block px-6 py-3 bg-gray-900 rounded-lg hover:bg-gray-700 transition"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Links Rápidos */}
            <div className="px-2 space-y-2">
              {user ? (
                <>
                  <Link
                    to="/wishlist"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-6 py-3 bg-gray-800 rounded-lg text-red-400 hover:bg-gray-700 transition"
                  >
                    ❤️ Lista de Desejos
                  </Link>
                  <Link
                    to="/cart"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-6 py-3 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition"
                  >
                    🛒 Carrinho
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    🚪 Sair
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 py-3 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-lg text-center font-medium hover:shadow-lg transition"
                >
                  Entrar / Cadastrar
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}