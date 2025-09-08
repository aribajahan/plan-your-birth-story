export const appConfig = {
  name: "Asha",
  tagline: "Birth plans that work for real families",
  
  chat: {
    initialMessage: "Hi! I'm here to help you create a birth plan that truly reflects what matters to you. Think of this as having a conversation with a supportive friend who's been through this before and wants to help you feel prepared and confident. Let's start with something that many people feel conflicted about - how are you thinking about pain management during labor? There's no right answer here, just what feels right for you.",
    totalSteps: 5
  },
  
  openai: {
    model: "gpt-4.1-2025-04-14",
    maxTokens: 180
  },
  
  progress: {
    milestones: {
      25: "🌟 Great start! You're making good progress on your birth plan. Let's keep exploring your preferences.",
      50: "🎉 Wonderful! You're halfway through building your birth plan. Your vision is really taking shape.",
      75: "✨ Amazing progress! Your birth plan is looking comprehensive. Let's cover the final details.",
      90: "🎊 You're almost there! Just a few more details and your birth plan will be complete.",
      100: "🌈 Congratulations! Your birth plan is complete. You've thoughtfully considered all the important aspects of your birth experience."
    }
  }
} as const;