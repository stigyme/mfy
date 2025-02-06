import React from 'react';
import { LogOut, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface UserMenuProps {
  user: any;
  onLogout: () => void;
}

export function UserMenu({ user, onLogout }: UserMenuProps) {
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      onLogout();
      toast.success('Logout realizado com sucesso!');
    } catch (error: any) {
      toast.error('Erro ao fazer logout');
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="text-white">
        <span className="text-yellow-400/60">Olá, </span>
        {user.user_metadata?.name || user.email}
      </div>
      <button
        onClick={handleLogout}
        className="p-2 rounded-lg hover:bg-yellow-400/10 text-yellow-400/60 hover:text-yellow-400 
                 transition-colors duration-200"
        title="Sair"
      >
        <LogOut className="w-5 h-5" />
      </button>
    </div>
  );
}