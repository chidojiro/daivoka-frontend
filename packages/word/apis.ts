import { RestApis } from '@/rest/apis';
import { CreateMeaningGroupPayload, CreateWordPayload, Word } from './types';

const getBySlug = (slug: string) => RestApis.get<Word>(`/words/slugs/${slug}`);

const get = (id: string) => RestApis.get<Word>(`/words/${id}`);

const create = (payload: CreateWordPayload) => RestApis.post<Word>('/words/create', payload);

const createMeaningGroup = (wordId: string, payload: CreateMeaningGroupPayload) =>
  RestApis.post<Word>(`/words/${wordId}/meaning-group`, payload);

const updateMeaningGroup = (wordId: string, meaningGroupId: string, payload: CreateMeaningGroupPayload) =>
  RestApis.put<Word>(`/words/${wordId}/meaning-group/${meaningGroupId}`, payload);

const deleteMeaningGroup = (wordId: string, groupId: string) =>
  RestApis.delete<Word>(`/words/${wordId}/meaning-group/${groupId}`);

export const WordApis = { getBySlug, get, create, createMeaningGroup, updateMeaningGroup, deleteMeaningGroup };
