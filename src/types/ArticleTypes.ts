import { CategoryType } from "./CategoryTypes";
import { UserType } from "./UserTypes";

export interface ArticleType {
  id: number;
  documentId: string;
  title: string;
  description: string;
  cover_image_url: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
  comments: CommentType[];
  user: UserType;
  category: CategoryType;
}

export interface CommentType {
  id: number;
  documentId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: null;
  user: UserType;
  article: ArticleType;
}

export interface CommentParams {
  page: number;
  pageSize?: number;
  articleId?: string;
  userId?: string;
  populateArticle?: boolean;
}

export interface CommentForm {
  content: string;
  article: number;
}

export interface ArticleParams {
  page: number;
  pageSize: number;
  sort_by?: string;
  order_by?: string;
  q?: string;
  categoryName?: string;
  loadMore?: boolean;
}
