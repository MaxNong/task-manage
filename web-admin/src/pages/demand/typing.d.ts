export interface ListItem {
  status: number;
  longMaoDemand: string;
  demandDocuments: Array<{ name: string; url: string }>;
  relativeDocuments: Array<{ name: string; url: string }>;
  developers: number[];
  preReviewDate: string;
  reviewDate: string;
  technicalReviewDate: string;
  testDate: string;
  publishDate: string;
  relationalApps: number[];
  remark: string;
}
