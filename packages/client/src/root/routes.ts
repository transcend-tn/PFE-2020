import withCenter from '../components/layouts/withCenter';
import withMain from '../components/layouts/withMain';
import Welcome from '../components/Welcome';
import DocumentPage from '../pages/DocumentPage';
import EditDocumentPage from '../pages/EditDocumentPage';
import EditProfilePage from '../pages/EditProfilePage';
import ForgetPassword from '../pages/ForgetPasswordPage';
import NewDocumentPage from '../pages/NewDocumentPage';
import ProfilePage from '../pages/ProfilePage';
import PropositionModificationPage from '../pages/PropositionModificationPage';
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
    path: '/profile',
    Component: withMain(ProfilePage),
  },
  {
    path: '/document',
    Component: withMain(DocumentPage),
  },
  {
    path: '/new-document',
    Component: withMain(NewDocumentPage),
  },
  {
    path: '/forget-password',
    Component: withCenter(ForgetPassword),
  },
  {
    path: '/edit-profile',
    Component: withMain(EditProfilePage),
  },
  {
    path: '/edit-document',
    Component: withMain(EditDocumentPage),
  },
  {
    path: '/proposition-modification',
    Component: withMain(PropositionModificationPage),
  },
  {
    path: '/proposition-details',
    Component: withMain(PropositionDetailsPage),
  },
];

export default routes;
