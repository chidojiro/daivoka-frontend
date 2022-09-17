import { RestApis } from '@/rest/apis';
import { CreateWordPayload, Word } from './types';

const create = (payload: CreateWordPayload) => RestApis.post<Word>('/words/create', payload);

export const WordApis = { create };
