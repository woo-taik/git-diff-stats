import { CommitMeta } from '../../../common/types';

export interface AuthorStat {
  author: string;
  email: string;
  commits: number;
  insertions: number;
  deletions: number;
}

// TODO: CommitMeta[] 를 작성자별로 집계
// 순수 함수 - side effect 없이 입력을 받아 출력만 반환
export function aggregateByAuthor(commits: CommitMeta[]): AuthorStat[] {
  throw new Error('Not implemented');
}
