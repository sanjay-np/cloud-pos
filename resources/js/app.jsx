import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { CustomProvider } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import '../css/app.css';
import '../scss/app.scss';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <React.StrictMode>
                <CustomProvider theme="light">
                    <App {...props} />
                </CustomProvider>
            </React.StrictMode>
        )
    },
    progress: {
        color: '#4B5563',
        size: '5px',
        includeCSS: true,
        showSpinner: true,
    },
});
