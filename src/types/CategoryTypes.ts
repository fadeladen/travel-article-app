export interface CategoryType {
  id: number;
  documentId: string;
  name: string;
  description: null;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
}

export interface CategoryParams {
  page?: number;
  pageSize?: number;
  sort_by?: string;
  order_by?: string;
  q?: string;
}
