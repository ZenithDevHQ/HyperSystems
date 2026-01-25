export interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "One of the best permissions manager for Hytale! I enjoy the clean layout and how easy it is to configure. The visual web editor is a game changer.",
    author: "ServerOwner42",
    role: "Server Administrator",
  },
  {
    id: 2,
    text: "This is a quality plugin, probably one of the best permissions plugins I've used. The context-aware permissions feature is incredibly powerful.",
    author: "CraftMaster",
    role: "Network Owner",
  },
  {
    id: 3,
    text: "Thanks for the help with the plugin! I really like how lightweight it is compared to alternatives. Does exactly what it says, nothing more, nothing less.",
    author: "BlockBuilder",
    role: "Community Manager",
  },
  {
    id: 4,
    text: "Thank you so much for the nice update with browser permission system. Makes managing my server so much easier. Highly recommended!",
    author: "HytaleHost",
    role: "Server Host",
  },
];
