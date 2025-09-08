export interface FAQItem {
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    question: "Is this medical advice?",
    answer: "No, we're a planning tool that helps you organize your preferences and communicate with your medical team. Always work with your healthcare providers for medical decisions."
  },
  {
    question: "What if I change my mind during labor?",
    answer: "That's completely normal! Birth plans are starting points, not contracts. We help you plan for flexibility and changing circumstances."
  },
  {
    question: "How long does it take?",
    answer: "Most people complete their birth plan in 20-30 minutes, but you can save and return anytime. The chat approach tends to be faster, while forms allow more detailed reflection."
  },
  {
    question: "Can my partner use this too?",
    answer: "Absolutely! We include specific guidance for partners and support people throughout the process."
  },
  {
    question: "What format do I get?",
    answer: "You'll receive a professional PDF birth plan plus a communication toolkit with personalized scripts. Both can be printed or shared digitally."
  }
];