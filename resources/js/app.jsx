import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { CustomProvider } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import '../css/app.css';
import '../scss/app.scss';
import StoreProvider from './Store/Providers/StoreProvider';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const pages = import.meta.glob([
            "./Pages/**/*.jsx",
            "../../modules/*/resources/js/Pages/**/*.jsx",
        ]);

        const regex = /([^:]+)::(.+)/;
        const matches = regex.exec(name);

        if (matches && matches.length > 2) {
            const module = matches[1].replace(/[A-Z]/g, (m, offset) => m);
            const pageName = matches[2];
            return await pages[`../../modules/${module}/resources/js/Pages/${pageName}.jsx`]();
        } else {
            return await pages[`./Pages/${name}.jsx`]();
        }
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <React.StrictMode>
                <CustomProvider theme="light">
                    <StoreProvider>
                        <App {...props} />
                    </StoreProvider>
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
