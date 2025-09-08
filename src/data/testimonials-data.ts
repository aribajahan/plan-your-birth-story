export interface TestimonialItem {
  quote: string;
  author: string;
  location?: string;
}

export const testimonialsData: TestimonialItem[] = [
  {
    quote: "This made me feel so much more confident about advocating for myself. When things didn't go as planned, I knew what questions to ask.",
    author: "Sarah M.",
    location: "First-time mom, Seattle"
  },
  {
    quote: "My partner felt confident speaking up for me during labor because we'd practiced the scripts together. It made such a difference.",
    author: "Jessica & David",
    location: "New parents, Austin"
  },
  {
    quote: "Asha helped me understand that there's no 'perfect' birth plan - just one that prepares you well. That took so much pressure off.",
    author: "Maya L.",
    location: "Third pregnancy, Denver"
  }
];

export const testimonialsConfig = {
  title: "What Families Are Saying",
  illustration: {
    src: "/lovable-uploads/3c986592-ed47-4d38-bc5e-ab626b90d3f5.png",
    alt: "Three pregnant women with a stroller - representing community support"
  }
};