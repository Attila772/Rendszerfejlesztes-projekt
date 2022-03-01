//export const functionSearchList: string[] = ["", "/contract-create"];

export type FunctionSearchEntry = {
  target: string;
  needSuperAdmin: boolean;
  permissions: string[];
};

// prettier-ignore
export const functionSearchList: FunctionSearchEntry[] = [
  // FROM App.tsx
  { target: "",  needSuperAdmin: false, permissions: [] },
];
