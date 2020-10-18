import Profile from "../pages/Profile";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

import withCenter from "../components/layouts/withCenter";
import withMain from "../components/layouts/withMain";
import ProfileCard from "../components/ProfileCard";
import Welcome from "../components/Welcome";
import Requests from "../pages/Requests";
import FavorisPage from "../pages/FavorisPage";
import ForgetPassword from "../components/ForgetPassword";

export interface Route {
  path: string;
  Component: any;
}

const routes: Route[] = [
  {
    path: "/",
    Component: withMain(Welcome),
  },
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
    path: "/profilecard",
    Component: ProfileCard,
  },
  {
    path: "/favoris",
    Component: withMain(FavorisPage),
  },
  {
    path: "/requests",
    Component: withMain(Requests),
  },
  {
    path: "/forget-password",
    Component: withCenter(ForgetPassword),
  },
];

export default routes;
