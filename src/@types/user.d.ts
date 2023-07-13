export interface User {
  photo?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  newUser?: boolean;
  role?: string;
  registrationDate?: string;
  tokensUsedMonth?: number;
  tokensUsedTotal?: number;
  tokensLimit?: number;
  isBlocked?: boolean;
  slug?: string;
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
