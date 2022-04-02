export const LOGISTIC_PERMISSIONS = [
  "CATEGORY_GET",
  "CATEGORY_ADMIN",
  "TOOL_GET",
  "TOOL_ADMIN",
  "LOCATION_GET",
  "LOCATION_ADMIN",
];

export const OPERATOR_PERMISSIONS = [
  "USER_GET",
  "USER_ADMIN",
  "ROLE_GET",
  "TRADE_GET",
  "TRADE_ADMIN",
  "ISSUE_GET",
  "ISSUE_ADMIN",
  "LOG_GET",
  "CATEGORY_GET",
  "TOOL_GET",
  "LOCATION_GET",
];

export const MAINTENANCE_PERMISSIONS = [
  "ISSUE_GET",
  "ISSUE_ADMIN",
  "LOG_GET",
  "CATEGORY_GET",
  "TOOL_GET",
  "LOCATION_GET",
];

export const ADMIN_PERMISSIONS = [
  "USER_GET",
  "USER_ADMIN",
  "ROLE_GET",
  "ROLE_ADMIN",
  "TRADE_GET",
  "TRADE_ADMIN",
  "ISSUE_GET",
  "ISSUE_ADMIN",
  "LOG_GET",
  "LOG_ADMIN",
  "CATEGORY_GET",
  "CATEGORY_ADMIN",
  "TOOL_GET",
  "TOOL_ADMIN",
  "LOCATION_GET",
  "LOCATION_ADMIN",
];

export type AuthenticatedUser = {
  email: string;
  id: string | number;
  level: string;
  trade?: string;
};
