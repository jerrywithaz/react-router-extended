# Better React Router Routing

Centralized routing for React Router. Better React Router Routing allows you to centralize your `react-router` routes in a configuration file and render nested routes with ease. It also provides an easy way to capture invalid routes and secure routes that require authentication.

## Usage

### Define your routes

```javascript
import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import UserView from "./views/UserView";
import Dashboard from "./components/Dashboard";
import { RouteConfig } from "../../../src/types";

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

```jsx
import BetterReactRoutingProvider, { Switch, Capture404 } from '@jerrywithaz/better-react-router-routing';

const PageFound = () => {
    return <Switch routes={routes}/>
};

const AppRoutes: FunctionComponent = () => {

    // get a boolean indicating whether or not the user is authenticated
    // it's up to you to figure out how authentication, we just need a boolean
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
