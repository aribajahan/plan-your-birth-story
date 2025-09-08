export interface TestimonialItem {
  quote: string;
  author: string;
}

export const testimonialsData: TestimonialItem[] = [
  {
    quote: "This made me feel so much more confident about advocating for myself.",
    author: "Sarah M."
  },
  {
    quote: "Finally, a birth plan tool that doesn't make me feel like I'm just checking boxes.",
    author: "Jessica K."
  }
];

export const testimonialsConfig = {
  title: "What families are saying",
  illustration: {
    src: "/lovable-uploads/3c986592-ed47-4d38-bc5e-ab626b90d3f5.png",
    alt: "Three pregnant women with a stroller - representing community support"
  }
};