import React, { useState } from 'react';
import { Calculator, ChevronDown, ArrowLeft } from 'lucide-react';
import { MetricCalculator } from './components/MetricCalculator';
import { commonMetrics, advancedMetrics } from './data/metrics';
import { Navigation } from './components/Navigation';
import { AboutUs } from './pages/AboutUs';
import { Support } from './pages/Support';
import { useTheme } from './contexts/ThemeContext';

function App() {
  const [selectedMetric, setSelectedMetric] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isCalculatorVisible, setIsCalculatorVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const { theme } = useTheme();

  const handleMetricSelect = (metricId: string) => {
    setSelectedMetric(metricId);
    setIsCalculatorVisible(true);
  };

  const handleBackToMetrics = () => {
    setIsCalculatorVisible(false);
    setTimeout(() => setSelectedMetric(''), 300);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutUs />;
      case 'support':
        return <Support />;
      default:
        return (
          <>
            <div className="flex flex-col items-center justify-center mb-16 text-center">
              <div className="relative mb-8">
                <div className={`absolute inset-0 rounded-full ${theme === 'light' ? 'bg-gradient-to-r from-black/10 to-black/10' : 'bg-gradient-to-r from-[#FECF00]/20 to-[#FECF00]/10'} blur-2xl`} />
                <div className={`relative ${theme === 'light' ? 'bg-black/9' : 'bg-[#FECF00]/1'} `}>
                  <img className={`relative ${theme === 'light' ? 'contrast-200 brightness-50 grayscale' : ''} `} src="https://i.postimg.cc/W1CbRfQH/METRICS-LOGOTIPO.png" alt="Metrics For You" />
                </div>
              </div>
              <p className={`text-lg max-w-2xl  ${theme === 'light' ? 'text-gray-700' : 'text-[#FECF00]/90 glow-sm'}`}>
              Otimize suas campanhas de marketing digital com nossa calculadora de métricas. <br></br>Descubra insights valiosos sobre ROI, CAC, LTV e muito mais.
              </p>
            </div>

            <div
              className={`transition-all duration-300 ${
                isCalculatorVisible ? 'opacity-0 -translate-x-full hidden' : 'opacity-100 translate-x-0'
              }`}
            >
              <div className="glass-effect rounded-3xl p-8 shadow-2xl">
                <div className="mb-12">
                  <h2 className={`text-2xl font-semibold mb-6 tracking-tight ${theme === 'light' ? 'text-black' : 'text-[#FECF00] glow-sm'}`}>
                    Métricas Principais
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {commonMetrics.map((metric) => (
                      <div key={metric.id} className="relative group">
                        <button
                          onClick={() => handleMetricSelect(metric.id)}
                          className="w-full  p-6 rounded-2xl glass-card transform transition-all duration-300
                                   hover:scale-[1.02] hover:-translate-y-1 "
                        >
                          <div className="flex items-start gap-4">
                            <div className="mt-1">
                              <Calculator className={`w-5 h-5 ${theme === 'light' ? 'text-black/60 group-hover:text-black' : 'text-[#FECF00]/60 group-hover:text-[#FECF00]'} transition-colors duration-300`} />
                            </div>
                            <div className="text-left">
                              <h4 className={`font-medium mb-2 ${theme === 'light' ? 'text-black/90 group-hover:text-black' : 'text-[#FECF00]/90 group-hover:text-[#FECF00]'} transition-colors duration-300`}>
                                {metric.name}
                              </h4>
                              <p className={`text-sm ${theme === 'light' ? 'text-gray-600 group-hover:text-gray-900' : 'text-white/60 group-hover:text-white/80'} transition-colors duration-300`}>
                                {metric.description}
                              </p>
                            </div>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <h2 className={`text-2xl font-semibold mb-6 flex items-center gap-3 tracking-tight ${theme === 'light' ? 'text-black' : 'text-[#FECF00] glow-sm'}`}>
                    Métricas Avançadas
                  </h2>
                  <button
                    onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                    className="w-full p-6 rounded-2xl glass-card flex items-center justify-between group"
                  >
                    <span className={`${theme === 'light' ? 'text-black/80 group-hover:text-black' : 'text-[#FECF00]/80 group-hover:text-[#FECF00]'} transition-colors duration-300`}>
                      Explorar métricas avançadas
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 ${theme === 'light' ? 'text-black/40 group-hover:text-black' : 'text-[#FECF00]/40 group-hover:text-[#FECF00]'} transition-all duration-300 
                               ${isAdvancedOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isAdvancedOpen && (
                    <div className="mt-4 p-6 glass-effect rounded-2xl space-y-4">
                      {advancedMetrics.map((metric) => (
                        <div key={metric.id} className="relative group">
                          <button
                            onClick={() => handleMetricSelect(metric.id)}
                            className="w-full p-6 rounded-2xl glass-card"
                          >
                            <div className="flex items-start gap-4">
                              <div className="mt-1">
                                <Calculator className={`w-5 h-5 ${theme === 'light' ? 'text-black/60 group-hover:text-black' : 'text-[#FECF00]/60 group-hover:text-[#FECF00]'} transition-colors duration-300`} />
                              </div>
                              <div className="text-left">
                                <h4 className={`font-medium mb-2 ${theme === 'light' ? 'text-black/90 group-hover:text-black' : 'text-[#FECF00]/90 group-hover:text-[#FECF00]'} transition-colors duration-300`}>
                                  {metric.name}
                                </h4>
                                <p className={`text-sm ${theme === 'light' ? 'text-gray-600 group-hover:text-gray-900' : 'text-white/60 group-hover:text-white/80'} transition-colors duration-300`}>
                                  {metric.description}
                                </p>
                              </div>
                            </div>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {selectedMetric && (
              <div
                className={`transition-all duration-300 ${
                  isCalculatorVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                }`}
              >
                <div className="glass-effect rounded-3xl p-8 shadow-2xl">
                  <button
                    onClick={handleBackToMetrics}
                    className={`mb-8 flex items-center gap-2 ${
                      theme === 'light'
                        ? 'text-black/60 hover:text-black'
                        : 'text-[#FECF00]/60 hover:text-[#FECF00]'
                    } transition-colors duration-300 group`}
                  >
                    <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" />
                    <span>Voltar para métricas</span>
                  </button>
                  <MetricCalculator
                    metric={[...commonMetrics, ...advancedMetrics].find((m) => m.id === selectedMetric)!}
                  />
                </div>
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      theme === 'light' 
        ? 'bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,0,0,0.1),rgba(255,255,255,0))]'
        : 'bg-[#000000] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(254,207,0,0.15),rgba(255,255,255,0))]'
    }`}>
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <div className="container mx-auto px-4 py-12 max-w-5xl flex-grow">
        {renderPage()}
      </div>
      <footer className={`py-4 ${theme === 'light' ? 'border-t border-black/10' : 'border-t border-[#FECF00]/10'}`}>
        <div className="container mx-auto px-4 text-center">
          <p className={`text-sm ${theme === 'light' ? 'text-black/60' : 'text-[#FECF00]/60'}`} >
            © 2025 Leads For You. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;