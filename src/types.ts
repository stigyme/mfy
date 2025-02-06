export interface MetricField {
  id: string;
  label: string;
  placeholder: string;
}

export interface MetricAnalysis {
  overview: string;
  insights: string[];
  recommendations: string[];
}

export interface Metric {
  id: string;
  name: string;
  description: string;
  explanation: string;
  fields: MetricField[];
  calculate: (values: Record<string, number>) => number;
  formatResult: (result: number) => string;
  getComment: (result: number) => string;
  getDetailedAnalysis?: (result: number, values: Record<string, number>) => MetricAnalysis;
}