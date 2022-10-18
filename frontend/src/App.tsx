import React from 'react';
import { useAppContext } from './lib/context';
import Header from './components/commons/Header';

interface PropsInterface {
  user: LocalStorageUser | undefined;
  logout: () => void;
}

function App({ user, logout }: PropsInterface) {
  return (
    <>
      <Header user={user} logout={logout} />
      <main className="general-container">
        <h1>Medical appointments web site</h1>
      </main>
    </>
  );
}

export default App;
