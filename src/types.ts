export interface FeaturedCard {
  id: number;
  title: string;
  date: string;
  quote: string;
  medium: string;
  dimensions: string;
  accentColor: string; // Tailwind class color or hex code
}

export interface TrainerCard {
  id: number;
  name: string;
  role: string;
  quote: string;
  specialty: string;
  experience: string;
  avatarColor: string; // Gradient style for high-quality SVG placeholder
}
