import React, { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface FAQ {
  question: string;
  answer: string;
}

export function Support() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { theme } = useTheme();

  const faqs: FAQ[] = [
    {
      question: "Como usar as calculadoras da Metrics For You?",
      answer: "É simples! Selecione a métrica que deseja calcular, insira os dados solicitados nos campos correspondentes e clique em 'Calcular'. Você receberá o resultado junto com uma análise detalhada e recomendações personalizadas para melhorar seus resultados."
    },
    {
      question: "Como os dados inseridos nas calculadoras são protegidos?",
      answer: "A Metrics For You não armazena nenhum dado inserido nas calculadoras. Todos os cálculos são realizados localmente no seu navegador, garantindo total privacidade e segurança das suas informações."
    },
    {
      question: "Posso usar a calculadora em campanhas de qualquer plataforma?",
      answer: "Sim! As métricas calculadas são universais e podem ser aplicadas a campanhas de qualquer plataforma de marketing digital, como Google Ads, Facebook Ads, Instagram Ads, LinkedIn Ads, entre outras."
    },
    {
      question: "Preciso pagar para usar a Metrics For You?",
      answer: "Não! A Metrics For You é uma ferramenta gratuita desenvolvida pela Leads For You para ajudar profissionais e empresas a otimizarem suas campanhas de marketing digital."
    },
    {
      question: "Posso acessar a Metrics For You em dispositivos móveis?",
      answer: "Sim! A plataforma é totalmente responsiva e pode ser acessada de qualquer dispositivo com acesso à internet, incluindo smartphones e tablets."
    },
    {
      question: "O que fazer se encontrar um erro ou um bug?",
      answer: "Entre em contato conosco através do botão 'Entre em Contato' na página 'Sobre Nós'. Nossa equipe técnica irá analisar e corrigir o problema o mais rápido possível."
    },
    {
      question: "A Metrics For You é atualizada regularmente?",
      answer: "Sim! Estamos constantemente atualizando nossas métricas e análises para acompanhar as mudanças do mercado digital e fornecer as melhores insights possíveis para nossos usuários."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="glass-effect rounded-3xl p-8 md:p-12 shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <MessageCircle className={`w-8 h-8 ${theme === 'light' ? 'text-black' : 'text-[#FECF00]'}`} />
          <h1 className={`text-4xl md:text-5xl font-bold tracking-tight ${
            theme === 'light' ? 'text-black' : 'text-gradient glow'
          }`}>
            Perguntas Frequentes
          </h1>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass-card rounded-xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 flex items-center justify-between gap-4 text-left"
              >
                <span className={`font-medium transition-colors duration-300 ${
                  theme === 'light'
                    ? 'text-black/90 hover:text-black'
                    : 'text-[#FECF00]/90 hover:text-[#FECF00]'
                }`}>
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${
                    theme === 'light'
                      ? 'text-black/60'
                      : 'text-[#FECF00]/60'
                  } ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300
                         ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
              >
                <p className={`px-6 pb-6 leading-relaxed ${
                  theme === 'light' ? 'text-gray-800' : 'text-white/80'
                }`}>
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}