// types/Mentee.ts

export type Mentee = {
    id: string;
    full_name: string;
    email: string;
    phone?: string;
    linked_in: string;
    current_role?: string;
    current_company?: string;
    education_level: string;
    experience?: string;
    guidance_type: string;
    mentorship_topic: string;
    communication_method?: string;
    timezone: string;
    bio: string;
    goals?: string;
    referral_source?: string;
  };