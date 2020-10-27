import React from 'react';
import { RectShape, RoundShape, TextRow } from 'react-placeholder/lib/placeholders';

const ProfileCardLoader = () => {
  return (
    <div className="text-center card-body bg-white border" style={{ height: 229 }}>
      <RoundShape color="#E0E0E0" style={{ width: 100, height: 100 }} className="ml-auto mr-auto" />
      <TextRow color="#E0E0E0" style={{ width: 100, height: 20 }} className="mt-3 ml-auto mr-auto" />
      <RectShape color="#E0E0E0" style={{ width: 150, height: 30 }} className="mt-3 ml-auto mr-auto" />
    </div>
  );
};

export default ProfileCardLoader;
