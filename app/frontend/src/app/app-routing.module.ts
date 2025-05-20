import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { NoAuthGuard } from './auth/no-auth-guard.service';

const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth-page.module').then((m) => m.AuthPageModule),
        canActivate: [NoAuthGuard],
    },
    {
        path: 'app',
        loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
        canLoad: [AuthGuard],
    },
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: 'auth',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
