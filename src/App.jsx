import React from 'react';
import { FinanceProvider } from './context/FinanceContext';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

function App() {
  return (
    <FinanceProvider>
      <div>
        <Header />
        <main style={{ padding: '0 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          <Dashboard />
        </main>
      </div>
    </FinanceProvider>
  );
}

export default App;
