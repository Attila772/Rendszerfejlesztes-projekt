//export const functionSearchList: string[] = ["", "/contract-create"];

export type FunctionSearchEntry = {
  target: string;
  needTenantAdmin: boolean;
  needSuperAdmin: boolean;
  permissions: string[];
};

// prettier-ignore
export const functionSearchList: FunctionSearchEntry[] = [
  // FROM App.tsx
  { target: "", needTenantAdmin: false, needSuperAdmin: false, permissions: [] },
];
