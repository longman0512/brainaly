import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import StoreContext from './context/index';
import CollectionContext from './context/collection';
import ProfileContext from './context/profile';
import App from './App';

function Root() {
  const [store, setStore] = React.useState({});
  const [collection, setCollection] = React.useState({});
  const [profile, setProfile] = React.useState({});
  const value = { store, setStore };
  const collect = { collection, setCollection };
  const profileValue = { profile, setProfile };

  return (
    <StoreContext.Provider value={value}>
      <CollectionContext.Provider value={collect}>
        <ProfileContext.Provider value={profileValue}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ProfileContext.Provider>
      </CollectionContext.Provider>
    </StoreContext.Provider>
  );
}

ReactDOM.render(<Root />, document.getElementById('root'));

// serviceWorker.unregister();
