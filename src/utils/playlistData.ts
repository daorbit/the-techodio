export interface Track {
  id: string;
  title: string;
  author: string;
  description: string;
  duration: string;
  listeners: string;
  date: string;
  thumbnail: string;
  category: string;
  audioUrl: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  trackCount: number;
  duration: string;
  thumbnail: string;
  createdBy: string;
  createdAt: string;
  tracks: Track[];
  isPublic: boolean;
  tags: string[];
}

export const SAMPLE_TRACKS: Track[] = [
  {
    id: "t1",
    title: "Digital Dreams",
    author: "Synthwave Collective",
    description: "An electronic track with synthwave vibes",
    duration: "4:23",
    listeners: "1.2K",
    date: "2024-01-15",
    thumbnail: "/assets/react.svg",
    category: "Electronic",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
  },
  {
    id: "t2",
    title: "Neon Nights",
    author: "Cyber Punk",
    description: "Retro cyberpunk electronic music",
    duration: "3:45",
    listeners: "890",
    date: "2024-02-20",
    thumbnail: "/assets/ml.png",
    category: "Synthwave",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-04.wav",
  },
  {
    id: "t3",
    title: "Future Bass",
    author: "Wave Rider",
    description: "Modern future bass beats",
    duration: "5:12",
    listeners: "2.1K",
    date: "2024-03-10",
    thumbnail: "/assets/cloud.png",
    category: "Electronic",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-03.wav",
  },
  {
    id: "t4",
    title: "Retro Wave",
    author: "80s Revival",
    description: "Classic 80s style retro wave",
    duration: "4:01",
    listeners: "750",
    date: "2024-01-08",
    thumbnail: "/assets/hook.png",
    category: "Retro",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-02.wav",
  },
  {
    id: "t5",
    title: "Ambient Flow",
    author: "Chill Masters",
    description: "Relaxing ambient music for focus",
    duration: "6:30",
    listeners: "650",
    date: "2024-04-05",
    thumbnail: "/assets/Internet.png",
    category: "Ambient",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-01.wav",
  },
];

// Sample playlists data
export const SAMPLE_PLAYLISTS: Playlist[] = [
  {
    id: "p1",
    title: "Machine Learning",
    description:
      "A curated collection of machine learning podcasts and educational content",
    trackCount: 7,
    duration: "2h 18m",
    thumbnail: "/assets/machine-learning.jpg",
    createdBy: "You",
    createdAt: "2024-09-25",
    tracks: [
      {
        id: "t7",
        title: "Machine Learning Models",
        author: "AI Podcast",
        description: "Introduction to machine learning models",
        duration: "12:34",
        listeners: "5.2K",
        date: "2024-05-10",
        thumbnail: "/assets/machine-learning.jpg",
        category: "Machine Learning",
        audioUrl:
          "https://res.cloudinary.com/dgvoocfla/video/upload/v1758821057/Machine_Learning_Models_rcsgub.mp4",
      },
      {
        id: "t8",
        title: "Types of Machine Learning Models",
        author: "Data Science Weekly",
        description: "Understanding different types of machine learning models",
        duration: "14:13",
        listeners: "3.8K",
        date: "2024-05-15",
        thumbnail: "/assets/ml.png",
        category: "Machine Learning",
        audioUrl:
          "https://res.cloudinary.com/dgvoocfla/video/upload/v1758821057/Types_of_machine_learning_model_ypgn9k.mp4",
      },
      {
        id: "t9",
        title: "Regression",
        author: "Tech Talks",
        description: "Deep dive into regression algorithms",
        duration: "20:32",
        listeners: "7.1K",
        date: "2024-05-20",
        thumbnail: "/assets/machine-learning.jpg",
        category: "Machine Learning",
        audioUrl:
          "https://res.cloudinary.com/dgvoocfla/video/upload/v1758821060/Regression_ydmhig.mp4",
      },
      {
        id: "t10",
        title: "Binary Classification",
        author: "AI Insights",
        description: "Understanding binary classification techniques",
        duration: "17:14",
        listeners: "4.5K",
        date: "2024-05-25",
        thumbnail: "/assets/web-d.png",
        category: "Machine Learning",
        audioUrl:
          "https://res.cloudinary.com/dgvoocfla/video/upload/v1758821051/Binary_classification_ohoamw.mp4",
      },
      {
        id: "t11",
        title: "Multiclass Classification",
        author: "ML Masters",
        description: "Exploring multi-class classification methods",
        duration: "24:14",
        listeners: "3.2K",
        date: "2024-05-30",
        thumbnail: "/assets/ml.png",
        category: "Machine Learning",
        audioUrl:
          "https://res.cloudinary.com/dgvoocfla/video/upload/v1758821070/Multiclass_classification_sdqy9h.mp4",
      },
      {
        id: "t12",
        title: "Clustering",
        author: "Data Science Hub",
        description: "Introduction to clustering algorithms",
        duration: "18:32",
        listeners: "4.1K",
        date: "2024-06-05",
        thumbnail: "/assets/machine-learning.jpg",
        category: "Machine Learning",
        audioUrl:
          "https://res.cloudinary.com/dgvoocfla/video/upload/v1758821055/Clustering_zfdd3n.mp4",
      },
      {
        id: "t13",
        title: "Deep Learning",
        author: "AI Research",
        description: "Exploring deep learning concepts and architectures",
        duration: "13:26",
        listeners: "6.8K",
        date: "2024-06-10",
        thumbnail: "/assets/ml.png",
        category: "Machine Learning",
        audioUrl:
          "https://res.cloudinary.com/dgvoocfla/video/upload/v1758821040/Deep_learning_g31qwi.mp4",
      },
      {
        id: "t14",
        title: "Artificial Intelligence",
        author: "Future Tech",
        description: "Comprehensive overview of artificial intelligence",
        duration: "17:01",
        listeners: "8.5K",
        date: "2024-06-15",
        thumbnail: "/assets/machine-learning.jpg",
        category: "Machine Learning",
        audioUrl:
          "https://res.cloudinary.com/dgvoocfla/video/upload/v1758822269/%E0%A4%A8%E0%A5%8D%E0%A4%AF%E0%A5%82%E0%A4%B0%E0%A4%B2_%E0%A4%A8%E0%A5%87%E0%A4%9F%E0%A4%B5%E0%A4%B0%E0%A5%8D%E0%A4%95_%E0%A4%B8%E0%A5%80%E0%A4%96%E0%A4%A4%E0%A5%87_%E0%A4%95%E0%A5%88%E0%A4%B8%E0%A5%87_%E0%A4%B9%E0%A5%88%E0%A4%82__%E0%A4%AC%E0%A5%88%E0%A4%95%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A5%8B%E0%A4%AA%E0%A5%88%E0%A4%97%E0%A5%87%E0%A4%B6%E0%A4%A8__%E0%A4%B2%E0%A5%89%E0%A4%B8_%E0%A4%AB%E0%A4%82%E0%A4%95%E0%A5%8D%E0%A4%B6%E0%A4%A8_%E0%A4%94%E0%A4%B0_%E0%A4%97%E0%A5%8D%E0%A4%B0_teor5q.mp4",
      },
    ],
    isPublic: true,
    tags: ["machine learning", "AI", "data science", "education"],
  },
  {
    id: "p2",
    title: "Artificial Intelligence",
    description:
      "A curated collection of artificial intelligence podcasts and educational content",
    trackCount: 4,
    duration: "1h 18m",
    thumbnail: "/assets/AIIMAGE.jpg",
    createdBy: "You",
    createdAt: "2025-09-25",
    tracks: [
      {
        id: "t15",
        title: "Vector Database",
        author: "AI Tech Podcast",
        description: "Understanding vector databases and their role in AI",
        duration: "20:12",
        listeners: "3.1K",
        date: "2025-09-20",
        thumbnail: "/assets/AIIMAGE.jpg",
        category: "Artificial Intelligence",
        audioUrl:
          "https://res.cloudinary.com/dgvoocfla/video/upload/v1758821863/%E0%A4%B5%E0%A5%87%E0%A4%95%E0%A5%8D%E0%A4%9F%E0%A4%B0_%E0%A4%A1%E0%A5%87%E0%A4%9F%E0%A4%BE%E0%A4%AC%E0%A5%87%E0%A4%B8_%E0%A4%94%E0%A4%B0_RAG__AI_%E0%A4%B5_LLM_%E0%A4%95%E0%A5%8B_%E0%A4%AC%E0%A4%BE%E0%A4%B9%E0%A4%B0%E0%A5%80_%E0%A4%9C%E0%A5%8D%E0%A4%9E%E0%A4%BE%E0%A4%A8_%E0%A4%B8%E0%A5%87_%E0%A4%9C%E0%A5%8B%E0%A4%A1%E0%A4%BC%E0%A4%A8%E0%A5%87_%E0%A4%B5%E0%A4%BE%E0%A4%B2%E0%A5%80_%E0%A4%97_t99m1u.mp4",
      },
      {
        id: "t16",
        title: "How GPUs Power AI",
        author: "Tech Insights",
        description:
          "Exploring how GPUs accelerate artificial intelligence workloads",
        duration: "18:35",
        listeners: "4.2K",
        date: "2025-09-21",
        thumbnail: "/assets/ml.png",
        category: "Artificial Intelligence",
        audioUrl:
          "https://res.cloudinary.com/dgvoocfla/video/upload/v1758821855/importance_of_GPU_in_AI_nwzgn3.mp4",
      },
      {
        id: "t17",
        title: "RAG",
        author: "AI Research Hub",
        description: "Retrieval-Augmented Generation explained",
        duration: "21:36",
        listeners: "2.8K",
        date: "2025-09-22",
        thumbnail: "/assets/AIIMAGE.jpg",
        category: "Artificial Intelligence",
        audioUrl:
          "https://res.cloudinary.com/dgvoocfla/video/upload/v1758821874/RAG_%E0%A4%A4%E0%A4%95%E0%A4%A8%E0%A5%80%E0%A4%95__AI_%E0%A4%95%E0%A5%8B_Accurate__Relevant_%E0%A4%94%E0%A4%B0_Trustworthy_%E0%A4%AC%E0%A4%A8%E0%A4%BE%E0%A4%A8%E0%A5%87_%E0%A4%95%E0%A4%BE_%E0%A4%B8%E0%A5%89%E0%A4%AB_keuy8z.mp4",
      },
      {
        id: "t18",
        title: "Vector Embeddings",
        author: "Data Science Weekly",
        description: "Deep dive into vector embeddings and their applications",
        duration: "18:39",
        listeners: "3.5K",
        date: "2025-09-23",
        thumbnail: "/assets/ml.png",
        category: "Artificial Intelligence",
        audioUrl:
          "https://res.cloudinary.com/dgvoocfla/video/upload/v1758821869/Vector_embedding_isnapb.mp4",
      },
    ],
    isPublic: true,
    tags: ["artificial intelligence", "AI", "technology", "machine learning"],
  },
  {
    id: "p3",
    title:
      "GANs - Generative Adversarial Networks (machine learning framework)",
    description:
      "A curated collection of Generative Adversarial Networks podcasts and educational content",
    trackCount: 10,
    duration: "3h 45m",
    thumbnail: "/assets/GAN.avif",
    createdBy: "You",
    createdAt: "2025-09-26",
    tracks: [
      {
        id: "t19",
        title: "Introduction to GANs",
        author: "AI Research",
        description: "Understanding the basics of Generative Adversarial Networks",
        duration: "15:30",
        listeners: "4.7K",
        date: "2025-09-24",
        thumbnail: "/assets/GAN.avif",
        category: "Machine Learning",
        audioUrl: "https://res.cloudinary.com/dgvoocfla/video/upload/v1758892069/1._Introduction_to_GANs_vir3yj.mp4",
      },
      {
        id: "t20",
        title: "Generative Model",
        author: "Deep Learning Hub",
        description: "Exploring generative models and their fundamentals",
        duration: "18:45",
        listeners: "3.9K",
        date: "2025-09-24",
        thumbnail: "/assets/ml.png",
        category: "Machine Learning",
        audioUrl: "https://res.cloudinary.com/dgvoocfla/video/upload/v1758892063/2._Generative_Model_gf3j0d.mp4",
      },
      {
        id: "t21",
        title: "GAN Structure",
        author: "Tech Innovations",
        description: "Understanding the structure and components of GANs",
        duration: "22:10",
        listeners: "5.1K",
        date: "2025-09-24",
        thumbnail: "/assets/AIIMAGE.jpg",
        category: "Machine Learning",
        audioUrl: "https://res.cloudinary.com/dgvoocfla/video/upload/v1758892066/3._GAN_Structure_pzzu4m.mp4",
      },
      {
        id: "t22",
        title: "Discriminator",
        author: "AI Masters",
        description: "Deep dive into the discriminator component of GANs",
        duration: "20:25",
        listeners: "4.2K",
        date: "2025-09-25",
        thumbnail: "/assets/GAN.avif",
        category: "Machine Learning",
        audioUrl: "https://res.cloudinary.com/dgvoocfla/video/upload/v1758892064/4._Discriminator_rfxd9b.mp4",
      },
      {
        id: "t23",
        title: "Generator",
        author: "Neural Networks Pro",
        description: "Understanding the generator component and its role",
        duration: "19:50",
        listeners: "4.8K",
        date: "2025-09-25",
        thumbnail: "/assets/ml.png",
        category: "Machine Learning",
        audioUrl: "https://res.cloudinary.com/dgvoocfla/video/upload/v1758892056/5._Generator_okavum.mp4",
      },
      {
        id: "t24",
        title: "GAN Training",
        author: "ML Experts",
        description: "How to train Generative Adversarial Networks effectively",
        duration: "25:15",
        listeners: "6.2K",
        date: "2025-09-25",
        thumbnail: "/assets/AIIMAGE.jpg",
        category: "Machine Learning",
        audioUrl: "https://res.cloudinary.com/dgvoocfla/video/upload/v1758892060/6._GAN_Training_pot69e.mp4",
      },
      {
        id: "t25",
        title: "Loss Functions",
        author: "Data Science Hub",
        description: "Understanding loss functions in GAN training",
        duration: "21:40",
        listeners: "3.7K",
        date: "2025-09-26",
        thumbnail: "/assets/GAN.avif",
        category: "Machine Learning",
        audioUrl: "https://res.cloudinary.com/dgvoocfla/video/upload/v1758892054/7._Loss_Functions_ukmojo.mp4",
      },
      {
        id: "t26",
        title: "Common Problems",
        author: "AI Research Lab",
        description: "Common challenges and problems in GAN implementation",
        duration: "17:55",
        listeners: "4.5K",
        date: "2025-09-26",
        thumbnail: "/assets/ml.png",
        category: "Machine Learning",
        audioUrl: "https://res.cloudinary.com/dgvoocfla/video/upload/v1758892055/8._Common_Problems_sgthuu.mp4",
      },
      {
        id: "t27",
        title: "GAN Variations",
        author: "Advanced AI",
        description: "Exploring different variations and types of GANs",
        duration: "23:30",
        listeners: "5.3K",
        date: "2025-09-26",
        thumbnail: "/assets/AIIMAGE.jpg",
        category: "Machine Learning",
        audioUrl: "https://res.cloudinary.com/dgvoocfla/video/upload/v1758892042/9._GAN_Variations_dbxslx.mp4",
      },
      {
        id: "t28",
        title: "TF-GAN",
        author: "TensorFlow Team",
        description: "Using TensorFlow's GAN implementation and tools",
        duration: "19:20",
        listeners: "4.1K",
        date: "2025-09-26",
        thumbnail: "/assets/GAN.avif",
        category: "Machine Learning",
        audioUrl: "https://res.cloudinary.com/dgvoocfla/video/upload/v1758892057/10._TF-GAN_caz7ph.mp4",
      },
    ],
    isPublic: true,
    tags: [
      "GANs",
      "generative adversarial networks",
      "machine learning",
      "deep learning",
      "AI",
    ],
  },
];

// Helper functions
export const getPlaylistById = (id: string): Playlist | undefined => {
  return SAMPLE_PLAYLISTS.find((playlist) => playlist.id === id);
};

export const getTracksByIds = (trackIds: string[]): Track[] => {
  return SAMPLE_TRACKS.filter((track) => trackIds.includes(track.id));
};

export const getPlaylistsByTag = (tag: string): Playlist[] => {
  return SAMPLE_PLAYLISTS.filter((playlist) =>
    playlist.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
  );
};
