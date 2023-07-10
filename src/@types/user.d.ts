export interface User {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  newUser?: boolean;
  role?: string;
}

export interface UserProfileStats {
  lastEditionAt?: string;
  numOfParagraphsTranslatedThisMonth?: number;
  numberOfDocuments?: number;
  numberOfWordsTranslatedThisMonth?: number;
  totalTokens: number;
  tokensUsedMonth: number;
  docsUsageStats: number[];
  tokensUsageStats: number[];
  wordsUsageStats: number[];
  lastSixMonths: string[];
  limit: number;
}
