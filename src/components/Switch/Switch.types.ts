import { SwitchProps as ReactRouterSwitchProps } from 'react-router';
import { RouteConfig } from '../../types';

export type SwitchProps = Partial<ReactRouterSwitchProps> & {
    canView?: boolean;
    Animation?: React.ComponentType;
    routes?: RouteConfig[];
};
