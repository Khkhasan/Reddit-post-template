export interface Award {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
}
export interface PostState {
  subredditName: string;
  subredditIcon: string;
  author: string;
  isVerified: boolean;
  timeAgo: string;
  title: string;
  body: string;
  voteCount: string;
  commentCount: string;
  isDarkMode: boolean;
  selectedAwards: { [awardId: string]: number };
  customAwards: Award[];
  showImage: boolean;
  imageUrl?: string;
}
