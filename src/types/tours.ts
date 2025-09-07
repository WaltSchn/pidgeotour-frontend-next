
export type Tour = {
  _id: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  location: string;
  type: string[];
  availableDates: Date[];
  createdAt: Date;
  updatedAt: Date;
  featured?: boolean;
  duration: string;
  meetingPoint: string;
  groupSize: string;
  included: string[];
  languages: string[];
  startTime: string;
};
