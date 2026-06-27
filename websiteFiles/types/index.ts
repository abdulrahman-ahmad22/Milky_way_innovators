export type WorkshopCategory =
  | "Getting started"
  | "Marketing"
  | "Research"
  | "Finance";

export type Workshop = {
  id: string;
  title: string;
  description: string;
  audience: string;
  date: string;
  dateLabel: string;
  time: string;
  location: string;
  category: WorkshopCategory;
  duration: string;
};

export type ResearchArticle = {
  id: string;
  title: string;
  summary: string;
  researchQuestion: string;
  collectionPeriod: string;
  sampleSize: string;
  method: string;
  keyFindings: string[];
  limitations: string[];
  evidenceType: "Descriptive" | "Broader inference";
  topic: "Community needs" | "Young adults" | "Founder barriers";
};
