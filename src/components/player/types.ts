export interface AudioTrack {
  id: string;
  title: string;
  author: string;
  description: string;
  duration: string;
  listeners: string;
  date: string;
  thumbnail: string;
  category: string;
  audioUrl?: string;
}

export interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
  buffered: number;
}