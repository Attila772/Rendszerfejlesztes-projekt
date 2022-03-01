export type ResponseStatus =
  | "OK"
  | "INVALID_INPUT"
  | "ERROR"
  | "NOT_FOUND"
  | "CREATED"
  | "CONFLICT"
  | "FORBIDDEN"
  | "DEPENDENT"
  | "DUPLICATED";

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

export type HttpResponse = {
  status: ResponseStatus | string;
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

export type SliceStatus =
  | "idle"
  | "pending"
  | "failure"
  | "success"
  | "loading";

export type User = {
  id: number;
  name: string;
  email: string;
  password: null;
  token: string;
  // status: "ACTIVE" | "BANNED" | "NEEDS_ACTIVATION";
};

export type Permission = {
  id: number;
  permissions: string[];
};

export type GetAccountResponse = {
  user: User;
  permissions: Permission[];
};

export type AuthenticatedUser = {
  user: User;
  permissions: Permission[];
};

export type UserRequest = {
  id: number;
  name: string;
  email: string;
  isSuperAdmin: boolean;
  isTenantAdmin: boolean;
};
