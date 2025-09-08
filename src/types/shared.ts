export interface UserPreferences {
  painManagementApproach?: 'natural' | 'medical' | 'flexible';
  environmentStyle?: 'quiet' | 'lively' | 'flexible';
  supportNeeds?: 'minimal' | 'moderate' | 'extensive';
  communicationStyle?: 'direct' | 'gentle' | 'detailed';
  birthLocation?: 'hospital' | 'birthing-center' | 'home';
  previousExperience?: 'first-time' | 'experienced' | 'mixed';
}

export interface DiscussedTopics {
  painManagement: boolean;
  environment: boolean;
  positions: boolean;
  support: boolean;
  expectations: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'reality-check' | 'summary' | 'script-preview';
  realityCheck?: {
    title: string;
    content: string;
  };
  scriptPreview?: {
    title: string;
    content: string;
    category: string;
  };
}

export type AppMode = 'home' | 'chat' | 'form';

export interface SectionProps {
  className?: string;
}

export interface CTAProps {
  onGetStarted: () => void;
}