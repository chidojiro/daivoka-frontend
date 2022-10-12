import { RestApis } from '@/rest/apis';
import { CreateMeaningGroupPayload, CreateWordPayload, Word } from './types';

const getBySlug = (slug: string) => RestApis.get<Word>(`/words/${slug}`);

const create = (payload: CreateWordPayload) => RestApis.post<Word>('/words/create', payload);

const createMeaningGroup = (wordId: string, payload: CreateMeaningGroupPayload) =>
  RestApis.post<Word>(`/words/${wordId}/meaning-group`, payload);

const deleteMeaningGroup = (wordId: string, groupId: string) =>
  RestApis.delete<null>(`/words/${wordId}/meaning-group/${groupId}`);

export const WordApis = { create, createMeaningGroup, getBySlug, deleteMeaningGroup };
