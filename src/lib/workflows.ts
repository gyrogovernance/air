import generated from '../data/workflows.generated.json';

export type WorkflowArtifacts = {
  fetchedAt: string;
  sourceStatus: string;
  submissionReadme: string;
  reportReadme: string;
  submissionTemplate: string;
  reportPrompts: {
    detection: string;
    processing: string;
    treatment: string;
  };
};

export const WORKFLOW_ARTIFACTS = generated as WorkflowArtifacts;
