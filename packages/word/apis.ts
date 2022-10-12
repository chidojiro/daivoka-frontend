import { RestApis } from '@/rest/apis';
import { CreateMeaningGroupPayload, CreateWordPayload, Word } from './types';

const getBySlug = (slug: string) => RestApis.get<Word>(`/words/${slug}`);

const create = (payload: CreateWordPayload) => RestApis.post<Word>('/words/create', payload);

const createMeaningGroup = (wordId: string, payload: CreateMeaningGroupPayload) =>
  RestApis.post<Word>(`/words/${wordId}/meaning-group`, payload);

export const WordApis = { create, createMeaningGroup, getBySlug };
