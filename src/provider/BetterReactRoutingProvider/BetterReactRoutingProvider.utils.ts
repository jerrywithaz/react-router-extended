import { RouteConfig } from "../../types";

const walkRoutes = (routes: RouteConfig[], func: Function) => {

  for (let index = 0; index < routes.length; index++) {

    const route = routes[index];

    if (route.routes) {
      walkRoutes(route.routes, func);
    }

    func(route);

  }

};

export const createRoutesMap = (routes: RouteConfig[]) => {

  const map: Record<string, RouteConfig> = {};

  walkRoutes(routes, (route: RouteConfig) => {
    if (route.path) {
      if (Array.isArray(route.path)) route.path.forEach((path) => map[path] = route);
      else map[route.path] = route;
    }
  });

  return map;
}