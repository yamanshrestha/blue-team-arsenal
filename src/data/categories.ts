import { CategoryInfo } from '@/types/tool';

export const categories: CategoryInfo[] = [
  {
    id: 'siem',
    name: 'SIEM Tools',
    description: 'Security Information and Event Management solutions for log aggregation and threat detection',
    icon: 'Shield',
  },
  {
    id: 'soar',
    name: 'SOAR Tools',
    description: 'Security Orchestration, Automation, and Response solutions for incident management',
    icon: 'Workflow',
  },
  {
    id: 'phishing-analysis',
    name: 'Phishing Analysis',
    description: 'Tools for analyzing and investigating phishing emails, URLs, and campaigns',
    icon: 'Mail',
  },
  {
    id: 'malware-analysis',
    name: 'Malware Analysis',
    description: 'Static and dynamic analysis tools for investigating malicious software',
    icon: 'Bug',
  },
  {
    id: 'threat-intelligence',
    name: 'Threat Intelligence',
    description: 'Platforms for gathering, analyzing, and sharing threat data and indicators',
    icon: 'Brain',
  },
  {
    id: 'network-analysis',
    name: 'Network Analysis',
    description: 'Tools for capturing, analyzing, and monitoring network traffic',
    icon: 'Network',
  },
  {
    id: 'edr',
    name: 'EDR',
    description: 'Endpoint Detection and Response solutions for endpoint security monitoring',
    icon: 'Monitor',
  },
  {
    id: 'forensics',
    name: 'Forensics',
    description: 'Digital forensics tools for evidence collection and incident investigation',
    icon: 'Search',
  },
];

export const getCategoryById = (id: string): CategoryInfo | undefined => {
  return categories.find(cat => cat.id === id);
};
