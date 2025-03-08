export const vocabulary = {
  words: [
    // Beginner Level - Common Everyday Words
    {
      id: "w1",
      word: "ephemeral",
      phonetic: "/ɪˈfem(ə)rəl/",
      audioUrl:
        "https://api.dictionaryapi.dev/media/pronunciations/en/ephemeral-us.mp3",
      definition: "lasting for a very short time",
      example: "The ephemeral beauty of a sunset",
      context:
        "The ephemeral nature of social media trends makes it hard to keep up.",
    },
    {
      id: "w2",
      word: "ubiquitous",
      phonetic: "/juːˈbɪkwɪtəs/",
      audioUrl:
        "https://api.dictionaryapi.dev/media/pronunciations/en/ubiquitous-us.mp3",
      definition: "present everywhere",
      example: "Mobile phones are ubiquitous in modern life",
      context:
        "The ubiquitous nature of plastic pollution is a global concern.",
    },
    {
      id: "w3",
      word: "serendipity",
      phonetic: "/ˌserənˈdɪpəti/",
      // https://api.dictionaryapi.dev/api/v2/entries/en/reluctant
      audioUrl:
        "https://api.dictionaryapi.dev/media/pronunciations/en/serendipity-us.mp3",
      definition:
        "the occurrence and development of events by chance in a happy or beneficial way",
      example: "The discovery of penicillin was a case of serendipity",
      context:
        "Many great scientific discoveries happened through serendipity.",
    },
    // Technology Words
    {
      id: "w4",
      word: "algorithm",
      phonetic: "/ˈælɡəˌrɪðəm/",
      audioUrl:
        "https://api.dictionaryapi.dev/media/pronunciations/en/algorithm-us.mp3",
      definition:
        "a process or set of rules to be followed in calculations or other problem-solving operations",
      example: "The search engine uses complex algorithms to rank pages",
      context:
        "Social media algorithms determine what content appears in your feed.",
    },
  ],
};

export const grammar = {
  lessons: [
    {
      id: "g1",
      title: "Present Simple",
      explanation: "Used for habits, repeated actions, and general truths",
      examples: ["I work in London", "The sun rises in the east"],
      exercises: [
        {
          question: "She ___ (work) as a teacher",
          answer: "works",
          options: ["work", "works", "working", "worked"],
        },
      ],
    },
  ],
};

export const speaking = {
  exercises: [
    {
      id: "s1",
      phrase: "How are you doing today?",
      difficulty: "beginner",
      tips: "Focus on the natural rhythm and intonation",
    },
  ],
};

export const writing = {
  prompts: [
    {
      id: "w1",
      title: "Your Daily Routine",
      description: "Write about your typical day, using present simple tense",
      minWords: 50,
      maxWords: 200,
    },
  ],
};

// Generate 1000 words programmatically
const generateVocabularyData = () => {
  const topics = [
    "Business",
    "Technology",
    "Science",
    "Arts",
    "Daily Life",
    "Academic",
    "Nature",
    "Social",
    "Culture",
    "Sports",
  ];
  const levels = ["Beginner", "Intermediate", "Advanced"];

  const baseWords = vocabulary.words;
  const generatedWords = [];

  // Generate additional words
  for (let i = baseWords.length + 1; i <= 1000; i++) {
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const level = levels[Math.floor(Math.random() * levels.length)];

    generatedWords.push({
      id: `w${i}`,
      word: `${level}Word${i}`,
      phonetic: "/example/",
      audioUrl: `https://api.dictionaryapi.dev/media/pronunciations/en/word${i}-us.mp3`,
      definition: `Definition for word ${i} in ${topic}`,
      example: `Example sentence for word ${i}`,
      context: `Context sentence for word ${i} in ${topic}`,
      topic,
      level,
    });
  }

  return [...baseWords, ...generatedWords];
};

vocabulary.words = generateVocabularyData();
