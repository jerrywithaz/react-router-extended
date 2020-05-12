import HomeView from "./views/HomeView";
import LoginView from "./views/LoginView";
import UserView from "./views/UserView";
import Dashboard from "./components/Dashboard";
import { RouteConfig } from "@jerrywithaz/better-react-router-routing";

const routes: RouteConfig[] = [
  {
    key: "route-base-view",
    secure: false,
    path: "/",
    exact: true,
    component: LoginView,
    title: "JerryWithAZ - Home",
    a11yMessage: "You have navigated to the Home Page"
  },
  {
    key: "route-login-view",
    secure: false,
    path: "/login",
    component: LoginView,
    exact: true,
    title: "JerryWithAZ - Login",
    a11yMessage: "You have navigated to the Login Screen"
  },
  {
    key: "route-home-ui",
    secure: false,
    path: "/home",
    component: Dashboard,
    exact: false,
    routes: [
      {
        key: "route-home-view",
        secure: true,
        path: "/home",
        component: HomeView,
        exact: true,
        title: "JerryWithAZ - Home",
        a11yMessage: "You have navigated to the Home Page"
      },
      {
        key: "route-home-user-view",
        secure: true,
        path: "/home/user",
        component: UserView,
        exact: true,
        redirectPath: () => {
          return {
            pathname: "/login",
            search: "?customRedirect=cool"
          };
        },
        title: "JerryWithAZ - User",
        a11yMessage: "You have navigated to the User Page"
      }
    ],
    title: "JerryWithAZ - Home",
    a11yMessage: "You have navigated to the Home Page"
  }
];

export default routes;
