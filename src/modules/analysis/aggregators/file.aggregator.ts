import { FileChange } from '../../../common/types';

export interface FileStat {
  path: string;
  changes: number;
  insertions: number;
  deletions: number;
}

// TODO: FileChange[] 를 파일별로 집계
// 순수 함수 - side effect 없이 입력을 받아 출력만 반환
export function aggregateByFile(fileChanges: FileChange[]): FileStat[] {
  throw new Error('Not implemented');
}
