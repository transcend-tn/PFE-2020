import withCenter from '../components/layouts/withCenter';
import withMain from '../components/layouts/withMain';

import ProfilePage from '../pages/ProfilePage';
import ForgetPassword from '../pages/ForgetPasswordPage';
import Welcome from '../components/Welcome';
import EditProfilePage from '../pages/EditProfilePage';
import NewDocumentPage from '../pages/NewDocumentPage';
import EditDocumentPage from '../pages/EditDocumentPage';
import PropositionModificationPage from '../pages/PropositionModificationPage';
import DocumentPage from '../pages/DocumentPage';

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
    path: '/document',
    Component: withMain(DocumentPage),
  },
];

export default routes;
