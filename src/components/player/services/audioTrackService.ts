import type { AudioTrack } from "../types";

// Sample data - in real app, this would be an API service
const audioTracks: AudioTrack[] = [
  {
    id: "1",
    title: "इंटरनेट का जादू - कैसे काम करता है हमारा डिजिटल संसार",
    author: "Digital Education Hindi",
    description:
      "ARPANET से लेकर आज के इंटरनेट तक - समझिए कैसे काम करता है हमारा डिजिटल संसार। इस एपिसोड में हम जानेंगे कि कैसे इंटरनेट का विकास हुआ, TCP/IP प्रोटोकॉल कैसे काम करता है, और कैसे डेटा पैकेट्स की मदद से information transfer होती है।",
    duration: "25:30",
    listeners: "3,547",
    date: "2024-09-20",
    thumbnail:
      "https://res.cloudinary.com/dj3xx136b/image/upload/v1758615092/j0maltggz7tjhnrsp5q1.png",
    category: "Technology",
    audioUrl:
      "https://res.cloudinary.com/dgvoocfla/video/upload/v1758557619/%E0%A4%87%E0%A4%82%E0%A4%9F%E0%A4%B0%E0%A4%A8%E0%A5%87%E0%A4%9F_%E0%A4%95%E0%A4%BE_%E0%A4%9C%E0%A4%BE%E0%A4%A6%E0%A5%82__%E0%A4%95%E0%A5%88%E0%A4%B8%E0%A5%87_%E0%A4%95%E0%A4%BE%E0%A4%AE_%E0%A4%95%E0%A4%B0%E0%A4%A4%E0%A4%BE_%E0%A4%B9%E0%A5%88_%E0%A4%B9%E0%A4%AE%E0%A4%BE%E0%A4%B0%E0%A4%BE_%E0%A4%A1%E0%A4%BF%E0%A4%9C%E0%A4%BF%E0%A4%9F%E0%A4%B2_%E0%A4%B8%E0%A4%82%E0%A4%B8%E0%A4%BE%E0%A4%B0_-_ARPANET__kajgmt.mp4",
  },
  {
    id: "2",
    title: "CORS क्या है? क्यों जरूरी है? - वेब सिक्यूरिटी",
    author: "Web Security Hindi",
    description:
      "CORS (Cross-Origin Resource Sharing) की पूरी जानकारी - क्यों जरूरी है, कैसे काम करता है, और वेब सिक्यूरिटी में इसकी भूमिका। Same-Origin Policy से लेकर modern web security तक का सफर।",
    duration: "18:42",
    listeners: "2,891",
    date: "2024-09-21",
    thumbnail:
      "https://res.cloudinary.com/dj3xx136b/image/upload/v1758615175/txikr2f46omistu5f0rq.png",
    category: "Web Security",
    audioUrl:
      "https://res.cloudinary.com/dgvoocfla/video/upload/v1758559504/CORS_%E0%A4%95%E0%A5%8D%E0%A4%AF%E0%A4%BE_%E0%A4%B9%E0%A5%88__%E0%A4%95%E0%A5%8D%E0%A4%AF%E0%A5%8B%E0%A4%82_%E0%A5%9B%E0%A4%B0%E0%A5%82%E0%A4%B0%E0%A5%80_%E0%A4%B9%E0%A5%88__%E0%A5%9B%E0%A5%80%E0%A4%B0%E0%A5%8B_%E0%A4%B8%E0%A5%87_%E0%A4%8F%E0%A4%A1%E0%A4%B5%E0%A4%BE%E0%A4%82%E0%A4%B8_%E0%A4%A4%E0%A4%95__%E0%A4%B5%E0%A5%87%E0%A4%AC_%E0%A4%B8%E0%A4%BF%E0%A4%95%E0%A5%8D%E0%A4%AF%E0%A5%8B%E0%A4%B0%E0%A4%BF%E0%A4%9F%E0%A5%80_vqfxlu.mp4",
  },
  {
    id: "3",
    title: "Machine Learning Basics",
    author: "Sarah Chen",
    description: "Introduction to machine learning fundamentals and basic concepts.",
    duration: "3:30",
    listeners: "15.2K",
    date: "2024-09-22",
    thumbnail: "/assets/ml.png",
    category: "AI/ML",
    audioUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
  }, 
  {
    id: "4",
    title: "Vector Databases Explained",
    author: "Sarah Chen",
    description: "Introduction to vector databases and their applications in AI.",
    duration: "4:15",
    listeners: "12.8K",
    date: "2024-09-22",
    thumbnail: "https://res.cloudinary.com/dj3xx136b/image/upload/v1758615175/txikr2f46omistu5f0rq.png",
    category: "AI/ML",
    audioUrl: "https://res.cloudinary.com/dgvoocfla/video/upload/v1758732667/%E0%A4%B5%E0%A5%87%E0%A4%95%E0%A5%8D%E0%A4%9F%E0%A4%B0_%E0%A4%A1%E0%A5%87%E0%A4%9F%E0%A4%BE%E0%A4%AC%E0%A5%87%E0%A4%B8_%E0%A4%94%E0%A4%B0_RAG__AI_%E0%A4%B5_LLM_%E0%A4%95%E0%A5%8B_%E0%A4%AC%E0%A4%BE%E0%A4%B9%E0%A4%B0%E0%A5%80_%E0%A4%9C%E0%A5%8D%E0%A4%9E%E0%A4%BE%E0%A4%A8_%E0%A4%B8%E0%A5%87_%E0%A4%9C%E0%A5%8B%E0%A4%A1%E0%A4%BC%E0%A4%A8%E0%A5%87_%E0%A4%B5%E0%A4%BE%E0%A4%B2%E0%A5%80_%E0%A4%97_uhpz35.mp4",
  }, 
];

export class AudioTrackService {
  static async getTrackById(id: string): Promise<AudioTrack | undefined> {
    // Simulate API delay for large files
    await new Promise((resolve) => setTimeout(resolve, 100));
    return audioTracks.find((track) => track.id === id);
  }

  static async getAllTracks(): Promise<AudioTrack[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return audioTracks;
  }

  static async validateAudioUrl(url: string): Promise<boolean> {
    try {
      // For direct URL access, we'll be more lenient with validation
      // Only do a basic URL format check and a quick HEAD request with timeout
      const urlPattern = /^https?:\/\/.+/;
      if (!urlPattern.test(url)) {
        return false;
      }

      // Quick validation with short timeout to avoid delays on direct access
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

      try {
        const response = await fetch(url, {
          method: "HEAD",
          signal: controller.signal,
          // Add headers to handle CORS and caching
          headers: {
            Range: "bytes=0-0", // Request just the first byte to validate
          },
        });
        clearTimeout(timeoutId);
        return response.ok || response.status === 206; // Accept partial content too
      } catch (error) {
        clearTimeout(timeoutId);
        // If validation fails, we'll still allow the track to load
        // The audio element will handle the actual loading and show its own errors
        console.warn(
          "Audio URL validation failed, but allowing track to load:",
          error
        );
        return true; // Return true to allow the track to load anyway
      }
    } catch {
      // Always return true to avoid blocking track loading on validation failures
      return true;
    }
  }
}
