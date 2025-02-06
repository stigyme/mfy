import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function AboutUs() {
  const { theme } = useTheme();
  
  const handleContactClick = () => {
    window.open('https://api.whatsapp.com/send?phone=5511976712731', '_blank'); // Replace with your actual WhatsApp number
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="glass-effect rounded-3xl p-8 md:p-12 shadow-2xl">
        <h1 className={`text-4xl md:text-5xl font-bold mb-8 tracking-tight text-center ${
          theme === 'light' ? 'text-black' : 'text-gradient glow'
        }`}>
          Sobre Nós
        </h1>
        
        <div className={`space-y-6 leading-relaxed ${
          theme === 'light' ? 'text-gray-800' : 'text-white/80'
        }`}>
          <p>
            A Leads For You é uma empresa de Consultoria Especializada em Performance, que faz parte de um Hub de Negócios feito para impulsionar Negócios.
          </p>
          
          <p>
            O principal objetivo está em dedicar 100% dos esforços na melhora dos resultados dos clientes e, para isso, é fundamental que haja uma ferramenta que facilite a análise de dados das campanhas.
          </p>
          
          <p>
            Assim, nasceu o Metrics For You. Uma plataforma que calcula os principais KPIs de uma campanha de anúncios e dá dicas de como aumentar a performance de cada um dos indicadores-chave.
          </p>
          
          <p>
            Se você quer saber mais sobre o trabalho da Leads For You ou precisa de uma força nas suas campanhas, é só entrar em contato.
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={handleContactClick}
            className={`font-semibold py-4 px-8 rounded-xl flex items-center gap-3 transition-all duration-300
                     group ${
                       theme === 'light'
                         ? 'bg-gradient-to-r from-black to-black/80 text-white hover:from-black/90 hover:to-black/70 hover:shadow-lg hover:shadow-black/20'
                         : 'bg-gradient-to-r from-[#FECF00] to-[#FECF00]/80 text-black hover:from-[#FECF00]/90 hover:to-[#FECF00]/70 hover:shadow-lg hover:shadow-[#FECF00]/20'
                     }`}
          >
            Entre em Contato
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
}