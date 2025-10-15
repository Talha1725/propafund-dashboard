export interface PromoCardData {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  tagText: string;
  timerText: string;
  initialDays: number;
  initialHours: number;
  initialMins: number;
  seatsLeft: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PromoCardResponse {
  success: boolean;
  data: PromoCardData[];
  message: string;
}

export interface PromoCardProps {
  icon: string;
  iconAlt: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  tagText: string;
  timerText?: string;
  initialDays?: number;
  initialHours?: number;
  initialMins?: number;
  seatsLeft?: number;
}
