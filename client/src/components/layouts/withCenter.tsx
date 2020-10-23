import React from 'react';

const withCenter = (Component: React.ComponentType) => {
  return (props: any) => (
    <div className="d-flex justify-content-center align-items-center h-100 bg-midnight">
      <Component {...props} />
    </div>
  );
};

export default withCenter;
