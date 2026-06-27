import { Controller, Get, Query, Param } from '@nestjs/common';
import { GitService } from './git.service';

@Controller('git')
export class GitController {
  constructor(private readonly gitService: GitService) {}

  // TODO: GET /git/log - 커밋 로그 조회
  @Get('log')
  async getLog(
    @Query('since') since?: string,
    @Query('until') until?: string,
    @Query('author') author?: string,
    @Query('maxCount') maxCount?: number,
  ) {
    throw new Error('Not implemented');
  }

  // TODO: GET /git/diff/:hash - 특정 커밋의 diff 조회
  @Get('diff/:hash')
  async getDiff(@Param('hash') hash: string) {
    throw new Error('Not implemented');
  }
}
