import { Routes } from "@angular/router";
import { StoreFrontLayout } from "./layout/store-front-layout/store-front-layout";

export const storeFrontRoutes : Routes =[
    {
        path:'',
        component: StoreFrontLayout,
        children:[],
    },
    {
        path:'**',
        redirectTo:''
    },
];

export default storeFrontRoutes;