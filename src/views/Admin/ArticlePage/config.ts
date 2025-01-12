import { ArticleType } from "../../../types/ArticleTypes";

interface ColumnType {
  label: string;
  key: keyof ArticleType;
  sortable: boolean;
}

export const Config: { columns: ColumnType[]; pageTitle: string } = {
  pageTitle: "Articles",
  columns: [
    { label: "Title", key: "title", sortable: true },
    { label: "Cover", key: "cover_image_url", sortable: false },
    {
      label: "Category",
      key: "category.name" as keyof ArticleType,
      sortable: false,
    },
    {
      label: "Created By",
      key: "user.username" as keyof ArticleType,
      sortable: false,
    },
    { label: "Created At", key: "createdAt", sortable: true },
  ],
};
