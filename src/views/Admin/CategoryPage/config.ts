import { CategoryType } from "../../../types/CategoryTypes";

interface ColumnType {
  label: string;
  key: keyof CategoryType;
  sortable: boolean;
}

export const Config: { columns: ColumnType[]; pageTitle: string } = {
  pageTitle: "Categories",
  columns: [
    { label: "Name", key: "name", sortable: true },
    { label: "Created At", key: "createdAt", sortable: true },
  ],
};
