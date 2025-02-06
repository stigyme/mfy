import { Metric } from '../types';

// Top 10 most common metrics
export const commonMetrics: Metric[] = [
  {
    id: 'ctr',
    name: 'Taxa de Cliques (CTR)',
    description: 'Mede a proporção de pessoas que clicaram no seu anúncio em relação ao total de impressões.',
    explanation: 'Um CTR de 2% significa que a cada 100 pessoas que viram seu anúncio, 2 clicaram nele. Um CTR maior indica que seu anúncio é mais relevante para o público-alvo.',
    fields: [
      { id: 'clicks', label: 'Número de Cliques', placeholder: 'Ex: 100' },
      { id: 'impressions', label: 'Número de Impressões', placeholder: 'Ex: 1000' }
    ],
    calculate: (values) => (values.clicks / values.impressions) * 100,
    formatResult: (result) => `${result.toFixed(2)}%`,
    getComment: (result) => result >= 2 
      ? 'Ótimo CTR! Seus anúncios estão muito relevantes.' 
      : result >= 1 
        ? 'CTR razoável. Há espaço para melhorias no texto e segmentação.' 
        : 'CTR baixo. Revise a relevância dos anúncios para o público-alvo.',
    getDetailedAnalysis: (result, values) => {
      const performance = result >= 2 ? 'excelente' : result >= 1 ? 'regular' : 'abaixo do esperado';
      const clickRate = (values.clicks / values.impressions) * 100;
      
      return {
        overview: `Seu CTR está ${performance} com ${result.toFixed(2)}%. Isso significa que de cada 100 impressões, ${clickRate.toFixed(1)} pessoas clicam no seu anúncio.`,
        insights: [
          `Taxa de engajamento: ${result < 1 ? 'Baixa' : result < 2 ? 'Média' : 'Alta'}`,
          `Eficiência do anúncio: ${values.clicks} cliques obtidos de ${values.impressions} impressões`,
          `Custo-benefício: ${result >= 2 ? 'Ótimo' : result >= 1 ? 'Regular' : 'Precisa melhorar'}`
        ],
        recommendations: [
          'Teste diferentes títulos e descrições para aumentar a relevância',
          'Refine a segmentação do público-alvo',
          'Analise os horários de melhor performance',
          'Considere ajustar o orçamento para horários mais eficientes'
        ]
      };
    }
  },
  {
    id: 'cpc',
    name: 'Custo por Clique (CPC)',
    description: 'Calcula quanto você está pagando, em média, por cada clique em seus anúncios.',
    explanation: 'Um CPC de R$ 2,00 significa que você paga R$ 2,00 cada vez que alguém clica no seu anúncio. Quanto menor o CPC, mais eficiente é seu investimento em anúncios.',
    fields: [
      { id: 'cost', label: 'Custo Total da Campanha (R$)', placeholder: 'Ex: 1000' },
      { id: 'clicks', label: 'Número Total de Cliques', placeholder: 'Ex: 500' }
    ],
    calculate: (values) => values.cost / values.clicks,
    formatResult: (result) => `R$ ${result.toFixed(2)}`,
    getComment: (result) => result <= 2 
      ? 'Excelente! Seu CPC está muito competitivo.' 
      : result <= 5 
        ? 'CPC dentro da média do mercado.' 
        : 'Atenção! Considere otimizar seus anúncios para reduzir o CPC.',
    getDetailedAnalysis: (result, values) => {
      const efficiency = result <= 2 ? 'muito eficiente' : result <= 5 ? 'moderadamente eficiente' : 'pouco eficiente';
      return {
        overview: `Seu CPC de R$ ${result.toFixed(2)} está ${efficiency}. Você investiu R$ ${values.cost.toFixed(2)} para obter ${values.clicks} cliques.`,
        insights: [
          `Eficiência do investimento: ${efficiency.charAt(0).toUpperCase() + efficiency.slice(1)}`,
          `Custo total por mil cliques: R$ ${(result * 1000).toFixed(2)}`,
          `Retorno esperado: ${result <= 2 ? 'Alto' : result <= 5 ? 'Médio' : 'Baixo'}`
        ],
        recommendations: [
          'Otimize suas palavras-chave para melhorar a relevância',
          'Ajuste os lances máximos por clique',
          'Teste diferentes segmentações de público',
          'Analise os horários de menor CPC'
        ]
      };
    }
  },
  {
    id: 'conversionRate',
    name: 'Taxa de Conversão',
    description: 'Calcula a porcentagem de visitantes que realizaram uma ação desejada.',
    explanation: 'Uma taxa de conversão de 5% significa que 5 em cada 100 visitantes realizam a ação desejada (como uma compra). Quanto maior a taxa, mais eficiente é seu funil de vendas.',
    fields: [
      { id: 'conversions', label: 'Número de Conversões', placeholder: 'Ex: 50' },
      { id: 'visitors', label: 'Número Total de Visitantes', placeholder: 'Ex: 1000' }
    ],
    calculate: (values) => (values.conversions / values.visitors) * 100,
    formatResult: (result) => `${result.toFixed(2)}%`,
    getComment: (result) => result >= 3 
      ? 'Excelente taxa de conversão! Continue otimizando o funil.' 
      : result >= 1 
        ? 'Taxa de conversão dentro da média. Considere A/B tests.' 
        : 'Taxa de conversão baixa. Analise possíveis pontos de atrito no funil.',
    getDetailedAnalysis: (result, values) => {
      const performance = result >= 3 ? 'excelente' : result >= 1 ? 'regular' : 'baixa';
      return {
        overview: `Sua taxa de conversão de ${result.toFixed(2)}% está ${performance}. De cada 100 visitantes, ${result.toFixed(1)} realizam a ação desejada.`,
        insights: [
          `Performance do funil: ${performance.charAt(0).toUpperCase() + performance.slice(1)}`,
          `Total de conversões: ${values.conversions} de ${values.visitors} visitantes`,
          `Potencial de melhoria: ${result < 1 ? 'Alto' : result < 3 ? 'Médio' : 'Baixo'}`
        ],
        recommendations: [
          'Realize testes A/B para otimizar páginas de conversão',
          'Analise o funil de vendas para identificar pontos de abandono',
          'Melhore a experiência do usuário no processo de conversão',
          'Implemente retargeting para visitantes não convertidos'
        ]
      };
    }
  },
  {
    id: 'roi',
    name: 'Retorno sobre Investimento (ROI)',
    description: 'Calcula o retorno financeiro obtido em relação ao investimento realizado.',
    explanation: 'Um ROI de 200% significa que para cada R$ 1,00 investido, você obteve R$ 2,00 de lucro. ROI positivo indica que sua campanha está gerando lucro.',
    fields: [
      { id: 'revenue', label: 'Receita Total (R$)', placeholder: 'Ex: 10000' },
      { id: 'cost', label: 'Custo Total (R$)', placeholder: 'Ex: 5000' }
    ],
    calculate: (values) => ((values.revenue - values.cost) / values.cost) * 100,
    formatResult: (result) => `${result.toFixed(2)}%`,
    getComment: (result) => result >= 200 
      ? 'ROI excepcional! Sua campanha está muito lucrativa.' 
      : result >= 100 
        ? 'Bom ROI. Sua campanha está gerando lucro.' 
        : result > 0 
          ? 'ROI positivo, mas há espaço para melhorias.' 
          : 'ROI negativo. Reavalie a estratégia da campanha.',
    getDetailedAnalysis: (result, values) => {
      const performance = result >= 200 ? 'excepcional' : result >= 100 ? 'bom' : result > 0 ? 'moderado' : 'negativo';
      const profit = values.revenue - values.cost;
      return {
        overview: `Seu ROI de ${result.toFixed(2)}% está ${performance}. Você obteve um lucro de R$ ${profit.toFixed(2)} sobre um investimento de R$ ${values.cost.toFixed(2)}.`,
        insights: [
          `Lucratividade: ${performance.charAt(0).toUpperCase() + performance.slice(1)}`,
          `Lucro total: R$ ${profit.toFixed(2)}`,
          `Retorno por real investido: R$ ${(profit / values.cost).toFixed(2)}`
        ],
        recommendations: [
          'Identifique os canais mais rentáveis',
          'Otimize campanhas com melhor performance',
          'Reduza investimento em canais de baixo retorno',
          'Teste novas estratégias em escala controlada'
        ]
      };
    }
  },
  {
    id: 'cpa',
    name: 'Custo por Aquisição (CPA)',
    description: 'Mostra quanto você gasta, em média, para adquirir um novo cliente.',
    explanation: 'Um CPA de R$ 50,00 significa que você investe R$ 50,00 para conseguir cada novo cliente. Compare este valor com o lucro médio por cliente para avaliar a viabilidade.',
    fields: [
      { id: 'cost', label: 'Custo Total da Campanha (R$)', placeholder: 'Ex: 5000' },
      { id: 'acquisitions', label: 'Número de Aquisições', placeholder: 'Ex: 100' }
    ],
    calculate: (values) => values.cost / values.acquisitions,
    formatResult: (result) => `R$ ${result.toFixed(2)}`,
    getComment: (result) => result <= 50 
      ? 'CPA muito bom! Sua campanha está eficiente.' 
      : result <= 100 
        ? 'CPA aceitável. Monitore o ROI.' 
        : 'CPA alto. Verifique se está alinhado com seu ticket médio.',
    getDetailedAnalysis: (result, values) => {
      const efficiency = result <= 50 ? 'muito eficiente' : result <= 100 ? 'aceitável' : 'alto';
      return {
        overview: `Seu CPA de R$ ${result.toFixed(2)} está ${efficiency}. Você investiu R$ ${values.cost.toFixed(2)} para adquirir ${values.acquisitions} clientes.`,
        insights: [
          `Eficiência de aquisição: ${efficiency.charAt(0).toUpperCase() + efficiency.slice(1)}`,
          `Custo total mensal: R$ ${(values.cost / 12).toFixed(2)}`,
          `Aquisições mensais: ${Math.round(values.acquisitions / 12)}`
        ],
        recommendations: [
          'Compare o CPA com o valor médio do cliente',
          'Otimize canais de aquisição mais eficientes',
          'Teste diferentes estratégias de targeting',
          'Implemente automação de marketing'
        ]
      };
    }
  },
  {
    id: 'cpl',
    name: 'Custo por Lead (CPL)',
    description: 'Indica quanto você gasta, em média, para gerar um novo lead.',
    explanation: 'Um CPL de R$ 15,00 significa que você investe R$ 15,00 para cada lead gerado. Avalie este custo considerando a taxa de conversão de leads em clientes.',
    fields: [
      { id: 'cost', label: 'Custo Total da Campanha (R$)', placeholder: 'Ex: 3000' },
      { id: 'leads', label: 'Número de Leads Gerados', placeholder: 'Ex: 200' }
    ],
    calculate: (values) => values.cost / values.leads,
    formatResult: (result) => `R$ ${result.toFixed(2)}`,
    getComment: (result) => result <= 15 
      ? 'Ótimo CPL! Continue com a estratégia atual.' 
      : result <= 30 
        ? 'CPL aceitável. Busque otimizações graduais.' 
        : 'CPL alto. Considere revisar sua estratégia de captação.',
    getDetailedAnalysis: (result, values) => {
      const efficiency = result <= 15 ? 'ótimo' : result <= 30 ? 'aceitável' : 'alto';
      return {
        overview: `Seu CPL de R$ ${result.toFixed(2)} está ${efficiency}. Você investiu R$ ${values.cost.toFixed(2)} para gerar ${values.leads} leads.`,
        insights: [
          `Eficiência de geração: ${efficiency.charAt(0).toUpperCase() + efficiency.slice(1)}`,
          `Leads por dia: ${Math.round(values.leads / 30)}`,
          `Custo diário: R$ ${(values.cost / 30).toFixed(2)}`
        ],
        recommendations: [
          'Otimize suas landing pages',
          'Teste diferentes ofertas e calls-to-action',
          'Melhore a qualificação dos leads',
          'Implemente nurturing de leads'
        ]
      };
    }
  },
  {
    id: 'bounceRate',
    name: 'Taxa de Rejeição',
    description: 'Mede a porcentagem de visitantes que saem do site após visualizar apenas uma página.',
    explanation: 'Uma taxa de rejeição de 60% significa que 60% dos visitantes saem do site sem interagir. Quanto menor a taxa, melhor a qualidade do tráfego e do conteúdo.',
    fields: [
      { id: 'bounces', label: 'Número de Rejeições', placeholder: 'Ex: 300' },
      { id: 'sessions', label: 'Número Total de Sessões', placeholder: 'Ex: 1000' }
    ],
    calculate: (values) => (values.bounces / values.sessions) * 100,
    formatResult: (result) => `${result.toFixed(2)}%`,
    getComment: (result) => result <= 40 
      ? 'Taxa de rejeição excelente! Seu conteúdo está muito relevante.' 
      : result <= 70 
        ? 'Taxa de rejeição dentro da média. Busque melhorias graduais.' 
        : 'Taxa de rejeição alta. Revise a qualidade do tráfego e conteúdo.',
    getDetailedAnalysis: (result, values) => {
      const performance = result <= 40 ? 'excelente' : result <= 70 ? 'média' : 'alta';
      return {
        overview: `Sua taxa de rejeição de ${result.toFixed(2)}% está ${performance}. De ${values.sessions} sessões, ${values.bounces} foram rejeições.`,
        insights: [
          `Qualidade do tráfego: ${result <= 40 ? 'Alta' : result <= 70 ? 'Média' : 'Baixa'}`,
          `Engajamento: ${result <= 40 ? 'Forte' : result <= 70 ? 'Moderado' : 'Fraco'}`,
          `Sessões engajadas: ${values.sessions - values.bounces}`
        ],
        recommendations: [
          'Melhore a relevância do conteúdo',
          'Otimize a velocidade de carregamento',
          'Aprimore a experiência mobile',
          'Revise as fontes de tráfego'
        ]
      };
    }
  },
  {
    id: 'customerLifetimeValue',
    name: 'Valor do Cliente (LTV)',
    description: 'Calcula o valor médio que um cliente gera durante todo seu relacionamento com a empresa.',
    explanation: 'Um LTV de R$ 2.400,00 significa que cada cliente gera em média R$ 2.400,00 em receita ao longo do relacionamento. Use este valor para definir quanto investir na aquisição.',
    fields: [
      { id: 'averageValue', label: 'Valor Médio por Compra (R$)', placeholder: 'Ex: 200' },
      { id: 'frequency', label: 'Frequência Anual de Compras', placeholder: 'Ex: 4' },
      { id: 'lifespan', label: 'Anos de Relacionamento', placeholder: 'Ex: 3' }
    ],
    calculate: (values) => values.averageValue * values.frequency * values.lifespan,
    formatResult: (result) => `R$ ${result.toFixed(2)}`,
    getComment: (result) => result >= 2000 
      ? 'LTV excelente! Seus clientes são muito valiosos.' 
      : result >= 1000 
        ? 'Bom LTV. Foque em estratégias de retenção.' 
        : 'LTV baixo. Considere aumentar ticket médio ou frequência de compra.',
    getDetailedAnalysis: (result, values) => {
      const performance = result >= 2000 ? 'excelente' : result >= 1000 ? 'bom' : 'baixo';
      const annualValue = values.averageValue * values.frequency;
      return {
        overview: `Seu LTV de R$ ${result.toFixed(2)} está ${performance}. Cada cliente gera R$ ${annualValue.toFixed(2)} por ano durante ${values.lifespan} anos.`,
        insights: [
          `Valor anual por cliente: R$ ${annualValue.toFixed(2)}`,
          `Frequência de compra: ${values.frequency} vezes por ano`,
          `Ticket médio: R$ ${values.averageValue.toFixed(2)}`
        ],
        recommendations: [
          'Desenvolva programas de fidelidade',
          'Aumente o ticket médio com cross-selling',
          'Melhore a frequência de compra com remarketing',
          'Implemente estratégias de retenção'
        ]
      };
    }
  },
  {
    id: 'engagementRate',
    name: 'Taxa de Engajamento',
    description: 'Mede o nível de interação dos usuários com seu conteúdo.',
    explanation: 'Uma taxa de 5% significa que 5% dos seus seguidores interagem com seu conteúdo. Taxas mais altas indicam conteúdo mais relevante e audiência mais ativa.',
    fields: [
      { id: 'interactions', label: 'Número de Interações', placeholder: 'Ex: 500' },
      { id: 'followers', label: 'Número de Seguidores', placeholder: 'Ex: 10000' }
    ],
    calculate: (values) => (values.interactions / values.followers) * 100,
    formatResult: (result) => `${result.toFixed(2)}%`,
    getComment: (result) => result >= 5 
      ? 'Ótima taxa de engajamento! Seu conteúdo está muito relevante.' 
      : result >= 2 
        ? 'Engajamento razoável. Continue melhorando o conteúdo.' 
        : 'Engajamento baixo. Revise sua estratégia de conteúdo.',
    getDetailedAnalysis: (result, values) => {
      const performance = result >= 5 ? 'excelente' : result >= 2 ? 'razoável' : 'baixo';
      return {
        overview: `Sua taxa de engajamento de ${result.toFixed(2)}% está ${performance}. De ${values.followers} seguidores, ${values.interactions} interagiram com seu conteúdo.`,
        insights: [
          `Nível de engajamento: ${performance.charAt(0).toUpperCase() + performance.slice(1)}`,
          `Interações por seguidor: ${(values.interactions / values.followers).toFixed(3)}`,
          `Alcance efetivo: ${Math.round(values.followers * (result / 100))} seguidores ativos`
        ],
        recommendations: [
          'Analise os tipos de conteúdo mais engajadores',
          'Teste diferentes horários de postagem',
          'Melhore a qualidade visual do conteúdo',
          'Incentive interações com calls-to-action'
        ]
      };
    }
  },
  {
    id: 'averageTimeOnPage',
    name: 'Tempo Médio na Página',
    description: 'Calcula o tempo médio que os visitantes permanecem em uma página.',
    explanation: 'Um tempo médio de 3 minutos indica boa qualidade de conteúdo. Páginas com conteúdo relevante tendem a manter os visitantes por mais tempo.',
    fields: [
      { id: 'totalTime', label: 'Tempo Total (minutos)', placeholder: 'Ex: 3000' },
      { id: 'visitors', label: 'Número de Visitantes', placeholder: 'Ex: 500' }
    ],
    calculate: (values) => values.totalTime / values.visitors,
    formatResult: (result) => `${result.toFixed(2)} minutos`,
    getComment: (result) => result >= 3 
      ? 'Excelente tempo de permanência! Seu conteúdo está envolvente.' 
      : result >= 1 
        ? 'Tempo de permanência razoável. Considere enriquecer o conteúdo.' 
        : 'Tempo de permanência baixo. Revise a qualidade do conteúdo.',
    getDetailedAnalysis: (result, values) => {
      const performance = result >= 3 ? 'excelente' : result >= 1 ? 'razoável' : 'baixo';
      return {
        overview: `Seu tempo médio de ${result.toFixed(2)} minutos por página está ${performance}. Total de ${values.totalTime} minutos distribuídos entre ${values.visitors} visitantes.`,
        insights: [
          `Qualidade do conteúdo: ${performance.charAt(0).toUpperCase() + performance.slice(1)}`,
          `Tempo total de engajamento: ${values.totalTime} minutos`,
          `Média por sessão: ${result.toFixed(2)} minutos`
        ],
        recommendations: [
          'Crie conteúdo mais aprofundado e relevante',
          'Adicione elementos interativos',
          'Otimize a estrutura do conteúdo',
          'Implemente links internos estratégicos'
        ]
      };
    }
  }
];

// Advanced metrics
export const advancedMetrics: Metric[] = [
  {
    id: 'customerAcquisitionCost',
    name: 'Custo de Aquisição de Cliente (CAC)',
    description: 'Calcula o custo total para adquirir um novo cliente, incluindo marketing e vendas.',
    explanation: 'O CAC considera todos os custos envolvidos na aquisição de clientes, incluindo salários, ferramentas e despesas gerais.',
    fields: [
      { id: 'totalCosts', label: 'Custos Totais (R$)', placeholder: 'Ex: 50000' },
      { id: 'newCustomers', label: 'Novos Clientes', placeholder: 'Ex: 100' }
    ],
    calculate: (values) => values.totalCosts / values.newCustomers,
    formatResult: (result) => `R$ ${result.toFixed(2)}`,
    getComment: (result) => result <= 200 
      ? 'CAC eficiente! Continue otimizando.' 
      : 'CAC alto. Revise seus processos de aquisição.',
    getDetailedAnalysis: (result, values) => {
      const efficiency = result <= 200 ? 'eficiente' : result <= 500 ? 'moderado' : 'alto';
      return {
        overview: `Seu CAC de R$ ${result.toFixed(2)} está ${efficiency}. Você investiu R$ ${values.totalCosts.toFixed(2)} para adquirir ${values.newCustomers} novos clientes.`,
        insights: [
          `Eficiência de aquisição: ${efficiency.charAt(0).toUpperCase() + efficiency.slice(1)}`,
          `Custo mensal médio: R$ ${(values.totalCosts / 12).toFixed(2)}`,
          `Clientes por mês: ${Math.round(values.newCustomers / 12)}`
        ],
        recommendations: [
          'Otimize seus canais de aquisição mais eficientes',
          'Analise o funil de vendas para identificar gargalos',
          'Implemente estratégias de retenção para maximizar o valor do cliente',
          'Considere automatizar processos para reduzir custos operacionais'
        ]
      };
    }
  },
  {
    id: 'customerRetentionRate',
    name: 'Taxa de Retenção de Clientes',
    description: 'Mede a capacidade de manter clientes ativos ao longo do tempo.',
    explanation: 'Uma alta taxa de retenção indica satisfação dos clientes e eficiência nas estratégias de fidelização.',
    fields: [
      { id: 'endCustomers', label: 'Clientes no Final do Período', placeholder: 'Ex: 900' },
      { id: 'newCustomers', label: 'Novos Clientes no Período', placeholder: 'Ex: 100' },
      { id: 'startCustomers', label: 'Clientes no Início do Período', placeholder: 'Ex: 1000' }
    ],
    calculate: (values) => ((values.endCustomers - values.newCustomers) / values.startCustomers) * 100,
    formatResult: (result) => `${result.toFixed(2)}%`,
    getComment: (result) => result >= 80 
      ? 'Excelente retenção!' 
      : 'Considere melhorar suas estratégias de retenção.',
    getDetailedAnalysis: (result, values) => {
      const performance = result >= 80 ? 'excelente' : result >= 60 ? 'boa' : 'precisa melhorar';
      const churnRate = 100 - result;
      return {
        overview: `Sua taxa de retenção de ${result.toFixed(2)}% está ${performance}. A taxa de churn é de ${churnRate.toFixed(2)}%.`,
        insights: [
          `Clientes mantidos: ${values.endCustomers - values.newCustomers}`,
          `Novos clientes: ${values.newCustomers}`,
          `Taxa de churn: ${churnRate.toFixed(2)}%`
        ],
        recommendations: [
          'Implemente um programa de fidelidade',
          'Melhore o suporte ao cliente',
          'Colete feedback regularmente',
          'Desenvolva estratégias de engajamento contínuo'
        ]
      };
    }
  },
  {
    id: 'netPromoterScore',
    name: 'Net Promoter Score (NPS)',
    description: 'Mede a satisfação e lealdade dos clientes.',
    explanation: 'O NPS varia de -100 a 100, onde valores acima de 0 são considerados bons e acima de 50 são excelentes.',
    fields: [
      { id: 'promoters', label: 'Número de Promotores', placeholder: 'Ex: 70' },
      { id: 'detractors', label: 'Número de Detratores', placeholder: 'Ex: 20' },
      { id: 'total', label: 'Total de Respondentes', placeholder: 'Ex: 100' }
    ],
    calculate: (values) => ((values.promoters - values.detractors) / values.total) * 100,
    formatResult: (result) => result.toFixed(0),
    getComment: (result) => result >= 50 
      ? 'NPS excelente!' 
      : result >= 0 
        ? 'NPS bom, mas pode melhorar.' 
        : 'NPS negativo. Ação necessária.',
    getDetailedAnalysis: (result, values) => {
      const performance = result >= 50 ? 'excelente' : result >= 0 ? 'bom' : 'precisa melhorar';
      const promotersPercentage = (values.promoters / values.total) * 100;
      const detractorsPercentage = (values.detractors / values.total) * 100;
      const passivePercentage = 100 - promotersPercentage - detractorsPercentage;
      
      return {
        overview: `Seu NPS de ${result.toFixed(0)} está ${performance}. Isso indica o nível de satisfação e lealdade dos seus clientes.`,
        insights: [
          `Promotores: ${promotersPercentage.toFixed(1)}%`,
          `Neutros: ${passivePercentage.toFixed(1)}%`,
          `Detratores: ${detractorsPercentage.toFixed(1)}%`
        ],
        recommendations: [
          'Identifique os motivos de insatisfação dos detratores',
          'Implemente melhorias baseadas no feedback recebido',
          'Desenvolva estratégias para converter neutros em promotores',
          'Mantenha contato regular com promotores para fortalecer o relacionamento'
        ]
      };
    }
  }
];

export const metrics = [...commonMetrics, ...advancedMetrics];