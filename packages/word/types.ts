export type Pronunciation = {
  text: string;
  type: string;
  accent: Accent;
};

export type Meaning = {
  _id: string;
  text: string;
  examples: string[];
  illustration?: string;
};

export type MeaningGroup = {
  _id: string;
  type: MeaningType;
  ipas: IPA[];
};

export type Word = {
  _id: string;
  text: string;
  slug: string;
  meaningGroupIds: string[];
  meaningGroups: MeaningGroup[];
};

export type CreateWordPayload = Pick<Word, 'text'>;

export enum _MeaningVariantEnum {
  COUNTABLE,
  UNCOUNTABLE,
  TRANSITIVE,
  INTRANSITIVE,
}

export type MeaningVariant = keyof typeof _MeaningVariantEnum;

export enum _MeaningTypeEnum {
  NOUN,
  VERB,
  ADJECTIVE,
  ADVERB,
  PREPOSITION,
  PHRASAL_VERB,
}

export type MeaningType = keyof typeof _MeaningTypeEnum;

export type Accent = 'US' | 'UK';

export type IPA = {
  text: string;
  accent: Accent;
};

export type CreateMeaningGroupPayload = {
  type: MeaningType;
  ipas: IPA[];
};
