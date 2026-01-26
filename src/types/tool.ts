export interface Tool {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  category: Category;
  pricing: 'free' | 'freemium' | 'paid';
  website: string;
  logo?: string;
  features?: string[];
}

export type Category = 
  | 'siem'
  | 'soar'
  | 'phishing-analysis'
  | 'malware-analysis'
  | 'threat-intelligence'
  | 'network-analysis'
  | 'edr'
  | 'forensics'
  | 'trainings';

export interface CategoryInfo {
  id: Category;
  name: string;
  description: string;
  icon: string;
}
