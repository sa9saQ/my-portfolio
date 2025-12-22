export interface Project {
  id: number;
  titleKey: string;
  descriptionKey: string;
  tags: string[];
  image: string;
  color: string;
  category: "ai" | "web" | "mobile" | "hp";
  github?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    titleKey: "items.schoolHp.title",
    descriptionKey: "items.schoolHp.description",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    image: "/projects/school-hp.png",
    color: "from-indigo-500 to-purple-600",
    category: "hp",
    demo: "https://school-hp-lovat.vercel.app/",
  },
  {
    id: 2,
    titleKey: "items.chatbot.title",
    descriptionKey: "items.chatbot.description",
    tags: ["Next.js", "OpenAI", "TypeScript", "Tailwind"],
    image: "/projects/chatbot.png",
    color: "from-purple-500 to-pink-500",
    category: "ai",
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    id: 3,
    titleKey: "items.portfolio.title",
    descriptionKey: "items.portfolio.description",
    tags: ["React", "Framer Motion", "Tailwind CSS"],
    image: "/projects/portfolio.png",
    color: "from-cyan-500 to-blue-500",
    category: "web",
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    id: 4,
    titleKey: "items.bakeAndBloom.title",
    descriptionKey: "items.bakeAndBloom.description",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image: "/projects/bake-and-bloom.jpg",
    color: "from-amber-600 to-orange-500",
    category: "hp",
    demo: "https://bake-and-bloom.vercel.app/",
  },
  {
    id: 5,
    titleKey: "items.comingSoon.title",
    descriptionKey: "items.comingSoon.description",
    tags: ["TypeScript", "Next.js", "AI"],
    image: "/projects/coming-soon.png",
    color: "from-green-500 to-teal-500",
    category: "ai",
  },
];
