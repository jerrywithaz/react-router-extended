# Better React Router Routing

Centralized and accessible routing for React Router. Better React Router Routing allows you to centralize your `react-router` routes in a configuration file and render nested routes with ease. It also provides an easy way to capture invalid routes and secure routes that require authentication. In addition, better react router routing ensures that your routing is accessible to users using a screen reader.

## Installation

`yarn add @jerrywithaz/better-react-router-routing`

`npm install @jerrywithaz/better-react-router-routing`

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

Better React Routing is unopnionated about your authentication protocol. The only thing we need is a boolean that indicates whether or not a user is authenticated. In the demo below we are using an example redux  provider and a `useAuthenticated` hook that grabs the authentication status from the store and returns a boolean. Any route that is marked as `secure` will render the `UnauthorizedRedirect` component if not authenticated. By default it just redirects the user to `/login`. But, you can customize the redirect path by pasing either a string or function to the `redirectPath` prop of `BetterReactRoutingProvider`.

```jsx
import BetterReactRoutingProvider, { Switch, Capture404 } from '@jerrywithaz/better-react-router-routing';

function useAuthenticated() {
  const authenticated = useSelector((state: AppState) => state.auth.authenticated);
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

    function redirectPath(componentProps: any) {
        if (componentProps.invitationCode) {
            return `/invitation?code=${componentProps.invitationCode}`;
        }
        return "/login";
    }

    return (
        <BetterReactRoutingProvider
          authenticated={authenticated}
          initialA11yMessage={"Welcome to JerryWithAZ"}
          initialDocumentTitle={"JerryWithaZ"}
          pageNotFoundA11yMessage={"This page could not be found"} //optional
          pageNotFoundDocumentTitle={"JerryWithaZ - Page Not Found"} //optional
          redirectPath={redirectPath}>
            <Capture404 FoundComponent={PageFound} NotFoundComponent={PageNotFound}/>
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
