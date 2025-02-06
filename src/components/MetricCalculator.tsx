import React, { useState } from 'react';
import { Calculator, ArrowRight, Info, ChevronDown, LineChart, TrendingUp, Target } from 'lucide-react';
import { Metric } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface MetricCalculatorProps {
  metric: Metric;
}

export function MetricCalculator({ metric }: MetricCalculatorProps) {
  const [values, setValues] = useState<Record<string, number>>({});
  const [result, setResult] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
  const { theme } = useTheme();

  const handleCalculate = () => {
    const calculatedResult = metric.calculate(values);
    setResult(calculatedResult);
    setShowDetailedAnalysis(false);
  };

  const isFormValid = metric.fields.every(field => 
    values[field.id] !== undefined && values[field.id] !== null && !isNaN(values[field.id])
  );

  const getDetailedAnalysis = (result: number) => {
    const analysis = metric.getDetailedAnalysis?.(result, values) || {
      overview: 'Análise não disponível para esta métrica.',
      insights: [],
      recommendations: []
    };

    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="space-y-4">
          <h4 className={`${theme === 'light' ? 'text-black' : 'text-[#FECF00]'} font-medium flex items-center gap-2`}>
            <LineChart className="w-5 h-5" />
            Visão Geral
          </h4>
          <p className={`text-sm leading-relaxed ${theme === 'light' ? 'text-gray-600' : 'text-white/80'}`}>
            {analysis.overview}
          </p>
        </div>

        {analysis.insights && analysis.insights.length > 0 && (
          <div className="space-y-4">
            <h4 className={`${theme === 'light' ? 'text-black' : 'text-[#FECF00]'} font-medium flex items-center gap-2`}>
              <TrendingUp className="w-5 h-5" />
              Insights
            </h4>
            <ul className="space-y-2">
              {analysis.insights.map((insight, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className={`${theme === 'light' ? 'text-black/60' : 'text-[#FECF00]/60'} mt-1`}>•</span>
                  <span className={`${theme === 'light' ? 'text-gray-600' : 'text-white/80'}`}>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {analysis.recommendations && analysis.recommendations.length > 0 && (
          <div className="space-y-4">
            <h4 className={`${theme === 'light' ? 'text-black' : 'text-[#FECF00]'} font-medium flex items-center gap-2`}>
              <Target className="w-5 h-5" />
              Recomendações
            </h4>
            <ul className="space-y-2">
              {analysis.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className={`${theme === 'light' ? 'text-black/60' : 'text-[#FECF00]/60'} mt-1`}>•</span>
                  <span className={`${theme === 'light' ? 'text-gray-600' : 'text-white/80'}`}>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className={`relative border ${theme === 'light' ? 'border-black/10' : 'border-[#FECF00]/10'} rounded-xl p-6 ${theme === 'light' ? 'bg-black/5' : 'bg-[#FECF00]/5'}`}>
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className={`absolute top-4 right-4 p-2 rounded-lg ${
            theme === 'light'
              ? 'hover:bg-black/10'
              : 'hover:bg-[#FECF00]/10'
          } transition-colors duration-300 group`}
          title="Ver explicação"
        >
          <Info className={`w-5 h-5 ${theme === 'light' ? 'text-black/40 group-hover:text-black' : 'text-[#FECF00]/40 group-hover:text-[#FECF00]'}`} />
        </button>

        <h2 className={`sm:mr-10px sm:text-xl lg:mr-px lg:text-2xl font-semibold mb-3 flex items-center gap-3 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
          <Calculator className={`w-6 h-6 ${theme === 'light' ? 'text-black' : 'text-[#FECF00]'}`} />
          {metric.name}
        </h2>
        <p className={`${theme === 'light' ? 'text-gray-600' : 'text-white/80'} mb-2`}>{metric.description}</p>
        
        {showExplanation && (
          <div className="mt-4 p-4 glass-card rounded-lg">
            <p className={`text-sm leading-relaxed ${theme === 'light' ? 'text-gray-600' : 'text-white/60'}`}>
              {metric.explanation}
            </p>
          </div>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {metric.fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <label className={`block text-sm font-medium ${theme === 'light' ? 'text-black' : 'text-white'}`}>
              {field.label}
            </label>
            <input
              type="number"
              value={values[field.id] || ''}
              onChange={(e) => setValues({
                ...values,
                [field.id]: parseFloat(e.target.value) || 0
              })}
              className={`w-full p-3 rounded-lg ${
                theme === 'light'
                  ? 'bg-black/5 text-black border-black/20 placeholder-black/20 focus:border-black focus:ring-black/20'
                  : 'bg-white/5 text-white border-[#FECF00]/20 placeholder-white/20 focus:border-[#FECF00] focus:ring-[#FECF00]/20'
              } transition-all duration-300`}
              placeholder={field.placeholder}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleCalculate}
        disabled={!isFormValid}
        className={`w-full font-semibold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300
                   ${theme === 'light'
                     ? 'bg-gradient-to-r from-black to-black/80 text-white'
                     : 'bg-gradient-to-r from-[#FECF00] to-[#FECF00]/80 text-black'
                   } ${isFormValid 
                     ? theme === 'light'
                       ? 'hover:from-black/90 hover:to-black/70 hover:shadow-lg hover:shadow-black/20'
                       : 'hover:from-[#FECF00]/90 hover:to-[#FECF00]/70 hover:shadow-lg hover:shadow-[#FECF00]/20'
                     : 'opacity-50 cursor-not-allowed'}`}
      >
        Calcular
        <ArrowRight className="w-5 h-5" />
      </button>

      {result !== null && (
        <div className="mt-6 animate-fadeIn space-y-6">
          <div className="glass-card rounded-xl p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className={`text-4xl font-bold mb-2 ${theme === 'light' ? 'text-black' : 'text-[#FECF00] glow'}`}>
                {metric.formatResult(result)}
              </div>
              <div className={`text-sm ${theme === 'light' ? 'text-black/60' : 'text-[#FECF00]/60'}`}>
                Resultado do cálculo
              </div>
            </div>
            
            <div className="p-4 glass-effect rounded-lg">
              <p className={`text-sm leading-relaxed ${theme === 'light' ? 'text-gray-600' : 'text-white/80'}`}>
                {metric.getComment(result)}
              </p>
            </div>

            <button
              onClick={() => setShowDetailedAnalysis(!showDetailedAnalysis)}
              className={`mt-6 w-full flex items-center justify-between p-4 rounded-lg 
                       ${theme === 'light'
                         ? 'border-black/20 hover:border-black/40 bg-black/5 hover:bg-black/10'
                         : 'border-[#FECF00]/20 hover:border-[#FECF00]/40 bg-[#FECF00]/5 hover:bg-[#FECF00]/10'
                       } border transition-all duration-300 group`}
            >
              <span className={`text-sm font-medium ${
                theme === 'light'
                  ? 'text-black/80 group-hover:text-black'
                  : 'text-[#FECF00]/80 group-hover:text-[#FECF00]'
              }`}>
                {showDetailedAnalysis ? 'Ocultar análise detalhada' : 'Ver análise detalhada'}
              </span>
              <ChevronDown 
                className={`w-5 h-5 ${
                  theme === 'light'
                    ? 'text-black/60 group-hover:text-black'
                    : 'text-[#FECF00]/60 group-hover:text-[#FECF00]'
                } transition-transform duration-300 ${showDetailedAnalysis ? 'rotate-180' : ''}`} 
              />
            </button>

            {showDetailedAnalysis && (
              <div className="mt-6 p-6 glass-card rounded-lg">
                {getDetailedAnalysis(result)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}