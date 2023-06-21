export interface BlockData {
  _id?: string;
  blockId?: string;
  text?: string;
}

export interface Doc {
  _id: string;
  title: string;
  lang?: string;
  translationLang?: string;
  textPreview?: string;
  translationPreview?: string;
  changedAt?: string;
  content?: BlockData[];
  translationContent?: BlockData[];
}
