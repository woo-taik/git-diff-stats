export interface CommitMeta {
  hash: string;
  author: string;
  email: string;
  date: string; // ISO
  message: string;
  insertions: number;
  deletions: number;
  filesChanged: number;
}

export interface CommitStat {
  totalCommits: number;
  totalInsertions: number;
  totalDeletions: number;
  totalFilesChanged: number;
}
