// src/pages/Login.tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { login, signUp } = useAuth(); // ✅ ADICIONE signUp aqui
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password);
        navigate('/');
      } else {
        // ✅ CADASTRO REAL NO SUPABASE
        const fullName = `${firstName} ${lastName}`.trim();
        await signUp(email, password, fullName);

        alert('Conta criada com sucesso! Bem-vinda à Lótus Moda 🌸');
        setIsLogin(true); // Volta para tela de login
        navigate('/');   // Redireciona para home
      }
    } catch (error: any) {
      alert('Erro: ' + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-yellow-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-400 py-4 text-center">
            <h2 className="text-2xl font-bold text-white">
              {isLogin ? 'Entrar na Lótus Moda' : 'Criar Conta'}
            </h2>
          </div>

          <form onSubmit={handleAuth} className="p-8 space-y-5">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Nome"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="col-span-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <input
                  type="text"
                  placeholder="Sobrenome"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="col-span-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 shadow-md hover:shadow-lg
                bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-400
                hover:from-pink-500 hover:via-orange-500 hover:to-yellow-500
                focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-opacity-50"
            >
              {isLogin ? 'Entrar' : 'Cadastrar'}
            </button>
          </form>

          <div className="px-8 pb-6 text-center">
            <p className="text-gray-600">
              {isLogin ? 'Não tem conta?' : 'Já tem conta?'}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 text-orange-500 font-semibold hover:underline focus:outline-none"
              >
                {isLogin ? 'Cadastre-se' : 'Entrar agora'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}