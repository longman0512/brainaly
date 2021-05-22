import React from 'react';

// set the defaults
const CollectionContext = React.createContext({
  store: [
  ],
  setData: () => {}
});

export default CollectionContext;
