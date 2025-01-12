export interface PaginationTypes {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface MetaTypes {
  pagination: PaginationTypes;
}

export interface OptionType {
  value: string | number;
  label: string;
  key: string | number;
}
