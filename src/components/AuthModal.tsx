import React, { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          if (error.message === 'Email not confirmed') {
            toast.error('Por favor, confirme seu e-mail antes de fazer login');
          } else if (error.message === 'Invalid login credentials') {
            toast.error('E-mail ou senha incorretos');
          } else {
            toast.error('Erro ao fazer login. Tente novamente.');
          }
          return;
        }
        toast.success('Login realizado com sucesso!');
        onClose();
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: {
              name,
              email_confirmed: true
            }
          }
        });
        
        if (error) {
          if (error.message.includes('already registered') || error.message === 'User already registered') {
            toast.error('Este e-mail já está cadastrado. Por favor, faça login.');
            setIsLogin(true); // Switch to login view
            setPassword(''); // Clear password for security
          } else {
            toast.error(`Erro ao criar conta: ${error.message}`);
          }
          return;
        }
        
        toast.success('Conta criada com sucesso! Você já pode fazer login.');
        setIsLogin(true); // Switch to login view
        setPassword(''); // Clear password for security
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error('Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setPassword(''); // Clear password when switching modes
    if (isLogin) {
      setName(''); // Clear name when switching to register
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-md relative border border-yellow-400/20">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-yellow-400/60 hover:text-yellow-400"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">
          {isLogin ? 'Entrar' : 'Criar conta'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                Nome
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-yellow-400/20 
                         focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
                placeholder="Seu nome"
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-yellow-400/20 
                       focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white mb-1">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 text-white border border-yellow-400/20 
                       focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
              placeholder="••••••••"
              minLength={6}
              required
            />
            <p className="text-yellow-400/40 text-xs mt-1">
              {!isLogin && 'A senha deve ter pelo menos 6 caracteres'}
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold 
                     py-3 px-4 rounded-lg hover:from-yellow-300 hover:to-yellow-400 
                     focus:ring-2 focus:ring-yellow-400/20 transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Aguarde...' : isLogin ? 'Entrar' : 'Criar conta'}
          </button>

          <button
            type="button"
            onClick={switchMode}
            className="w-full text-yellow-400/60 hover:text-yellow-400 text-sm"
          >
            {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Entre'}
          </button>
        </form>
      </div>
    </div>
  );
}