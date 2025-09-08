import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
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

export const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="py-8 lg:py-12" style={{ backgroundColor: 'hsl(var(--bold-yellow))' }}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-20">
        
        <h2 className="text-6xl font-bold mb-16 text-center" style={{ 
          fontFamily: 'Crimson Text, serif',
          color: 'hsl(var(--deep-black))'
        }}>
          Questions?
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300" style={{ backgroundColor: 'hsl(var(--cream-base))' }}>
              <button
                className="w-full px-12 py-8 text-left flex items-center justify-between hover:bg-cream-base/50 transition-all duration-300"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <h3 className="text-2xl font-bold" style={{ color: 'hsl(var(--deep-black))' }}>{faq.question}</h3>
                {openFaq === index ? (
                  <Minus className="w-8 h-8" style={{ color: 'hsl(var(--vibrant-coral))' }} />
                ) : (
                  <Plus className="w-8 h-8" style={{ color: 'hsl(var(--vibrant-coral))' }} />
                )}
              </button>
              {openFaq === index && (
                <div className="px-12 pb-8 animate-accordion-down">
                  <p className="text-xl leading-relaxed" style={{ color: 'hsl(var(--deep-black))' }}>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};