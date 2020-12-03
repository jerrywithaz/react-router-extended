# React Router Extended

Centralized and accessible routing for React Router. Better React Router Routing allows
you to centralize your `react-router` routes in a configuration file and
render nested routes with ease.
It also provides an easy way to capture invalid routes, secure
routes that require authentication, and require users to have certain permissions or roles to view a route.
In addition, better react router routing ensures that your routing is accessible to users using a screen reader.

## Installation

`yarn add react-router-extended`

`npm install react-router-extended`

## Features

1. Routing via configuration

2. Global 404 pages or custom 404 pages per section of the application

3. Authentication-restricted routing

4. Permission-restricted routing

5. Role-restricted routing

6. Accessible routing

7. Breadcrumbs

## Usage

### Define your routes

```ts
import { RouteConfig } from "react-router-extended";
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import UserView from "./views/UserView";
import Dashboard from "./components/Dashboard";

const routes: RouteConfig[] = [
  {
    key: "route-base-view",
    secure: false,
    path: "/",
    exact: true,
    component: LoginView,
    a11yMessage: "You have navigated to the Home Page",
    title: "JerryWithaZ - Home"
  },
  {
    key: "route-login-view",
    secure: false,
    path: "/login",
    component: LoginView,
    exact: true,
    a11yMessage: "You have navigated to the Login Page",
    title: "JerryWithaZ - Login"
  },
  {
    key: "route-home-ui",
    secure: true,
    path: "/home",
    component: Dashboard,
    exact: false,
     a11yMessage: "You have navigated to the Home Page",
    title: "JerryWithaZ - Home",
    routes: [
      {
        key: "route-home-view",
        secure: true,
        path: "/home",
        component: HomeView,
        exact: true,
        a11yMessage: "You have navigated to the Home Page",
        title: "JerryWithaZ - Home"
      },
      {
        key: "route-home-user-view",
        secure: true,
        path: "/home/user",
        component: UserView,
        exact: true,
        a11yMessage: "You have navigated to the User Page",
        title: "JerryWithaZ - User"
      }
    ]
  }
];

export default routes;

```

### Setup your app and render your routes

Better React Routing is unopnionated about your authentication protocol. The only thing we need is a boolean that indicates whether or not a user is authenticated. In the demo below we are using an example redux  provider and a `useAuthenticated` hook that grabs the authentication status from the store and returns a boolean. Any route that is marked as `secure` will render the `UnauthorizedRedirect` component if not authenticated. By default it just redirects the user to `/login`. But, you can customize the redirect path by pasing either a string or function to the `redirectPath` prop of `ReactRouterExtendedProvider`.

```tsx
import ReactRouterExtendedProvider, { Switch, Capture404 } from 'react-router-extended';

function useAuthenticated(): boolean {
  const authenticated = useSelector((state: AppState) => state.auth.authenticated);
  return authenticated;
}

const AppRoutes: FunctionComponent = () => {

    const authenticated = useAuthenticated();  

    function redirectPath(componentProps: any) {
        if (componentProps.invitationCode) {
            return `/invitation?code=${componentProps.invitationCode}`;
        }
        return "/login";
    }

    return (
      <ReactRouterExtendedProvider
        authenticated={authenticated}
        initialA11yMessage="Welcome to JerryWithAZ"
        initialDocumentTitle="JerryWithAZ"
        routes={routes}
        FoundComponent={() => <Switch routes={routes} />}
        NotFoundComponent={() => <div>Page not found</div>}
      />
    );
}

function App() {

  return (
    <ReduxProvider>
      <RouterProvider history={history}>
        <GlobalStyles />
          <Styled.App>
            <AppRoutes/>
          </Styled.App>
      </RouterProvider>
    </ReduxProvider>
  );
}

```

## Nested Routes (Subroutes)

When using nested routes (subroutes) you will need to use the `Switch` component to render those routes.

Let's say this is your routes config:

```ts
const routes: RouteConfig[] = [
  {
    key: "route-home-ui",
    secure: true,
    path: "/home",
    component: Dashboard,
    exact: false,
    routes: [
      {
        key: "route-home-view",
        secure: true,
        path: "/home",
        component: HomeView,
        exact: true
      },
      {
        key: "route-home-user-view",
        secure: true,
        path: "/home/user",
        component: UserView,
        exact: true,
        redirectPath: () => "/signup"
      }
    ]
  }
];
```

The `Dashboard` component will need to render `Switch` with the `routes` prop it will recieve.

It would look something like this:

```tsx
import { Switch, RouteConfigComponentProps } from 'react-router-extended';

const Dashboard = ({
    routes
}: RouteConfigComponentProps) => {
    return (
        <Styled.Dashboard>
            <DashboardSidebar/>
            <DashboardMain>
                <Switch routes={routes}/> // your nested routes will be rendered here
            </DashboardMain>
        </Styled.Dashboard>
    );
}

```

## Securing Routes with Permissions or Roles

Often times you only want users to be able to access a route only if they have certain roles or permissions.
Better React Routing makes that easy to do.

**NOTE** When a user has insufficient permissions or roles null is rendered by default. So, be sure to pass in a fallback component
by either using the fallback component on the `ReactRouterExtendedProvider` or on the route itself.

### Setting Permissions and Roles

You will need to pass the current users permissions or roles to the `ReactRouterExtendedProvider`.

```jsx
  <ReactRouterExtendedProvider
    authenticated={authenticated}
    initialA11yMessage="Welcome to JerryWithAZ"
    initialDocumentTitle="JerryWithAZ"
    routes={routes}
    FoundComponent={() => <Switch routes={routes} />}
    NotFoundComponent={() => <div>Page not found</div>}
    permissions={["admin.read", "admin.write", "theme.write", "users.delete"]} // the current users permissions
    roles={["Admin", "Developer"]} // the current users roles
    FallbackPermissionsComponent={() => <div>You do not have permission</div>} // The component that will be displayed when a user does not have the correct permissions.
    FallbackRolesComponent={() => <div>You do not have the correct role.</div>} // The component that will be displayed when a user does not have the correct roles.
  />
);
```

### Route Specific Fallback Components

You can set fallback components per route if you want to customize the error message.

```tsx

const routes: RouteConfig[] = [
  {
    key: "route-base-view",
    secure: false,
    path: "/admin",
    exact: true,
    component: LoginView,
    permissions: ["admin.read", "admin.write"],
    roles: ["admin"],
    requireAllPermissions: true,
    requireAllRoles: true,
    fallbackPermissionsComponent: () => <div>You do not have permission.</div>,
    fallbackRolesComponent: () => <div>You do not have the correct role.</div>,
    a11yMessage: "You have navigated to the Home Page",
    title: "JerryWithaZ - Home"
  },
  {
    key: "route-login-view",
    secure: false,
    path: "/dev",
    component: LoginView,
    permissions: ["dev.read", "dev.write", "dev.delete"],
    roles: ["dev"],
    requireAllPermissions: false,
    requireAllRoles: true,
    exact: true,
    a11yMessage: "You have navigated to the Login Page",
    title: "JerryWithaZ - Login"
  }
];
```

### Global Fallback Components

Setting the fallback components on the provider will be used as the default fallback components.
The global fallback component will be overriden by route specific fallback components.

```jsx
  <ReactRouterExtendedProvider
    authenticated={authenticated}
    initialA11yMessage="Welcome to JerryWithAZ"
    initialDocumentTitle="JerryWithAZ"
    routes={routes}
    FoundComponent={() => <Switch routes={routes} />}
    NotFoundComponent={() => <div>Page not found</div>}
    FallbackPermissionsComponent={() => <div>You do not have permission</div>}
    FallbackRolesComponent={() => <div>You do not have the correct role.</div>}/>
);
```

### Breadcrumbs

With `react-router-extended` you get automatic Breadcrumbs right out of the gate.
By default the Breadcrumbs component will render bradcrumbs using the routes
passed into the `ReactRouterExtendedProvider`.

```tsx
import { Breadcrumbs } from 'react-router-extended';

const HomePage = () => {
  return (
    <div>
      <Breadcrumbs />
      <Content/>
    </div>
  );
}
```

#### Configuring Breadcrumbs

You can customize the look of breadcrumbs by passing in a `BreadcrumbLinkComponent`
to the `ReactRouterExtendedProvider`.

```tsx

const CustomBreadcrumbLink = ({
    isLink,
    isExact,
    name,
    to,
    route,
    isDisabled,
}) => {
  return <Link href={to}>{name}</Link>
};

const AppRoutes: FunctionComponent = () => {

    return (
      <ReactRouterExtendedProvider
        authenticated={authenticated}
        initialA11yMessage="Welcome to JerryWithAZ"
        initialDocumentTitle="JerryWithAZ"
        routes={routes}
        FoundComponent={() => <Switch routes={routes} />}
        NotFoundComponent={() => <div>Page not found</div>}
        BreadcrumbLinkComponent={CustomBreadcrumbLink}
      />
    );
}
```

#### With Custom Routes

If you just want to render breadcrumbs for a subset of routes you can pass
in an array of routes to render breadrcrumbs for.

```tsx
import { Breadcrumbs } from 'react-router-extended';

const HomePage = ({ routes }) => {
  return (
    <div>
      <Breadcrumbs routes={routes} />
      <Content/>
    </div>
  );
}
```
