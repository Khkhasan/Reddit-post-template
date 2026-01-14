export interface Award {
  id: string;
  name: string;
  imageUrl: string; // URL to animated GIF/WebP
  price: number;
}

export interface PostState {
  subredditName: string;
  subredditIcon: string;
  author: string; // In this design, this serves as the main display name
  isVerified: boolean;
  timeAgo: string;
  title: string;
  body: string;
  voteCount: string;
  commentCount: string;
  isDarkMode: boolean;
  selectedAwards: { [awardId: string]: number }; // Map of award ID to count
  customAwards: Award[]; // User uploaded awards
  showImage: boolean;
  imageUrl?: string;
}

export interface Preset {
  name: string;
  data: Partial<PostState>;
}