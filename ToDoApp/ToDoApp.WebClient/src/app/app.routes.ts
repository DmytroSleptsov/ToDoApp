import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task/task-list/task-list.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { LoginComponent } from './components/auth/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/tasks', pathMatch: 'full' },
    { path: 'tasks', component: TaskListComponent, canActivate: [authGuard] },
    { path: 'registration', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
];