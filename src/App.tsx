import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './services/redux/store';
import AppRoutes from './components/AppRoutes';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className='App'>
          <AppRoutes />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
