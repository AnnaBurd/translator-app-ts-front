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
  hasAcceptedTerms?: boolean;
}

export interface UserProfileStats {
  limit: number;
  lastEditionAt?: string;
  numOfDocumentsChangedThisMonth?: number;
  numberOfDocuments?: number;
  numberOfWordsTranslatedThisMonth?: number;
  totalTokens: number;
  tokensUsedMonth: number;
  docsUsageStats: number[];
  tokensUsageStats: number[];
  wordsUsageStats: number[];
  lastSixMonths: string[];
}

export interface TotalUsageStats {
  activeUsers: number;
  tokensUsedMonth: number;
  inactiveUsers: number;
  blockedUsers: number;
}
