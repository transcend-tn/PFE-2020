import withCenter from '../components/layouts/withCenter';
import withMain from '../components/layouts/withMain';

import FavorisPage from '../pages/FavorisPage';
import ForgetPassword from '../pages/ForgetPasswordPage';
import RequestsPage from '../pages/RequestsPage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import Welcome from '../components/Welcome';
import EditProfilePage from '../pages/EditProfilePage';
import DocumentsPage from '../pages/DocumentsPage';
import NewDocumentPage from '../pages/NewDocumentsPage';
import EditDocumentPage from '../pages/EditDocumentPage';
import PropositionModificationPage from '../pages/PropositionModificationPage';

export interface Route {
  path: string;
  Component: any;
}

const routes: Route[] = [
  {
    path: '/',
    Component: withMain(Welcome),
  },
  {
    path: '/signin',
    Component: withCenter(SignInPage),
  },
  {
    path: '/signup',
    Component: withCenter(SignUpPage),
  },
  {
    path: '/favoris',
    Component: withMain(FavorisPage),
  },
  {
    path: '/requests',
    Component: withMain(RequestsPage),
  },
  {
    path: '/documents',
    Component: withMain(DocumentsPage),
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
];

export default routes;
