export const vocabulary = {
  words: [
    { 
      id: "w1", 
      word: "ephemeral", 
      phonetic: "/ɪˈfem(ə)rəl/",
      audioUrl: "https://api.dictionaryapi.dev/media/pronunciations/en/ephemeral-us.mp3",
      definition: "lasting for a very short time", 
      example: "The ephemeral beauty of a sunset",
      context: "The ephemeral nature of social media trends makes it hard to keep up."
    },
    { 
      id: "w2", 
      word: "ubiquitous", 
      phonetic: "/juːˈbɪkwɪtəs/",
      audioUrl: "https://api.dictionaryapi.dev/media/pronunciations/en/ubiquitous-us.mp3",
      definition: "present everywhere", 
      example: "Mobile phones are ubiquitous in modern life",
      context: "The ubiquitous nature of plastic pollution is a global concern."
    },
    // Add more words...
  ]
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
          options: ["work", "works", "working", "worked"]
        }
      ]
    }
    // Add more lessons...
  ]
};

export const speaking = {
  exercises: [
    {
      id: "s1",
      phrase: "How are you doing today?",
      difficulty: "beginner",
      tips: "Focus on the natural rhythm and intonation"
    }
    // Add more exercises...
  ]
};

export const writing = {
  prompts: [
    {
      id: "w1",
      title: "Your Daily Routine",
      description: "Write about your typical day, using present simple tense",
      minWords: 50,
      maxWords: 200
    }
    // Add more prompts...
  ]
};