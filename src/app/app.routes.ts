import authRoutes from './auth/auth.routes';
import { NotAuthenticatedGuard } from './auth/guards/not-authenticated.guard';
import { storeFrontRoutes } from './store-front/store-front.routes';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: ()=> import('./auth/auth.routes'),
       canMatch:[
        NotAuthenticatedGuard,
        // ()=> {            
        //     console.log('hola mundo');
        //     return false;
        // }
       ]
    },
    {
        path: '',
        loadChildren: () => import('./store-front/store-front.routes'),
    }
];
