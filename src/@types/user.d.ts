export interface User {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  newUser?: boolean;
}

export interface UserProfileStats {
  lastEditionAt?: string;
  numOfParagraphsTranslatedThisMonth?: number;
  numberOfDocuments?: number;
  numberOfWordsTranslatedThisMonth?: number;
  tokensPerMonthForCurrentYear?: number[];
  totalTokens: number;
}
