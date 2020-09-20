export { default as Capture404 } from './components/Capture404';
export { default as UnauthorizedRedirect } from './components/UnauthorizedRedirect';
export { default as Switch } from './components/Switch';
export {
    default as Route,
    checkPermissions,
    checkRoles,
} from './components/Route';
export type { RouteConfigComponentProps, RouteConfig } from './types';
export { default as useBetterReactRouting } from './hooks/useBetterReactRouting';
export type { Capture404ComponentProps } from './components/Capture404';
export { default } from './provider/BetterReactRoutingProvider';
