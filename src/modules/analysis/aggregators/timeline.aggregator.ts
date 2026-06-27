import { CommitMeta } from '../../../common/types';

export interface TimelineStat {
  period: string;
  commits: number;
  insertions: number;
  deletions: number;
}

export type GroupByPeriod = 'hour' | 'day' | 'week' | 'month';

// TODO: CommitMeta[] 를 시간대별로 집계
// 순수 함수 - side effect 없이 입력을 받아 출력만 반환
export function aggregateByTimeline(
  commits: CommitMeta[],
  groupBy: GroupByPeriod,
): TimelineStat[] {
  throw new Error('Not implemented');
}
