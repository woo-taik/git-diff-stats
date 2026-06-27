export interface FileChange {
  path: string;
  status: 'added' | 'modified' | 'deleted' | 'renamed';
  insertions: number;
  deletions: number;
  hunks: Hunk[];
}

export interface Hunk {
  header: string;
  lines: string[];
}

export interface DiffStat {
  totalFiles: number;
  totalInsertions: number;
  totalDeletions: number;
  fileChanges: FileChange[];
}
