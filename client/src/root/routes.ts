import Profile from "../pages/Profile";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

export interface Route {
  path: string;
  Component: any;
}

const routes: Route[] = [
  {
    path: "/signin",
    Component: SignIn,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  {
    path: "/profile",
    Component: Profile,
  },
];

export default routes;
