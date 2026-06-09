import { storeFrontRoutes } from './store-front/store-front.routes';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./store-front/store-front.routes'),
    }
];
