import Profile from "../pages/Profile";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

import withCenter from "../components/layouts/withCenter";
import withMain from "../components/layouts/withMain";
import Requests from "../pages/Requests";

export interface Route {
  path: string;
  Component: any;
}

const routes: Route[] = [
  {
    path: "/signin",
    Component: withCenter(SignIn),
  },
  {
    path: "/signup",
    Component: withCenter(SignUp),
  },
  {
    path: "/requests",
    Component: withMain(Requests),
  },
  {
    path: "/profile",
    Component: withMain(Profile),
  },
];

export default routes;
