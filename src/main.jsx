import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './security/axiosSetup'; // Importa el archivo de configuración del interceptor
import 'react-perfect-scrollbar/dist/css/styles.css';
import Swal from 'sweetalert2';
// Tailwind css
import './tailwind.css';

// i18n (needs to be bundled)
import './i18n';

// Router
import { RouterProvider } from 'react-router-dom';
import router from './router/index';

// Redux
import { Provider } from 'react-redux';
import store from './store/index';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Suspense>
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </Suspense>
    </React.StrictMode>
);
