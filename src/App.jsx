import React from 'react';
import { Provider } from 'react-redux';
import { store } from './data/store';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Dashboard />
      </div>
    </Provider>
  );
}

export default App;