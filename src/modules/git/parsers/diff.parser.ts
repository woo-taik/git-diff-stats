import { FileChange, Hunk } from '../../../common/types';

// TODO: git diff raw 문자열을 FileChange[] 로 파싱
// 순수 함수 - side effect 없이 입력을 받아 출력만 반환
export function parseDiff(rawDiff: string): FileChange[] {
  throw new Error('Not implemented');
}

// TODO: 단일 파일 diff를 FileChange로 파싱
export function parseFileChange(rawFileChange: string): FileChange {
  throw new Error('Not implemented');
}

// TODO: Hunk 파싱
export function parseHunk(rawHunk: string): Hunk {
  throw new Error('Not implemented');
}
