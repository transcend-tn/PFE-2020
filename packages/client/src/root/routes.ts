import withCenter from '../components/layouts/withCenter';
import withMain from '../components/layouts/withMain';
import Welcome from '../components/Welcome';
import DocumentPage from '../pages/DocumentPage';
import EditDocumentPage from '../pages/EditDocumentPage';
import EditProfilePage from '../pages/EditProfilePage/EditProfilePage';
import ForgetPassword from '../pages/ForgetPasswordPage';
import NewDocumentPage from '../pages/NewDocumentPage/NewDocumentPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import PropositionDetailsPage from '../pages/PropositionDetailsPage';

export interface Route {
  path: string;
  Component: any;
}

const routes: Route[] = [
  {
    path: '/',
    Component: withCenter(Welcome),
  },
  {
    path: '/forget-password',
    Component: withCenter(ForgetPassword),
  },
  {
    path: '/profile/:id',
    Component: withMain(ProfilePage),
  },
  {
    path: '/profile/:id/edit',
    Component: withMain(EditProfilePage),
  },
  {
    path: '/document/new',
    Component: withMain(NewDocumentPage),
  },
  {
    path: '/document/:id',
    Component: withMain(DocumentPage),
  },
  {
    path: '/document/:id/edit',
    Component: withMain(EditDocumentPage),
  },
  {
    path: '/document/:idc/proposition/:idp',
    Component: withMain(PropositionDetailsPage),
  },
];

export default routes;
