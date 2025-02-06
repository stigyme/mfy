import React from 'react';
import { Home, Users, HelpCircle } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const { theme } = useTheme();
  const navItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'about', label: 'Sobre Nós', icon: Users },
    { id: 'support', label: 'Suporte', icon: HelpCircle },
  ];

  return (
    <nav className={`${theme === 'light' ? 'bg-white/80' : 'black'} backdrop-blur-xl border-b ${theme === 'light' ? 'border-black/10' : 'border-[#FECF00]/10'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Home button aligned to the left */}
          <button
            onClick={() => onPageChange('home')}
            className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-300
                     ${currentPage === 'home'
                ? theme === 'light' 
                  ? 'text-black bg-black/10' 
                  : 'text-[#FECF00] bg-[#FECF00]/10'
                : theme === 'light'
                  ? 'text-black/60 hover:text-black hover:bg-black/5'
                  : 'text-[#FECF00]/60 hover:text-[#FECF00] hover:bg-[#FECF00]/5'
              }`}
          >
            <Home className="w-5 h-5" />
            <span className="hidden sm:inline">Início</span>
          </button>

          {/* Other navigation items and theme toggle aligned to the right */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {navItems.slice(1).map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-all duration-300
                           ${currentPage === item.id
                      ? theme === 'light'
                        ? 'text-black bg-black/10'
                        : 'text-[#FECF00] bg-[#FECF00]/10'
                      : theme === 'light'
                        ? 'text-black/60 hover:text-black hover:bg-black/5'
                        : 'text-[#FECF00]/60 hover:text-[#FECF00] hover:bg-[#FECF00]/5'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}
            <div className={`ml-2 border-l ${theme === 'light' ? 'border-black/10' : 'border-[#FECF00]/10'} pl-2`}>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}