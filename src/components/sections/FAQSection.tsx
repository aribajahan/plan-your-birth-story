import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { SectionContainer } from "@/components/ui/section-container";
import { faqData } from "@/data/faq-data";
import { colors, typography } from "@/styles/design-tokens";

export const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <SectionContainer backgroundColor={colors.faqBlack} fullBleed={true}>
      <h2 
        className={`${typography.heading.sizes.lg} font-bold mb-16 text-center`}
        style={{ 
          fontFamily: typography.heading.fontFamily,
          color: colors.white
        }}
      >
        Questions?
      </h2>

      <div className="space-y-3">
        {faqData.map((faq, index) => (
          <div key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300" style={{ backgroundColor: colors.faqBlack }}>
            <button
              className="w-full px-12 py-8 text-left flex items-center justify-between hover:bg-white/5 transition-all duration-300"
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
            >
              <h3 className={`${typography.body.sizes.lg} font-bold`} style={{ color: colors.white }}>{faq.question}</h3>
              {openFaq === index ? (
                <Minus className="w-8 h-8" style={{ color: colors.vibrantCoral }} />
              ) : (
                <Plus className="w-8 h-8" style={{ color: colors.vibrantCoral }} />
              )}
            </button>
            {openFaq === index && (
              <div className="px-12 pb-8 animate-accordion-down">
                <p className={`${typography.body.sizes.md} leading-relaxed`} style={{ color: colors.white }}>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};