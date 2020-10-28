import React from 'react';
import CollaborationRequest from '../../../components/CollaborationRequest';
import { useStoreState } from '../../../hooks/store.hooks';

function CollaborationRequestContainer() {
  const user = useStoreState((state) => state.user.user);

  return <CollaborationRequest username={user.username} document="title" id="docId" />;
}

export default CollaborationRequestContainer;
