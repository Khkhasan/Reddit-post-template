import { Award, Preset } from './types';

export const MOCK_AWARDS: Award[] = [
  {
    id: 'heart_eyes',
    name: 'Heart Eyes',
    // Red heart character with excited expression
    imageUrl: 'https://media.giphy.com/media/l4FGpP4lUqVVzJf9u/giphy.gif', 
    price: 500,
  },
  {
    id: 'shining_snoo',
    name: 'Shining',
    // Glowing/Gold Snoo
    imageUrl: 'https://media.giphy.com/media/3o7527pa7qs9kCG78A/giphy.gif', 
    price: 1800,
  },
  {
    id: 'laughing_snoo',
    name: 'Giggle',
    // Laughing/Happy Snoo
    imageUrl: 'https://media.giphy.com/media/3oEjHAUOqG3lSS0f1C/giphy.gif', 
    price: 125,
  },
  {
    id: 'ternion',
    name: 'Ternion',
    // 3 Green Gems (Ternion All-Powerful representation)
    imageUrl: 'https://media.giphy.com/media/l3q2Z5667u264tK4E/giphy.gif', 
    price: 50000,
  },
  {
    id: 'diamond',
    name: 'Gem',
    // Blue Diamond
    imageUrl: 'https://media.giphy.com/media/1d7F9xyq6j7C1ojbC5/giphy.gif', 
    price: 500,
  },
  {
    id: 'fish',
    name: 'Fish',
    // Yellow Fish
    imageUrl: 'https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif', 
    price: 200,
  },
  {
    id: 'handshake',
    name: 'Helpful',
    // Handshake
    imageUrl: 'https://media.giphy.com/media/xUPGGwVs0nF2freA12/giphy.gif', 
    price: 150,
  },
  {
    id: 'brain',
    name: 'Big Brain',
    // Pink Brain
    imageUrl: 'https://media.giphy.com/media/d3mlE7uhX8KFgEmY/giphy.gif', 
    price: 250,
  },
  {
    id: 'argentium',
    name: 'Argentium',
    // Silver Shield (Argentium representation)
    imageUrl: 'https://media.giphy.com/media/3o6UB3VhArvomJHtdK/giphy.gif', 
    price: 20000,
  }
];

export const INITIAL_STATE = {
  subredditName: 'r/funny',
  subredditIcon: 'https://styles.redditmedia.com/t5_2qh33/styles/communityIcon_6pzkhn9k2k321.png',
  author: 'Reddit Whispers',
  isVerified: true,
  timeAgo: '4h',
  title: '',
  body: '',
  voteCount: 'Vote',
  commentCount: 'Comment',
  isDarkMode: false,
  selectedAwards: {
    'heart_eyes': 1,
    'shining_snoo': 1,
    'laughing_snoo': 1,
    'ternion': 1,
    'diamond': 1,
    'fish': 1,
    'handshake': 1,
    'brain': 1,
    'argentium': 1
  },
  customAwards: [],
  showImage: false,
  imageUrl: ''
};

export const PRESETS: Preset[] = [
  {
    name: 'Reddit Whispers',
    data: {
      author: 'Reddit Whispers',
      isVerified: true,
      subredditIcon: 'https://styles.redditmedia.com/t5_2qh33/styles/communityIcon_6pzkhn9k2k321.png',
      selectedAwards: {
        'heart_eyes': 1, 'shining_snoo': 1, 'laughing_snoo': 1, 'ternion': 1,
        'diamond': 1, 'fish': 1, 'handshake': 1, 'brain': 1, 'argentium': 1
      },
      title: '',
      body: '',
      voteCount: 'Vote',
      commentCount: 'Comment',
    }
  },
  {
    name: 'Standard Post',
    data: {
      author: 'u/user123',
      isVerified: false,
      title: 'Just a normal post',
      voteCount: '14.2k',
      commentCount: '842',
      selectedAwards: { 'laughing_snoo': 2, 'diamond': 1 }
    }
  }
];