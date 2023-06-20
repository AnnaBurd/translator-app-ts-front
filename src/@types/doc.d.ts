export interface Doc {
  _id: string;
  title: string;
  lang?: string;
  translationLang?: string;
  textPreview?: string;
  translationPreview?: string;
  changedAt?: string;
}
