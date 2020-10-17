import Profile from "../pages/Profile";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

import withCenter from "../components/layouts/withCenter";
import withMain from "../components/layouts/withMain";
import Welcome from "../components/Welcome";

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
  {
    path: "/signin",
    Component: withCenter(SignIn),
  },
{
  path: "/welcome",
  Component: withMain(Welcome),
},

];

export default routes;
