import { CommitMeta } from '../../../common/types';

// TODO: git log raw 문자열을 CommitMeta[] 로 파싱
// 순수 함수 - side effect 없이 입력을 받아 출력만 반환
export function parseGitLog(rawLog: string): CommitMeta[] {
  throw new Error('Not implemented');
}

// TODO: 단일 커밋 raw를 CommitMeta로 파싱
export function parseCommit(rawCommit: string): CommitMeta {
  throw new Error('Not implemented');
}
