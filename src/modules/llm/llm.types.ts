export interface CommitSummaryInput {
  message: string;
  diff: string;
}

export interface DiffReview {
  summary: string;
  risk: 'low' | 'medium' | 'high';
  tags: string[];
}

export interface LlmProvider {
  summarizeCommit(input: CommitSummaryInput): Promise<string>;
  reviewDiff(input: CommitSummaryInput): Promise<DiffReview>;
}
