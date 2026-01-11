export interface AnalysisResult {
  title: string;
  description: string;
  recommendations: string[];
  status: 'healthy' | 'warning' | 'critical';
}

export interface SoilRecommendation {
  bestCrops: string[];
  explanation: string;
  tips: string[];
}

export interface User {
  id: string;
  email: string;
}

export interface CropHistoryItem {
  id: string;
  timestamp: string;
  image: string;
  result: AnalysisResult;
}

export interface SoilHistoryItem {
  id: string;
  timestamp: string;
  image: string;
  moisture: number;
  result: SoilRecommendation;
}