export type ResponseStatus =
  | "OK"
  | "INVALID_INPUT"
  | "ERROR"
  | "NOT_FOUND"
  | "CREATED"
  | "CONFLICT"
  | "FORBIDDEN"
  | "DEPENDENT"
  | "DUPLICATED"
  | "BAD_FILE";

export type SliceStatus =
  | "idle"
  | "pending"
  | "failure"
  | "success"
  | "loading";

export type HttpResponse = {
  status: ResponseStatus | string;
};

export type QueryString = {
  [key in string | number]: any;
};

export type Pageable = {
  pageSize: number;
  pageNumber: number;
  last: boolean;
  predicates: string | null;
  totalElements: number;
};

export type GenericResponse<T> = {
  item: T;
} & HttpResponse;

export type GenericListResponse<T> = {
  items: T[];
} & HttpResponse;

export type GenericPageResponse<T> = {
  page: Page<T>;
} & HttpResponse;

export type Page<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  last: boolean;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  first: boolean;
  size: number;
  number: number;
  empty: boolean;
};
