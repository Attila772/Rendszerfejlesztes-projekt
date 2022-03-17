import { DiagnosticCategory } from "typescript";

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
  Data: T[];
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

export type User = {
  id: number;
  email: string;
  password: string;
  trade: string;
  level: string;
  roles?: any[];
  qualifications?: any[];
};

export type Role = {
  id: number;
  name: string;
  permissions?: any[];
};

export type Permission = {
  id: number;
  name: string;
};

export type Interval = {
  id: number;
  unit: string;
};

export type Category = {
  id: number;
  name: string;
  isExceptional: boolean;
  normaTimeInHours: number;
  interval?: Interval;
  parentCategory?: any;
  description?: string;
};

export type Log = {
  id: number;
  status: string;
  dateTime: string;
  user?: User;
};

export type Issue = {
  id: number;
  name: string;
  category: Category;
  assignedUser: User;
  priority: number;
  eventLog?: Log[];
};

export type Qualification = {
  id: number;
  name: string;
};

export type Tool = {
  id: number;
  name: string;
  category: Category;
  description?: string;
  location?: Location;
};

export type Location = {
  id: number;
  building: string;
  room?: string;
};
