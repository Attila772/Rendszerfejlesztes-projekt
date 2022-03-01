/*import { AuthenticatedUser, Permission, User } from "../types";

function checkUserPermissions(
  user: User,
  userPermissions: Permission[],
  permissions: string[],
  strict: boolean
) {

  if (strict) {
    return permissions.every((permission) => {
      return permissions?.findIndex((perm) => permission === perm) > -1;
    });
  } else {
    return permissions.some((permission) => {
      return permissions?.findIndex((perm) => permission === perm) > -1;
    });
  }
}

function checkAuthority(
  user: User,
  userPermissions: Permission[],
  permissions: string[],
  strict = false
) {
  if (!isEmpty(user)) {
    if (user?.isSuperAdmin) {
      return true;
    }
    if (tenant.isTenantAdmin) {
      return true;
    }
    if (isEmpty(permissions)) {
      return true;
    }
    if (!isEmpty(permissions)) {
      return checkUserPermissions(user, userPermissions, permissions, strict);
    }
    return false;
  }
  return false;
}

export function hasAnyAuthority(
  user: User,
  userPermissions: Permission[],
  permissions: string[]
) {
  return checkAuthority(user, userPermissions, permissions, false);
}

export function hasAuthority(
  user: User,
  userPermissions: Permission[],
  permissions: string[]
) {
  return checkAuthority(user, userPermissions, permissions, true);
}
*/
export {};
