/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/display-name */
import React from 'react';
import { Link, MemoryRouter } from 'react-router-dom';
import Route from './Route.component';
import ReactRouterExtendedProvider from '../../provider/ReactRouterExtendedProvider';
import Switch from '../Switch';
import { RouteConfig, RouteConfigComponentProps } from '../../types';
import Breadcrumbs from '../Breadcrumbs';

export default {
    title: 'Route',
    component: Route,
    decorators: [
        (storyFn: any): JSX.Element => (
            <MemoryRouter initialEntries={['/home/settings']} initialIndex={0}>
                {storyFn()}
            </MemoryRouter>
        ),
    ],
};

const App = ({ routes }: RouteConfigComponentProps) => {
    return (
        <>
            <div
                style={{
                    marginBottom: 10,
                    background: '#efefef',
                    padding: '10px 0px',
                }}
            >
                <Breadcrumbs />
            </div>
            <div style={{ display: 'flex' }}>
                <div
                    style={{
                        display: 'flex',
                        width: 200,
                        flexDirection: 'column',
                    }}
                >
                    <Link to="/home">Home</Link>
                    <Link to="/home/settings">Settings</Link>
                </div>
                <div style={{ flex: 1 }}>
                    <Switch routes={routes} />
                </div>
            </div>
        </>
    );
};

const Home = ({
    componentProps: { isHome = false },
}: RouteConfigComponentProps<any, any, { isHome: boolean }>) => {
    return <div>{isHome ? 'Home' : 'Home'}</div>;
};

const Settings = () => {
    return <div>Settings</div>;
};

const Login = () => {
    return <div>Settings</div>;
};

const Admin = () => {
    return <div>Admin</div>;
};

const appRoutes: RouteConfig[] = [
    {
        key: 'route-base-view',
        secure: false,
        path: '/home',
        exact: false,
        breadcrumbTitle: 'Home',
        component: App,
        a11yMessage: 'You have navigated to the Home Page',
        title: 'Home',
        routes: [
            {
                key: 'route-home-view',
                secure: false,
                path: '/home',
                exact: true,
                breadcrumbTitle: 'Settings',
                component: Home,
                a11yMessage: 'You have navigated to the Home Page',
                title: 'Home',
            },
            {
                key: 'route-settings-view',
                secure: false,
                path: '/home/settings',
                exact: true,
                breadcrumbTitle: 'Settings',
                component: Settings,
                a11yMessage: 'You have navigated to the Settings Page',
                title: 'Home - Settings',
            },
        ],
    },
    {
        key: 'route-login-view',
        secure: false,
        path: '/login',
        exact: true,
        component: Login,
        a11yMessage: 'You have navigated to the Login Page',
        title: 'Login',
    },
    {
        key: 'route-admin-view',
        secure: false,
        path: '/admin',
        exact: true,
        component: Admin,
        a11yMessage: 'You have navigated to the Admin Page',
        title: 'Admin',
    },
];

export const Interactive = (): JSX.Element => (
    <ReactRouterExtendedProvider
        authenticated
        routes={appRoutes}
        initialA11yMessage="Routes"
        initialDocumentTitle="Routes"
        redirectPathAfterLogin="/home"
        FoundComponent={() => <Switch routes={appRoutes} />}
    />
);
