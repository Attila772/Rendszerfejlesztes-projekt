import {
  ADMIN_PERMISSIONS,
  LOGISTIC_PERMISSIONS,
  MAINTENANCE_PERMISSIONS,
  OPERATOR_PERMISSIONS,
} from "./rolePermissions";

export function hasAuthority(level: string, requredPermission: string) {
  let hasAuthority = false;
  // előre definiált jogkörök
  // 1: eszközfelelős
  // 2: operátor
  // 3: karbantartó
  // 4: admin

  switch (level) {
    case "1":
      if (LOGISTIC_PERMISSIONS.includes(requredPermission)) {
        hasAuthority = true;
      }
      break;
    case "2":
      if (OPERATOR_PERMISSIONS.includes(requredPermission)) {
        hasAuthority = true;
      }
      break;
    case "3":
      if (MAINTENANCE_PERMISSIONS.includes(requredPermission)) {
        hasAuthority = true;
      }
      break;
    case "4":
      if (ADMIN_PERMISSIONS.includes(requredPermission)) {
        hasAuthority = true;
      }
      break;
    default:
      hasAuthority = false;
      break;
  }

  return hasAuthority;
}
