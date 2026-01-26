import { Tool } from '@/types/tool';

export const tools: Tool[] = [
  // SIEM Tools
  {
    id: 'splunk',
    name: 'Splunk',
    description: 'Enterprise-grade SIEM platform for security analytics and monitoring',
    longDescription: 'Splunk is a powerful platform for searching, monitoring, and analyzing machine-generated data. It provides real-time visibility into security events and enables rapid threat detection.',
    category: 'siem',
    pricing: 'paid',
    website: 'https://www.splunk.com',
    features: ['Real-time monitoring', 'Custom dashboards', 'Machine learning', 'Threat intelligence integration'],
  },
  {
    id: 'elastic-siem',
    name: 'Elastic SIEM',
    description: 'Open-source SIEM built on the Elastic Stack for scalable security analytics',
    category: 'siem',
    pricing: 'freemium',
    website: 'https://www.elastic.co/security',
    features: ['Free tier available', 'Scalable architecture', 'Built-in detection rules', 'MITRE ATT&CK mapping'],
  },
  {
    id: 'wazuh',
    name: 'Wazuh',
    description: 'Free, open-source security platform for threat detection and compliance',
    category: 'siem',
    pricing: 'free',
    website: 'https://wazuh.com',
    features: ['Open source', 'File integrity monitoring', 'Vulnerability detection', 'Cloud security'],
  },
  {
    id: 'qradar',
    name: 'IBM QRadar',
    description: 'Enterprise SIEM with advanced threat detection and response capabilities',
    category: 'siem',
    pricing: 'paid',
    website: 'https://www.ibm.com/qradar',
    features: ['AI-powered analytics', 'Network flow analysis', 'User behavior analytics', 'Automated response'],
  },

  // Phishing Analysis
  {
    id: 'phishtool',
    name: 'PhishTool',
    description: 'Automated phishing email analysis and investigation platform',
    category: 'phishing-analysis',
    pricing: 'freemium',
    website: 'https://www.phishtool.com',
    features: ['Email header analysis', 'URL scanning', 'Attachment analysis', 'Threat indicators'],
  },
  {
    id: 'urlscan',
    name: 'URLScan.io',
    description: 'Free URL and website scanner for analyzing suspicious links',
    category: 'phishing-analysis',
    pricing: 'freemium',
    website: 'https://urlscan.io',
    features: ['Screenshot capture', 'DOM analysis', 'Network requests', 'API access'],
  },
  {
    id: 'virustotal',
    name: 'VirusTotal',
    description: 'Multi-engine scanner for files, URLs, and domains',
    category: 'phishing-analysis',
    pricing: 'freemium',
    website: 'https://www.virustotal.com',
    features: ['70+ antivirus engines', 'URL scanning', 'File analysis', 'API integration'],
  },
  {
    id: 'emailrep',
    name: 'EmailRep',
    description: 'Email address reputation and risk scoring service',
    category: 'phishing-analysis',
    pricing: 'freemium',
    website: 'https://emailrep.io',
    features: ['Reputation scoring', 'Breach detection', 'Domain analysis', 'API access'],
  },

  // Malware Analysis
  {
    id: 'any-run',
    name: 'ANY.RUN',
    description: 'Interactive malware sandbox for dynamic analysis',
    category: 'malware-analysis',
    pricing: 'freemium',
    website: 'https://any.run',
    features: ['Interactive sandbox', 'Network traffic capture', 'Process monitoring', 'IOC extraction'],
  },
  {
    id: 'hybrid-analysis',
    name: 'Hybrid Analysis',
    description: 'Free automated malware analysis service with detailed reports',
    category: 'malware-analysis',
    pricing: 'free',
    website: 'https://www.hybrid-analysis.com',
    features: ['Automated analysis', 'YARA rules', 'API access', 'Behavior reports'],
  },
  {
    id: 'cuckoo',
    name: 'Cuckoo Sandbox',
    description: 'Open-source automated malware analysis system',
    category: 'malware-analysis',
    pricing: 'free',
    website: 'https://cuckoosandbox.org',
    features: ['Self-hosted', 'Customizable', 'API integration', 'Detailed reports'],
  },
  {
    id: 'remnux',
    name: 'REMnux',
    description: 'Linux toolkit for reverse engineering and analyzing malware',
    category: 'malware-analysis',
    pricing: 'free',
    website: 'https://remnux.org',
    features: ['Pre-built tools', 'Static analysis', 'Dynamic analysis', 'Memory forensics'],
  },

  // Threat Intelligence
  {
    id: 'misp',
    name: 'MISP',
    description: 'Open-source threat intelligence platform for sharing IOCs',
    category: 'threat-intelligence',
    pricing: 'free',
    website: 'https://www.misp-project.org',
    features: ['IOC sharing', 'Correlation', 'STIX/TAXII support', 'Community feeds'],
  },
  {
    id: 'opencti',
    name: 'OpenCTI',
    description: 'Open-source platform for managing cyber threat intelligence',
    category: 'threat-intelligence',
    pricing: 'free',
    website: 'https://www.opencti.io',
    features: ['STIX2 native', 'Knowledge graph', 'Connector ecosystem', 'MITRE ATT&CK'],
  },
  {
    id: 'alienvault-otx',
    name: 'AlienVault OTX',
    description: 'Open threat exchange community for sharing threat data',
    category: 'threat-intelligence',
    pricing: 'free',
    website: 'https://otx.alienvault.com',
    features: ['Community pulses', 'API access', 'Integration tools', 'Global data'],
  },
  {
    id: 'threatfox',
    name: 'ThreatFox',
    description: 'Free IOC sharing platform by abuse.ch',
    category: 'threat-intelligence',
    pricing: 'free',
    website: 'https://threatfox.abuse.ch',
    features: ['IOC database', 'API access', 'Daily exports', 'Malware family tracking'],
  },

  // Network Analysis
  {
    id: 'wireshark',
    name: 'Wireshark',
    description: 'Industry-standard network protocol analyzer',
    category: 'network-analysis',
    pricing: 'free',
    website: 'https://www.wireshark.org',
    features: ['Deep packet inspection', 'Protocol decode', 'Filtering', 'Export options'],
  },
  {
    id: 'zeek',
    name: 'Zeek',
    description: 'Powerful network analysis framework for security monitoring',
    category: 'network-analysis',
    pricing: 'free',
    website: 'https://zeek.org',
    features: ['Connection logging', 'Protocol analysis', 'Scripting language', 'File extraction'],
  },
  {
    id: 'suricata',
    name: 'Suricata',
    description: 'High-performance IDS, IPS, and network security monitoring',
    category: 'network-analysis',
    pricing: 'free',
    website: 'https://suricata.io',
    features: ['Multi-threaded', 'Protocol detection', 'File extraction', 'Lua scripting'],
  },
  {
    id: 'networkiner',
    name: 'NetworkMiner',
    description: 'Network forensic analysis tool for Windows',
    category: 'network-analysis',
    pricing: 'freemium',
    website: 'https://www.netresec.com/index.ashx?page=NetworkMiner',
    features: ['PCAP analysis', 'File extraction', 'Image reconstruction', 'Credential extraction'],
  },

  // EDR
  {
    id: 'velociraptor',
    name: 'Velociraptor',
    description: 'Open-source endpoint visibility and collection tool',
    category: 'edr',
    pricing: 'free',
    website: 'https://docs.velociraptor.app',
    features: ['Endpoint queries', 'Artifact collection', 'Hunting', 'VQL language'],
  },
  {
    id: 'osquery',
    name: 'osquery',
    description: 'SQL-powered operating system instrumentation and analytics',
    category: 'edr',
    pricing: 'free',
    website: 'https://osquery.io',
    features: ['SQL interface', 'Cross-platform', 'Real-time queries', 'Fleet management'],
  },
  {
    id: 'limacharlie',
    name: 'LimaCharlie',
    description: 'Cloud-native SecOps platform with EDR capabilities',
    category: 'edr',
    pricing: 'freemium',
    website: 'https://limacharlie.io',
    features: ['Detection & Response', 'Automation', 'API-first', 'Free tier'],
  },
  {
    id: 'crowdstrike',
    name: 'CrowdStrike Falcon',
    description: 'Enterprise EDR with AI-powered threat detection',
    category: 'edr',
    pricing: 'paid',
    website: 'https://www.crowdstrike.com',
    features: ['AI detection', 'Threat intelligence', 'Managed hunting', 'Cloud-native'],
  },

  // Forensics
  {
    id: 'autopsy',
    name: 'Autopsy',
    description: 'Open-source digital forensics platform',
    category: 'forensics',
    pricing: 'free',
    website: 'https://www.autopsy.com',
    features: ['Disk analysis', 'Timeline analysis', 'Keyword search', 'Module ecosystem'],
  },
  {
    id: 'volatility',
    name: 'Volatility',
    description: 'Advanced memory forensics framework',
    category: 'forensics',
    pricing: 'free',
    website: 'https://www.volatilityfoundation.org',
    features: ['Memory analysis', 'Malware detection', 'Process analysis', 'Plugin system'],
  },
  {
    id: 'ftk-imager',
    name: 'FTK Imager',
    description: 'Free forensic imaging tool by Exterro',
    category: 'forensics',
    pricing: 'free',
    website: 'https://www.exterro.com/ftk-imager',
    features: ['Disk imaging', 'Evidence preview', 'Hash verification', 'Memory capture'],
  },
  {
    id: 'plaso',
    name: 'Plaso',
    description: 'Super timeline creation tool for digital forensics',
    category: 'forensics',
    pricing: 'free',
    website: 'https://plaso.readthedocs.io',
    features: ['Timeline creation', 'Multiple parsers', 'Output formats', 'Log2Timeline'],
  },
];

export const getToolsByCategory = (categoryId: string): Tool[] => {
  return tools.filter(tool => tool.category === categoryId);
};

export const searchTools = (query: string): Tool[] => {
  const lowerQuery = query.toLowerCase();
  return tools.filter(
    tool =>
      tool.name.toLowerCase().includes(lowerQuery) ||
      tool.description.toLowerCase().includes(lowerQuery)
  );
};
