export interface FeaturedCard {
  id: number;
  title: string;
  description: string;
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
