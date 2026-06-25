import authRoutes from './auth/auth.routes';
import { storeFrontRoutes } from './store-front/store-front.routes';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: ()=> import('./auth/auth.routes'),
        //TODO guards
    },
    {
        path: '',
        loadChildren: () => import('./store-front/store-front.routes'),
    }
];
