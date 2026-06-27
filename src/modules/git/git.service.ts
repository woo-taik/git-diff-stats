import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration } from '../../common/config/configuration';

export interface GetRawLogOptions {
  since?: string;
  until?: string;
  author?: string;
  maxCount?: number;
}

@Injectable()
export class GitService {
  constructor(private readonly configService: ConfigService<Configuration>) {}

  // TODO: git log --numstat --pretty=format:... 실행 후 raw 반환
  async getRawLog(opts: GetRawLogOptions): Promise<string> {
    throw new Error('Not implemented');
  }

  // TODO: git diff / git show 로 특정 커밋 diff raw 반환
  async getRawDiff(hash: string): Promise<string> {
    throw new Error('Not implemented');
  }

  // TODO: 두 커밋 사이의 diff raw 반환
  async getRawDiffBetween(fromHash: string, toHash: string): Promise<string> {
    throw new Error('Not implemented');
  }
}
