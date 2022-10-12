import { MeaningType, MeaningVariant, _MeaningTypeEnum, _MeaningVariantEnum } from './types';

export const meaningTypes = Object.keys(_MeaningTypeEnum) as MeaningVariant[];

export const meaningVariants = Object.keys(_MeaningVariantEnum) as MeaningVariant[];

export const MeaningTypeLabel: Record<MeaningType, string> = {
  ADVERB: 'Adverb',
  ADJECTIVE: 'Adjective',
  NOUN: 'Noun',
  PHRASAL_VERB: 'Phrasal Verb',
  PREPOSITION: 'Preposition',
  VERB: 'Verb',
};
