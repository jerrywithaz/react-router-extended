# Better React Router Routing

Centralized routing for React Router. Better React Router Routing allows you to centralize your `react-router` routes in a configuration file and render nested routes with ease. It also provides an easy way to capture invalid routes and secure routes that require authentication.

## Usage

### Define your routes

```javascript
import { RouteConfig } from "@jerrywithaz/better-react-router-routing";
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
    component: LoginView
  },
  {
    key: "route-login-view",
    secure: false,
    path: "/login",
    component: LoginView,
    exact: true
  },
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
        exact: true
      }
    ]
  }
];

export default routes;

```

### Setup your app and render your routes

Better React Routing is unopnionated about your authentication protocol. The only thing we need is a boolean that indicates whether or not a user is authenticated. In the demo below we are using an example redux  provider and a `useAuthenticated` hook that grabs the authentication status from the store and returns a boolean. Any route that is marked as `secure` will render the `RedirectToLogin` component which by default just redirects the user to `/login`.

```jsx
import BetterReactRoutingProvider, { Switch, Capture404 } from '@jerrywithaz/better-react-router-routing';

function useAuthenticated() {
  const authenticated = useSelector(Selectors.Auth.authenticated);
  return authenticated;
}

const PageNotFound = () => {
    return <div>Page not found</div>;
};

const PageFound = () => {
    return <Switch routes={routes}/>
};

const AppRoutes: FunctionComponent = () => {

    const authenticated = useAuthenticated();  

    return (
        <BetterReactRoutingProvider authenticated={authenticated} loginPath="/login">
            <Capture404
                FoundComponent={PageFound}
                NotFoundComponent={PageNotFound}/>
        </BetterReactRoutingProvider>
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

```typescript
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
        exact: true
      }
    ]
  }
];
```

The `Dashboard` component will need to render `Switch` with the `routes` prop it will recieve.

It would look something like this:

```tsx
import { Switch, RouteConfigComponentProps } from '@jerrywithaz/better-react-router-routing';

const Dashboard = ({
    routes
}: RouteConfigComponentProps) => {
    return (
        <Styled.Dashboard>
            <DashboardSidebar/>
            <DashboardMain>
                <Switch routes={routes}/>
            </DashboardMain>
        </Styled.Dashboard>
    );
}

```
