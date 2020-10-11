import Profile from "../pages/Profile";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

import withCenter from "../components/layouts/withCenter";
import withMain from "../components/layouts/withMain";

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
    path: "/profile",
    Component: withMain(Profile),
  },
];

export default routes;
