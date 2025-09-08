import type { UserPreferences, DiscussedTopics } from "@/types/shared";

export const generateScriptPreview = (preferences: UserPreferences, phase: string) => {
  const scripts = {
    pain_natural: {
      title: "Discussing Natural Pain Management",
      content: "I'm planning to try natural comfort measures during labor, including movement, breathing techniques, and possibly water therapy. I'd like the room to be conducive to these methods. Can we discuss what support your team can provide?",
      category: "Pain Management"
    },
    pain_medical: {
      title: "Pain Relief Options",
      content: "I'm interested in medical pain management options during labor. Can you walk me through the timing for an epidural and what to expect? I want to understand my choices so I can make informed decisions.",
      category: "Pain Management"
    },
    environment_quiet: {
      title: "Creating a Calm Birth Environment",
      content: "I'm hoping for a calm, peaceful birth environment with dimmed lights and minimal interruptions. Can we discuss how to coordinate care while respecting this atmosphere?",
      category: "Environment"
    },
    environment_active: {
      title: "Active Birth Preferences",
      content: "I'd like to stay active during labor with freedom to move and change positions. Can we discuss the monitoring options that would allow this mobility?",
      category: "Environment"
    }
  };

  // Choose appropriate script based on preferences and phase
  let scriptKey = '';
  if (phase === 'pain') {
    if (preferences.painManagementApproach === 'natural') {
      scriptKey = 'pain_natural';
    } else if (preferences.painManagementApproach === 'medical') {
      scriptKey = 'pain_medical';
    }
  } else if (phase === 'labor') {
    if (preferences.environmentStyle === 'quiet') {
      scriptKey = 'environment_quiet';
    } else if (preferences.environmentStyle === 'lively') {
      scriptKey = 'environment_active';
    }
  }

  return scripts[scriptKey as keyof typeof scripts];
};

export const shouldAddRealityCheck = (message: string, phase: string): boolean => {
  const lowerMessage = message.toLowerCase();
  
  // Add reality checks for specific scenarios
  if (phase === 'pain' && (lowerMessage.includes('no pain') || lowerMessage.includes('completely natural'))) return true;
  if (phase === 'labor' && (lowerMessage.includes('perfect') || lowerMessage.includes('exactly as planned'))) return true;
  if (lowerMessage.includes('worried') || lowerMessage.includes('scared') || lowerMessage.includes('anxious')) return true;
  
  return Math.random() > 0.8; // Occasional random reality checks
};

export const generateRealityCheck = (phase: string, preferences: UserPreferences) => {
  const realityChecks = {
    pain: {
      natural: {
        title: "Gentle Reality Check: Pain in Labor",
        content: "Natural methods are wonderful and can be very effective. Remember that labor pain intensity varies greatly, and it's wise to stay flexible. Many women find that being open to all options - including medical pain relief if needed - actually helps them feel more confident and relaxed."
      },
      medical: {
        title: "Gentle Reality Check: Medical Options",
        content: "Medical pain relief can be a great choice and doesn't make you 'less strong.' Every birth is different, and the goal is a healthy mom and baby. Having a plan while staying flexible allows you to make the best decisions in the moment."
      }
    },
    labor: {
      environment: {
        title: "Gentle Reality Check: Birth Environment",
        content: "Creating your ideal environment is wonderful, and your care team wants to support your vision. Remember that medical needs might require some adjustments, and that's completely normal. The most important thing is that you and your baby are safe and healthy."
      }
    },
    general: {
      title: "Gentle Reality Check: Birth Plans",
      content: "Birth plans are beautiful guides that help communicate your hopes and values. They're most helpful when they're flexible - think of them as your preferences rather than strict rules. Your care team is your partner in creating the best possible experience for you and your baby."
    }
  };

  // Choose appropriate reality check
  if (phase === 'pain') {
    if (preferences.painManagementApproach === 'natural') return realityChecks.pain.natural;
    if (preferences.painManagementApproach === 'medical') return realityChecks.pain.medical;
  }
  
  if (phase === 'labor') return realityChecks.labor.environment;
  
  return realityChecks.general;
};