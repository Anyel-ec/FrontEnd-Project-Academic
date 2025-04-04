import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './security/axiosSetup';
import 'react-perfect-scrollbar/dist/css/styles.css';
import Swal from 'sweetalert2';
import './tailwind.css';
import './i18n';

// Router
import { RouterProvider } from 'react-router-dom';
import router from './router/index';

// Redux
import { Provider } from 'react-redux';
import store from './store/index';

// Contexto de usuario
import { UserProvider } from './store/userContext'; // 👈 Importa aquí

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense>
      <Provider store={store}>
        <UserProvider> {/* 👈 Añade el UserProvider aquí */}
          <RouterProvider router={router} />
        </UserProvider>
      </Provider>
    </Suspense>
  </React.StrictMode>
);
