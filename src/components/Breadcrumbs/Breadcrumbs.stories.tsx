/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/display-name */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs.component';
import ReactRouterExtendedProvider from '../../provider/ReactRouterExtendedProvider';
import Switch from '../Switch';
import { RouteConfigComponentProps } from '../../types';

export default {
    title: 'Breadcrumbs',
    component: Breadcrumbs,
    decorators: [
        (storyFn: any): JSX.Element => (
            <MemoryRouter initialEntries={['/home/settings']} initialIndex={0}>
                {storyFn()}
            </MemoryRouter>
        ),
    ],
};

const appRoutes = [
    {
        key: 'route-base-view',
        secure: false,
        path: '/home',
        exact: false,
        breadcrumbTitle: 'Home',
        component: ({ routes }: RouteConfigComponentProps) => (
            <>
                <Breadcrumbs />
                <Switch routes={routes} />
            </>
        ),
        a11yMessage: 'You have navigated to the Home Page',
        title: 'Home',
        routes: [
            {
                key: 'route-home-view',
                secure: false,
                path: '/home',
                exact: true,
                breadcrumbTitle: 'Settings',
                component: () => <div>Home</div>,
                a11yMessage: 'You have navigated to the Home Page',
                title: 'Home',
            },
            {
                key: 'route-settings-view',
                secure: false,
                path: '/home/settings',
                exact: true,
                breadcrumbTitle: 'Settings',
                component: () => <div>Settings</div>,
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
        component: () => <div>Login</div>,
        a11yMessage: 'You have navigated to the Login Page',
        title: 'Login',
    },
    {
        key: 'route-admin-view',
        secure: false,
        path: '/admin',
        exact: true,
        component: () => <div>Admin</div>,
        a11yMessage: 'You have navigated to the Admin Page',
        title: 'Admin',
    },
];

export const Interactive = (): JSX.Element => (
    <ReactRouterExtendedProvider
        authenticated={false}
        routes={appRoutes}
        initialA11yMessage="Breadcrumbs"
        initialDocumentTitle="Breadcrumbs"
        redirectPathAfterLogin="/login"
        FoundComponent={() => <Switch routes={appRoutes} />}
    />
);
