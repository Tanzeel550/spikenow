import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/main.scss';
import { Provider } from 'react-redux';
import rootStore from './store/rootStore.ts';
import App from './components/App.tsx';

createRoot(document.getElementById('root')!).render(
  <Provider store={rootStore}>
    <StrictMode>
      <App />
    </StrictMode>,
  </Provider>,
);



