import intersection from 'lodash/intersection';

export function checkPermissions(routesRequiredPermissions: string[], usersPermissions: string[], requireAllPermissions: boolean): boolean {
  if (routesRequiredPermissions.length) {
    if (requireAllPermissions) {
      return intersection(routesRequiredPermissions, usersPermissions).length === routesRequiredPermissions.length;
    }
    else {
      return intersection(routesRequiredPermissions, usersPermissions).length !== 0;
    }
  }
  else {
    return true;
  }
}

export function checkRoles(routesRequiredRoles: string[], usersRoles: string[], requireAllRoles: boolean): boolean {
  if (routesRequiredRoles.length) {
    if (requireAllRoles) {
      return intersection(routesRequiredRoles, usersRoles).length === routesRequiredRoles.length;
    }
    else {
      return intersection(routesRequiredRoles, usersRoles).length !== 0;
    }
  }
  else {
    return true;
  }
}