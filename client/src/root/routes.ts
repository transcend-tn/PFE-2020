import ProfilePage from "../pages/ProfilePage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";

import withCenter from "../components/layouts/withCenter";
import withMain from "../components/layouts/withMain";
import ProfileCard from "../components/ProfileCard";
import Welcome from "../components/Welcome";
import RequestsPage from "../pages/RequestsPage";
import FavorisPage from "../pages/FavorisPage";
import ForgetPassword from "../pages/ForgetPasswordPage";

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
    Component: withCenter(SignInPage),
  },
  {
    path: "/signup",
    Component: withCenter(SignUpPage),
  },
  {
    path: "/favoris",
    Component: withMain(FavorisPage),
  },
  {
    path: "/requests",
    Component: withMain(RequestsPage),
  },
  {
    path: "/forget-password",
    Component: withCenter(ForgetPassword),
  },
];

export default routes;
