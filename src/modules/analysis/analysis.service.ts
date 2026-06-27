import { Injectable } from '@nestjs/common';
import { GitService } from '../git/git.service';
import { CommitMeta, CommitStat, DiffStat } from '../../common/types';

@Injectable()
export class AnalysisService {
  constructor(private readonly gitService: GitService) {}

  // TODO: 기간별 커밋 통계 집계
  async getCommitStats(opts: {
    since?: string;
    until?: string;
  }): Promise<CommitStat> {
    throw new Error('Not implemented');
  }

  // TODO: 작성자별 통계 집계
  async getAuthorStats(opts: { since?: string; until?: string }): Promise<
    Array<{
      author: string;
      email: string;
      commits: number;
      insertions: number;
      deletions: number;
    }>
  > {
    throw new Error('Not implemented');
  }

  // TODO: 파일별 변경 통계 집계
  async getFileStats(opts: { since?: string; until?: string }): Promise<
    Array<{
      path: string;
      changes: number;
      insertions: number;
      deletions: number;
    }>
  > {
    throw new Error('Not implemented');
  }

  // TODO: 시간대별 커밋 분포 집계
  async getTimelineStats(opts: {
    since?: string;
    until?: string;
    groupBy: 'hour' | 'day' | 'week' | 'month';
  }): Promise<
    Array<{
      period: string;
      commits: number;
      insertions: number;
      deletions: number;
    }>
  > {
    throw new Error('Not implemented');
  }
}
