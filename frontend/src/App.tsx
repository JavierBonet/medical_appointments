import React from 'react';
import { useAppContext } from './lib/context';
import Header from './components/commons/Header';

function App() {
  return (
    <>
      <Header />
      <main className="general-container">
        <h1>Medical appointments web site</h1>
      </main>
    </>
  );
}

export default App;
