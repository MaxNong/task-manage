export interface CreateDemandParams {
  status?: number;
  longMaoDemand?: string;
  demandUrls?: Array<{ name: string; url: string }>;
  relativeDocuments?: Array<{ name: string; url: string }>;
  developers?: string[];
  preReviewDate?: string;
  reviewDate?: string;
  technicalReviewDate?: string;
  testDate?: string;
  publishDate?: string;
  relationalApps?: string[];
  remark?: string;
}

export interface QueryDemandListParams {
  longMaoId?: string;
  startDate?: string;
  endDate?: string;
  member?: number;
  demandStatus?: number;
}
