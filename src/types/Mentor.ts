export interface Mentor {
  id: string;
  full_name: string;
  email: string;      
  phone?: string;
  expertise: string[];
  experience: string;
  title: string;
  bio: string;
  linked_in: string;
  timezone: string;
  communication_method: string;
}